import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:http";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const run = promisify(execFile);
const example = fileURLToPath(new URL("./retrieve_results.js", import.meta.url));

async function withBatch(outputFileId, callback) {
  const requests = [];
  const server = createServer((req, res) => {
    requests.push(req.url);
    if (req.url === "/v1/batches/batch_test") {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({
        id: "batch_test",
        status: "completed",
        output_file_id: outputFileId,
      }));
    } else if (req.url === "/v1/files/file_test/content") {
      res.setHeader("Content-Type", "application/jsonl");
      res.end('{"custom_id":"request-1","response":{"status_code":200}}\n');
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  try {
    const retrieve = () => run(process.execPath, [example, "batch_test"], {
      env: {
        ...process.env,
        OPENAI_API_KEY: "test-key",
        OPENAI_BASE_URL: "http://127.0.0.1:" + server.address().port + "/v1",
      },
      timeout: 5000,
    });
    await callback(retrieve, requests);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test("downloads the output file of a completed batch", async () => {
  await withBatch("file_test", async (retrieve, requests) => {
    const { stdout } = await retrieve();
    assert.match(stdout, /"custom_id":"request-1"/);
    assert.deepEqual(requests, [
      "/v1/batches/batch_test",
      "/v1/files/file_test/content",
    ]);
  });
});

test("reports a missing output file without requesting an invalid file ID", async () => {
  await withBatch(null, async (retrieve, requests) => {
    await assert.rejects(retrieve, /Completed batch has no output_file_id/);
    assert.deepEqual(requests, ["/v1/batches/batch_test"]);
  });
});

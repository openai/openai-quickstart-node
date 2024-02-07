import OpenAI from "openai";

const openai = new OpenAI();

let chatHistory = [{ role: "system", content: "You are a helpful assistant." }];

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "POST":
      if (req.query.endpoint === "chat") {
        // Handle POST to /api/generate?endpoint=chat
        const content = req.body.message;
        chatHistory.push({ role: "user", content: content });
        res.status(200).json({ success: true });
      } else if (req.query.endpoint === "reset") {
        // Handle POST to /api/generate?endpoint=reset
        chatHistory = [
          { role: "system", content: "You are a helpful assistant." },
        ];
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ error: "Not Found" });
      }
      break;
    case "GET":
      if (req.query.endpoint === "history") {
        res.status(200).json(chatHistory);
      } else if (req.query.endpoint === "stream") {
        // Set headers for Server-Sent Events
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        try {
          const stream = await openai.beta.chat.completions.stream({
            model: "gpt-3.5-turbo",
            messages: chatHistory,
            stream: true,
          });

          for await (const chunk of stream) {
            const message = chunk.choices[0]?.delta?.content || "";
            res.write(`data: ${JSON.stringify(message)}\n\n`);
          }

          // After the stream ends, get the final chat completion
          const chatCompletion = await stream.finalChatCompletion();
        } catch (error) {
          res.write(
            "event: error\ndata: " +
              JSON.stringify({ message: "Stream encountered an error" }) +
              "\n\n"
          );
        }

        // When the client closes the connection, we stop the stream
        return new Promise((resolve) => {
          req.on("close", () => {
            resolve();
          });
        });
      } else {
        res.status(404).json({ error: "Not Found" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

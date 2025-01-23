# OpenAI API Quickstart - Node.js

This repository provides a collection of examples demonstrating how to use the OpenAI APIs with the Node.js SDK.

The examples are organized by API, with each folder dedicated to a specific API:

- Chat Completions
- Assistants
- Fine-tuning
- Embeddings
- Moderation
- Batch Processing
- Images

Within each folder, you'll find a basic example to get started. For some APIs, additional examples are also included to explore more advanced use cases.

## Prerequisites

To run the examples with the Node.js SDK, you will need:

- A recent version of [Node.js](https://nodejs.org/) (>= 16.0.0)
- A recent version of [npm](https://www.npmjs.com/) or another node package manager
- An OpenAI API key (you can get one from your [OpenAI dashboard](https://platform.openai.com/settings/organization/api-keys))

## How to use

1. Clone this repository

   ```bash
   $ git clone https://github.com/openai/openai-quickstart-node.git
   ```

2. Navigate into the project directory

   ```bash
   $ cd openai-quickstart-node
   ```

3. Install the OpenAI Node.js SDK

   ```bash
   $ npm install openai
   ```

4. Set your OpenAI API key in environment variables

   **In the terminal session:**

   Bash (Mac/Linux):

   ```bash
   $ export OPENAI_API_KEY=<your-api-key>
   ```

   PowerShell (Windows):

   ```bash
   $ setx OPENAI_API_KEY "<your_api_key>"
   ```

   **Set it globally:**

   Add this line to your `.bashrc` or `.zshrc` file on Mac/Linux:

   ```bash
   $ export OPENAI_API_KEY=<your-api-key>
   ```

   Or update your system environment variables on Windows.

5. Run each script individually

   ```bash
   $ node path/to/script.js
   ```

   For example, to run the basic chat completions example:

   ```bash
   $ node chat_completions/index.js
   ```

## Examples

Explore the examples below to learn how to use the Node.js SDK for your specific use case.

<table>
  <tr>
    <th>API</th>
    <th>Example</th>
    <th>Path</th>
  </tr>
  <tr>
    <td rowspan="4">Chat Completions</td>
    <td>Basic example</td>
    <td><a href="/chat_completions/index.js">chat_completions/index.js</a></td>
  </tr>
  <tr>
    <td>Multi-turn conversation</td>
    <td><a href="/chat_completions/multi_turn.js">chat_completions/multi_turn.js</a></td>
  </tr>
    <tr>
    <td>Function Calling</td>
    <td><a href="/chat_completions/function_calling.js">chat_completions/function_calling.js</a></td>
  </tr>
  <tr>
    <td>Vision (image input)</td>
    <td><a href="/chat_completions/vision.js">chat_completions/vision.js</a></td>
  </tr>
  <tr>
    <td rowspan="2">Assistants</td>
    <td>Create an assistant</td>
    <td><a href="/assistants/index.js">assistants/index.js</a></td>
  </tr>
  <tr>
    <td>Example thread</td>
    <td><a href="/assistants/thread.js">assistants/thread.js {assistant-id}</a></td>
  </tr>
  <tr>
  <td rowspan="2">Fine-tuning</td>
  <td>Create a fine-tuned model</td>
  <td><a href="/fine_tuning/index.js">fine_tuning/index.js</a></td>
  </tr>
  <tr>
    <td>Use a fine-tuned model</td>
    <td><a href="/fine_tuning/use_model.js">fine_tuning/use_model.js {job-id}</a></td>
  </tr>
  <tr>
    <td rowspan="1">Embeddings</td>
    <td>Generate embeddings</td>
    <td><a href="/embeddings/index.js">embeddings/index.js</a></td>
  </tr>
  <tr>
    <td rowspan="2">Moderation</td>
    <td>Moderate text</td>
    <td><a href="/moderation/index.js">moderation/index.js</a></td>
  </tr>
  <tr>
    <td>Moderate images & text</td>
    <td><a href="/moderation/images.js">moderation/images.js</a></td>
  </tr>
  <tr>
    <td rowspan="2">Batch</td>
    <td>Create a batch job</td>
    <td><a href="/batch/index.js">batch/index.js</a></td>
  </tr>
  <tr>
    <td>Get batch job results</td>
    <td><a href="/batch/retrieve_results.js">batch/retrieve_results.js {job-id}</a></td>
  </tr>
  <tr>
    <td rowspan="1">Images</td>
    <td>Generate an image</td>
    <td><a href="/images/index.js">images/index.js</a></td>
  </tr>
</table>

## Additional Resources

For more in-depth examples within front-end applications, including with streaming responses, check out these additional resources:

- [Assistants API Quickstart](https://github.com/openai/openai-assistants-quickstart)
- [Sample apps with Structured Outputs](https://github.com/openai/openai-structured-outputs-samples)

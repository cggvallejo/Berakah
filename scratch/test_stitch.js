
const { Client } = require("@modelcontextprotocol/sdk/client/index.js");
const { StdioClientTransport } = require("@modelcontextprotocol/sdk/client/stdio.js");
const { spawn } = require("child_process");

async function main() {
  const transport = new StdioClientTransport({
    command: "npx.cmd",
    args: [
      "-y",
      "mcp-remote",
      "https://stitch.googleapis.com/mcp",
      "--header",
      "X-Goog-Api-Key: YOUR_API_KEY"
    ],
  });

  const client = new Client(
    {
      name: "stitch-client",
      version: "1.0.0",
    },
    {
      capabilities: {},
    }
  );

  await client.connect(transport);
  console.log("Connected to Stitch MCP");

  try {
    const result = await client.request(
      {
        method: "tools/call",
        params: {
          name: "list_projects",
          arguments: {},
        },
      },
      // Schema for response
    );
    console.log("Projects:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error listing projects:", error);
  } finally {
    process.exit();
  }
}

main();

require("dotenv").config();

const startServer = require("./api/server");

const PORT = process.env.PORT || 4000;

process.on("uncaughtException", (err) => {
  console.error(`${new Date().toUTCString()} uncaughtException:`, err);
  process.exit(0);
});

process.on("unhandledRejection", (err) => {
  console.error(`${new Date().toUTCString()} unhandledRejection:`, err);
});

async function main() {
  const server = await startServer();

  server.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/api`);
  });
}

main();

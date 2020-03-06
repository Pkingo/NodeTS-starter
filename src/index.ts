import fastify from 'fastify';

const app = fastify({ logger: process.env.NODE_ENV != "test" });

app.get("/", async () => {
  return { hello: 'world' }
});

// Run the server!
const start = async () => {
  try {
    await app.listen(3000)
    app.log.info(`server listening on ${app.server.address()}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
if (require.main === module) { // true if file is executed
  start()
}

export default app;

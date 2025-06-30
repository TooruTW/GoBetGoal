export function routesHandler(server) {
  server.namespace = "api";

  server.get("/trials", () => {
    return JSON.stringify("get all trials");
  });

  server.get("/participants", (schema) => {
    return schema.participants.all();
  });

  server.get("/trials/:id", (schema, request) => {
    const id = request.params.id;
    return schema.trials.find(id);
  });
}

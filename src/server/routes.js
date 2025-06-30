export function routesHandler(server) {
  server.namespace = "api";

  server.get("/trials", (schema) => {
    return schema.trials.all();
  });

  server.get("/participants", (schema) => {
    return schema.participants.all();
  });

  server.get("/trials/:id", (schema, request) => {
    const id = request.params.id;
    return schema.trials.find(id);
  });
}

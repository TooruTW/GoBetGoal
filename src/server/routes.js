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

  server.delete("trials/:id/remove-participant/:participantId", (schema, request) => {
    const id = request.params.id;
    const participantId = request.params.participantId;
    const prevState = schema.trials.find(id).currentParticipants;
    return schema.trials.find(id).update({
      currentParticipants: prevState.filter((participant) => participant.id !== participantId),
    });
  });
}

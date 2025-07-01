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

  server.delete(
    "/trials/:id/remove-participant/:participantId",
    (schema, request) => {
      const id = request.params.id;
      const participantId = request.params.participantId;
      const prevState = schema.trials.find(id).currentParticipants;
      return schema.trials.find(id).update({
        currentParticipants: prevState.filter(
          (participant) => participant.id !== participantId
        ),
      });
    }
  );

  server.post(
    "trials/trial-detail/:id/upload-image/:challengeId/:imageId",
    (schema, request) => {
      const { id, challengeId, imageId } = request.params;
      const { imageUrl } = JSON.parse(request.requestBody);

      const targetTrial = schema.trials.find(id);
      const targetChallengeList = targetTrial.challenges;
      const targetChallenge = targetChallengeList.find(challengeId);
      const targetUploadImageList = targetChallenge.uploadImage;

      const newUploadImageList = targetUploadImageList.map((item) => {
        if (item.id === imageId) {
          return { ...item, imageUrl };
        }
        return item;
      });

      const newChallenge = {
        ...targetChallenge,
        uploadImage: newUploadImageList,
      };
      const newChallengeList = targetChallengeList.map((item) => {
        if (item.id === challengeId) {
          return newChallenge;
        }
        return item;
      });

      const updatedTrial = schema.trials.find(id).update({
        challenges: newChallengeList,
      });

      return updatedTrial;
    }
  );
}

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
    "/trials/trial-detail/:id/upload-image/:challengeId/:imageId",
    (schema, request) => {
      const { id, challengeId, imageId } = request.params;
      const { imageUrl } = JSON.parse(request.requestBody);

      console.log("params", id, challengeId, imageId);

      const targetTrial = schema.trials.find(id);
      const targetChallenge = targetTrial.attrs.challenges.find(
        (item) => item.id === challengeId
      );
      const targetUploadImage = schema.trials
        .find(id)
        .attrs.challenges.find((item) => item.id === challengeId)
        .uploadImage.find((item) => item.id === imageId);

      console.log(targetUploadImage, "targetUploadImage");

      const newUploadImage = {...targetUploadImage, imageUrl:imageUrl, createdAt:new Date().toISOString()}
      console.log(newUploadImage, "newUploadImage");
    const newUploadImages = targetChallenge.uploadImage.map((item)=>{
      if(item.id === imageId){
        return newUploadImage;
      }
      return item;
    })

    const newChallenge = {...targetChallenge, uploadImage:newUploadImages}

    const newChallenges = targetTrial.attrs.challenges.map((item)=>{
      if(item.id === challengeId){
        return newChallenge;
      }
      return item;
    })
    console.log(newChallenges, "newChallenges");
    
      return targetTrial.update({challenges:newChallenges});
    }
  );
}

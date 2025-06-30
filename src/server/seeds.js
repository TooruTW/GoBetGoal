import { participantList } from "@/asset/fakeData";
import { fakeTrialList } from "@/asset/fakeData";

export default function seeds(server) {
  participantList.forEach((participant) => {
    server.create("participant", participant);
  });

  fakeTrialList.forEach((trial) => {
    server.create("trial", trial);
  });
}

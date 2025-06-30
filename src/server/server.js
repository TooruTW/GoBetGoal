import { createServer } from "miragejs";
import { models } from "./models";
import { routesHandler } from "./routes";
import seeds from "./seeds";

createServer({
  models: models,
  seeds,
  routes() {
    routesHandler(this);
  },
});

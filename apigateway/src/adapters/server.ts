import { Server } from "../interfaces/server";
import app from "../providers/express";

const server: Server = {
  start: () => {
    app.start();
  },
  stop: () => {
    throw new Error("Function not implemented.");
  },
};

export default server;

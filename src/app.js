import express from "express";
import { Server } from "./server.js";

class InitServer{
    createServer(){
        const app = express();
        Server.prototype.start(app)
    }
}

const initServer = new InitServer()
initServer.createServer()
import { json, urlencoded } from "express";
import cors from "cors";
import http from "http";
import { UserRoute } from "./routes/routes.js";
import { config } from "./config/env.config.js";
import { databaseConnection } from "./config/db.config.js";
import { redisConnection } from "./config/redis.config.js";

const SERVER_PORT=config.PORT;

export class Server {

    start(app){
        this.middleware(app);
        this.DBConnection()
        this.routes(app);
        this.startServer(app);
        redisConnection()
    };

    middleware(app){
        app.use(json({limit:"20mb"}));
        app.use(urlencoded({limit:"20mb",extended:true}));
        app.use(cors({credentials:true}));
    };

    DBConnection(){
        databaseConnection()
    }

    redisConnection(){
        redisConnection()
    }

    routes(app){
        app.use("/",UserRoute());
    }

    startServer(app){
        const server = new http.createServer(app)
        server.listen(SERVER_PORT,()=>{
            console.log(`server is running on port: ${SERVER_PORT}`)
        })
    }

}
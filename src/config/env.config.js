import dotenv from "dotenv";
dotenv.config({});

class Config {
    PORT;
    POSTGRES_DB;
    JWT_SECRET;
    REDIS_HOST;
    constructor(){
        this.PORT = process.env.PORT;
        this.POSTGRES_DB = process.env.POSTGRES_DB;
        this.JWT_SECRET = process.env.JWT_SECRET;
        this.REDIS_HOST = process.env.REDIS_HOST;
    };
};

export const config = new Config();


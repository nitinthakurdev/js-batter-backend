import { Sequelize } from "sequelize";
import { config } from "./env.config.js";

 export const sequelize = new Sequelize(config.POSTGRES_DB,{
    dialect:"postgres",
    logging:false,
    dialectOptions:{
        multipleStatements:true
    }
})

export async function databaseConnection(){ 
    try {
        await sequelize.authenticate()
        console.info('postgres database connection has been establish successfully')
    } catch (error) {
        console.error("unable to connect to database")
    }
}
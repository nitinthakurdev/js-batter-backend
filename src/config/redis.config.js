import { createClient } from "redis";
import { config } from "./env.config.js";

const client = createClient({url:`${config.REDIS_HOST}`})

export const redisConnection = async()=>{
    try {
        await client.connect()
        console.log(`Redis connection : ${await client.ping()}`)
        cacheError()
    } catch (error) {
        console.log('redis connection failed')
    }
}

function cacheError (){
    client.on('error',(error)=>{
        console.log(error)
    })
}
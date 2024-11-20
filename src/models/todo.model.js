import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";


const TodoSchema  = sequelize.define("todos",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true,
        allowNull:false
    },
    UserId:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
       type:DataTypes.STRING,
       defaultValue:'pending',
       allowNull:false
    }
},{timestamps:true});

TodoSchema.sync({});

export {TodoSchema}
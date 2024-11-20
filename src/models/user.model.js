import bcrypt from "bcryptjs";
import { sequelize } from "../config/db.config.js";
import { DataTypes } from "sequelize";
import { TodoSchema } from "./todo.model.js";


const UserModel = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    indexes:[
        {
            unique:true,
            fields:["email"]
        },
        {
            unique:true,
            fields:["username"]
        },
    ] 
  });

  UserModel.addHook('beforeCreate',async (auth)=>{
    const hashPassword = await  bcrypt.hash(auth.dataValues.password,10)
    auth.dataValues.password = hashPassword
  })

  UserModel.prototype.comparePassword = async (password,hashPassword)=>{
    return await bcrypt.compare(password,hashPassword)
  }

  UserModel.hasMany(TodoSchema)

  UserModel.sync();

  
  export {UserModel}
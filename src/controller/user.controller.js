import { Op } from "sequelize";
import { UserModel } from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import { config } from "../config/env.config.js";
import { TodoSchema } from "../models/todo.model.js";

class UserController {

    async createUser(req, res) {
        const data = req.body
        const findUser = await UserModel.findOne({where:{[Op.or]:[
            {username:data.username},
            {email:data.email}
        ]}})
        if(findUser){
            return res.status(400).json({message:"user already exist"})
        }
        const result = await UserModel.create(data)
        return res.status(201).json({message:"user created successful",data:(await result).dataValues})
    }

    async loginUser(req,res) {
        const {username,password} = req.body;
        const findUser = await UserModel.findOne({where:{[Op.or]:[
            {username},
            {email:username}
        ]}})
        if(!findUser){
            return res.status(404).json({message:"user not exist"})
        }
        
        const isvalid = await findUser.comparePassword(password,findUser.password)
        if(!isvalid){
            return res.status(403).json({message:"wrong password"})
        }
        const token = jwt.sign({id:findUser.id,email:findUser.email},config.JWT_SECRET)

        return res.status(200).json({message:"user login successful",token})
    }

    async getUser(_,res){
        const result = await UserModel.findAll({include:[{
            model: TodoSchema,
            as: 'todos', 
          },],});
        return res.status(200).json({message:"all user Data",data:result})
    }

}

export const userController = new UserController()
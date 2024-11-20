import { TodoSchema } from "../models/todo.model.js";

class TodoController {

    async createTodo(req,res){
        const data = req.body;
        if(!data.title.trim()){
            return res.status(400).json({message:"title is not be empty"})
        };
       const result = await TodoSchema.create(data);
       return res.status(201).json({message:"task created successful",data:result.dataValues});
    }

    async deleteTodo (req,res) {
        const {id} = req.params;
        const result = await TodoSchema.destroy({where:{id}})
        if(!result){
            return res.status(404).json({message:"todo not delete somthing wrong"})
        }
        return res.status(200).json({message:"Todo deleted successfull "})
    }

    async updateTodo (req,res) {
        const {id} = req.params;
        const {title, status} = req.body;
        const result  = await TodoSchema.update({title,status},{where:{id}})
        
        if(!result[0]){
            return res.status(404).json({message:"data not found"})
        }
        return res.status(200).json({message:"Todo updated successful"})
    }
}

export const todoController = new TodoController()
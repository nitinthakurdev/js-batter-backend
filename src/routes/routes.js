import { Router } from "express";
import { userController } from "../controller/user.controller.js";
import { RegisterValidateion } from "../helper/index.js";
import { todoController } from "../controller/todo.controller.js";

const router = Router()

export function UserRoute() {

    router.route("/").get((_,res)=>{return res.send("server is healthy and ok")})

    // user routes
    router.route("/user/create").post(RegisterValidateion,userController.createUser)
    router.route("/user/login").post(userController.loginUser)
    router.route("/user/get").get(userController.getUser)

    // todo routes
    router.route("/todo/create").post(todoController.createTodo)
    router.route("/todo/delete/:id").delete(todoController.deleteTodo)
    router.route("/todo/update/:id").put(todoController.updateTodo)

    return router
}
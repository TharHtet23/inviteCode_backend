import Task from "../models/task.model.js";
import { fMsg } from "../utils/libby.js";

export const getTasks = async (req, res,next) => {
  try {
    const tasks = await Task.find();
    if(tasks.length === 0){
        return next(new Error("No tasks found"))
    }
    fMsg(res, "Tasks fetched successfully", tasks, 200);
  } catch (error) {
    next(error)
  }
};

export const createTask = async (req, res,next) => {
  try {
    const task = await Task.create(req.body);
    fMsg(res, "Task created successfully", task, 201);
  } catch (error) {
    next(error)
  }
};

export const getTaskbyId = async (req, res,next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    fMsg(res, "Task fetched successfully", task, 200);
  } catch (error) {
    next(error)
  }
};

export const editTask = async(req,res,next)=>{
    try{
        const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {new:true});
        fMsg(res, "Task updated successfully", task, 200);
    }catch(error){
        next(error)
    }
}

export const deleteTask = async(req,res,next)=>{
    try{
        await Task.findByIdAndDelete(req.params.taskId);
        fMsg(res, "Task deleted successfully", {}, 200);
    }catch(error){
        next(error)
    }
}   
import {Task} from '../models/Task.js'
import {Items} from '../models/Items.js'
import ErrorHandler from '../middlewares/error.js'

export const addNewTask = async(req, res, next)=>{
    try{
        const id = req.params.id

        const {parentId, textValue, bgColor} = req.body
        console.log("Add new task",req.body)
        const newTask = [
            {
                task: textValue,
                taskBGColor: bgColor,
            }
        ]

        const item = await Item.findById(parentId)

        if(!item) return next(new ErrorHandler("Invalid Id: Id has been removed",404))

        item.tasks = [...item.tasks, newTask]

        await item.save()

        res.status(201).json({
            success: true,
            message: "New Task Added Successfully",
        })
    }catch(error){
        next(error)
    }
}

export const updateTask = async (req, res, next) => {
    try {
      const id = req.params.id;
      const { parentId, textValue, bgColor } = req.body;
  
      const updatedTask = {
        task: textValue,
        taskBGColor: bgColor,
      };
      console.log("update task",req.body)
      const item = await Item.findById(parentId);
      console.log("found item id database :", item)
      if (!item) {
        return next(new ErrorHandler("Invalid Id: Id has been removed", 404));
      }
  
      const taskIndex = item.tasks.findIndex((task) => task._id === id);
  
      if (taskIndex === -1) {
        return next(new ErrorHandler("Invalid Task Id", 400));
      }
  
      item.tasks[taskIndex] = { ...item.tasks[taskIndex], ...updatedTask };
  
      await item.save();
  
      res.status(201).json({
        success: true,
        message: "Task Updated Successfully",
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteTask = async (req, res, next) => {
    try {
      const { parentId } = req.body;
      const taskId = req.params.id;
  
      const item = await Item.findById(parentId);
  
      if (!item) {
        return next(new ErrorHandler("Invalid Id: Id was deleted previously", 404));
      }
  
      const taskIndex = item.tasks.findIndex((task) => task._id === taskId);
  
      if (taskIndex === -1) {
        return next(new ErrorHandler("Invalid Task Id", 400));
      }
  
      item.tasks.splice(taskIndex, 1);
  
      await item.save();
  
      res.status(201).json({
        success: true,
        message: "Task Deleted Successfully",
      });
    } catch (error) {
      next(error);
    }
  };
  
import {Items} from '../models/Items.js'
import ErrorHandler from '../middlewares/error.js'
import mongoose from 'mongoose';
import { Types } from 'mongoose';


export const getMyItems = async(req, res,next)=>{
   try{
     const userId = req.user._id
     console.log("User id :", userId)
    //  console.log(req.user)
     const items = await Items.find({ user: userId })

    // console.log("the item will be send :", items)
     res.status(201).json({
         success: true,
         message:"Task found Successfully",
         items: items[0],
     })
   }catch(error){
    next(error)
   }
} 
// export const addItems = async (req, res, next) => {
//     try {
//       const items = req.body.items;
//       const convertedItems = items.map((item) => {
//         const convertedTasks = item.tasks.map((task) => {
//           if (mongoose.Types.ObjectId.isValid(task._id)) {
//             return task;
//           } else {
//             return {
//               ...task,
//               _id: new Types.ObjectId(), // Generate a new ObjectId
//             };
//           }
//         });
  
//         return {
//           ...item,
//           tasks: convertedTasks,
//         };
//       });
  
//       const user = req.user;
  
//       const updatedUser = await Items.findOneAndUpdate(
//         { user: user._id },
//         { items: convertedItems },
//         { new: true }
//       );
  
//       res.status(200).json(updatedUser.items);
//     } catch (error) {
//       next(error);
//     }
//   };
  
export const addItems = async (req, res, next) => {
    try {
      const items = req.body.items;
      const convertedItems = items.map((item) => {
        if (mongoose.Types.ObjectId.isValid(item._id)) {
          return item;
        } else {
          return {
            ...item,
            _id: new Types.ObjectId(), // Generate a new ObjectId
          };
        }
      }).map((item) => {
        const convertedTasks = item.tasks.map((task) => {
          if (mongoose.Types.ObjectId.isValid(task._id)) {
            return task;
          } else {
            return {
              ...task,
              _id: new Types.ObjectId(), // Generate a new ObjectId
            };
          }
        });
  
        return {
          ...item,
          tasks: convertedTasks,
        };
      });
  
      const user = req.user;
  
      const updatedUser = await Items.findOneAndUpdate(
        { user: user._id },
        { items: convertedItems },
        { new: true }
      );
  
      res.status(200).json(updatedUser.items);
    } catch (error) {
      next(error);
    }
  };
  
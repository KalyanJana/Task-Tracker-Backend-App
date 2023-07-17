import { User } from '../models/User.js'
import {Items} from '../models/Items.js'
import ErrorHandler from "../middlewares/error.js"
import jwt from 'jsonwebtoken'

export const getMyDetails = async(req, res, next)=>{
    try {
        res.status(200).json({
            success:true,
            user:req.user,
        })
    } catch (error) {
        next(error)
    } 
}

export const register = async(req, res, next)=>{
    try{
        const data = req.body

    const user = new User(data)

    await user.save()


        // Create default Items
        const defaultItems = [
            {
              title: "Getting Started",
              isItAddColumn: false,
              tasks: [
                {
                  task: `Task Cards are ideas or tasks to complete. Tap + to add a Task Card and assign it with a color.\n\nUse Columns to track status - such as In Progress or Complete This Week - or create different lists. We've started you with some suggestions for column names but you can change them to whatever you want.\n\nBoards are used to separate projects - such as Shopping Lists, Trip Plans, and Work. The first one we named My Board but feel free to rename it!`,
                  taskBgColor: "#0892d0",
                  taskHeight: 300,
                },
                {
                  task: `Create an account in order to access your Kanbana from multiple devices and on the web at www.Kanbana.com. Become a Premium Subscriber to use more than 20 Task Cards or create multiple Boards.\n\nFeel free to delete these instructional Task Cards. You can always click Help in the side menu for assistance.`,
                  taskBgColor: "#2e8b57",
                  taskHeight: 200,
                },
                {
                  task: `With Kanbana, you use:\n• Task Cards\n• Columns\n• Boards\n\nYou can easily add, edit, move, or delete Task Cards, Columns and Boards.`,
                  taskBgColor: "#ff6700",
                  taskHeight: 150,
                },
              ],
            },
            {
              title: "Today Action Items",
              isItAddColumn: false,
              tasks: [],
            },
            {
              title: "Done!",
              isItAddColumn: false,
              tasks: [],
            },
            {
              title: "Future",
              isItAddColumn: false,
              tasks: [],
            },
            {
              title: "",
              isItAddColumn: true,
              tasks: [],
            },
          ];
          
          // Create default Items
          const defaultItemsData = {
            items: defaultItems,
            user: user._id,
          };
          
          // Save the default Items
          const savedItems = await Items.create(defaultItemsData);
          
          // Associate the Items with the user
        //   user.items = savedItems._id;
          await user.save();
          


    // This is for sending Cookies 
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET) //Here the id is encripted to send it as token value in cookies.

    res
    .status(200)
    .cookie("token", token,{
                httpOnly:true,
                maxAge:100*60*1000,
                sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
                secure: process.env.NODE_ENV === "Development" ? false : true,
            })
    .json({
                message:"Register Successfully", 
                user
            })
    }catch(error){
        next(error)
    }


    // res.status(200).json({message:"User Added Successfully", user})
}

export const login = async(req, res, next)=>{
    try{
        const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user) return next( new ErrorHandler("Invalid Email or Password"))

    // This is for sending Cookies 
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET) //Here the id is encripted to send it as token value in cookies.

    res
    .status(200)
    .cookie("token", token,{
            httpOnly:true,
            maxAge:100*60*1000,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        })
    .json({
            message:"Login Successfully", user
        })
    }catch(error){
        next(error)
    }

    // res.status(200).json({message:"Login Successfully", user})
}

export const logout = async(req, res)=>{

    try{
        res
        .status(200)
        .cookie("token","",{
            expire:new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        })
        .json({
            success:true,
            message:"Logout Successfully",
            user:req.user
        })
    }catch(error){
        next(error)
    }
    // res.status(200).json({message:"Logout Successfully"})
}

export const updateUserDetails = async(req, res)=>{
    const id = req.params.id
    const newTask = req.body

    const data = await User.findByIdAndUpdate(id, newTask)
    res.status(201).json({message: "Reminder Updated Successfully"})
}
export const deleteUserDetails = async(req, res)=>{
    const id = req.params.id

    const task = await User.findByIdAndDelete(id)
    res.status(204).json({message: "Task Deleted Successfully"})
}
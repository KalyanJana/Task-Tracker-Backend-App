import express from 'express'
// import { User } from '../models/User.js'
import{ getMyDetails, register, login, updateUserDetails, deleteUserDetails, logout} from '../controllers/user.js'
import { isAuthenticated } from '../middlewares/auth.js'

const userRouter = express.Router()


userRouter.get("/my",isAuthenticated, getMyDetails)
userRouter.get("/logout", logout)
userRouter.post("/new", register)
userRouter.post("/login", login)


userRouter
    .route("/:id")
    .put(updateUserDetails)
    .delete(deleteUserDetails)

export default userRouter















// import express from 'express'
// import { User } from '../models/User.js'

// const userRouter = express.Router()

// // Define API routes
// userRouter.get('/examples', async (req, res) => {
//     try {
//       const examples = await User.find();
//       res.json(examples);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  
//   userRouter.get('/examples/:id', async (req, res) => {
//     try {
//       const example = await User.findById(req.params.id);
//       res.json(example);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  
//   userRouter.post('/examples', async (req, res) => {
//     const example = new User({
//       name: req.body.name,
//       age: req.body.age,
//     });
  
//     try {
//       const newExample = await example.save();
//       res.status(201).json(newExample);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
  
//   userRouter.put('/examples/:id', async (req, res) => {
//     try {
//       const example = await User.findById(req.params.id);
//       example.name = req.body.name;
//       example.age = req.body.age;
  
//       const updatedExample = await example.save();
//       res.json(updatedExample);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
  
//   userRouter.delete('/examples/:id', async (req, res) => {
//     try {
//       const example = await User.findById(req.params.id);
//       await example.remove();
//       res.json({ message: 'Example deleted successfully' });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });


//   export default userRouter
  
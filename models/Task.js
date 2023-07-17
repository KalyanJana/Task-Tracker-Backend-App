import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  taskBGColor: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Task = mongoose.model('Task', taskSchema);

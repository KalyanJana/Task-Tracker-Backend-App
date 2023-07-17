import mongoose from 'mongoose';

const itemsSchema = new mongoose.Schema({
  items: [
    {
      title: {
        type: String,
        required: false,
      },
      isItAddColumn: {
        type: Boolean,
        required: true,
        default: false,
      },
      tasks: [
        {
          task: {
            type: String,
            required: true,
          },
          taskBgColor: {
            type: String,
            required: true,
          },
          taskHeight: {
            type: Number,
            required: true,
            default: 5,
          },
        },
      ],
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Items = mongoose.model('Items', itemsSchema);

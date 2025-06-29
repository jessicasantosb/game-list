import mongoose from 'mongoose';

const gamesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Playing', 'Done', 'Abandoned'],
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    acquisition_date: {
      type: Date,
      required: true,
    },
    finish_date: {
      type: Date,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const gamesModel = mongoose.model('games', gamesSchema);

export default gamesModel;

import mongoose, { Schema, Document } from 'mongoose';

export interface IFoodItem extends Document {
  name: string;
  category: mongoose.Types.ObjectId;
  description: string;
  price: {
    half?: number;
    full: number;
  };
  image: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FoodItemSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    half: {
      type: Number,
    },
    full: {
      type: Number,
      required: true,
    },
  },
  image: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.FoodItem || mongoose.model<IFoodItem>('FoodItem', FoodItemSchema);
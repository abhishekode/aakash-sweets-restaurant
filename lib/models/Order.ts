import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  items: Array<{
    foodId: mongoose.Types.ObjectId;
    quantity: number;
    size: 'half' | 'full';
    price: number;
  }>;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    notes?: string;
  };
  status: 'pending' | 'accepted' | 'cooking' | 'delivered';
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
  items: [{
    foodId: {
      type: Schema.Types.ObjectId,
      ref: 'FoodItem',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    size: {
      type: String,
      enum: ['half', 'full'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  }],
  customer: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'cooking', 'delivered'],
    default: 'pending',
  },
  total: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
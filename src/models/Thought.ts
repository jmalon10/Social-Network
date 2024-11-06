// models/Thought.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

// Define Reaction Schema
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => timestamp.toLocaleString()
  }
},
{
  toJSON: {
    getters: true
  },
  id: false
});

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Types.Array<typeof reactionSchema>;
  reactionCount: number;
}

const thoughtSchema = new Schema<IThought>({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: Date) => timestamp.toLocaleString()
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

// Virtual property to get reaction count
thoughtSchema.virtual('reactionCount').get(function(this: IThought) {
  return this.reactions.length;
});

const Thought = mongoose.model<IThought>('Thought', thoughtSchema);
export default Thought;

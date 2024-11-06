import mongoose, { Schema, Document, Types } from 'mongoose';

// Reaction Schema
const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp: any) => timestamp.toString(), // Use `toString()` if `toLocaleString()` is not working
  },
});

interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions: Types.Array<typeof reactionSchema>;
  reactionCount: number;
}

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Schema.Types.Date,
      default: Date.now,
      get: (timestamp: any) => timestamp.toString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});

const Thought = mongoose.model<IThought>('Thought', thoughtSchema);
export default Thought;



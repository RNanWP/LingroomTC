import { Schema, model, Document, Types } from "mongoose";

export interface IComment extends Document {
  content: string;
  post: Types.ObjectId;
  author: Types.ObjectId;
  parentComment?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    parentComment: { type: Schema.Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true }
);

export const Comment = model<IComment>("Comment", CommentSchema);

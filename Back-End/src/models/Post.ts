import { Schema, model, Document, Types } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
  updateAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Post = model<IPost>("Post", PostSchema);

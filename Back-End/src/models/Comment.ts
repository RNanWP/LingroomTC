import { Schema, model, Document, Types } from "mongoose";

export interface IComment extends Document {
  content: string;
  post: Types.ObjectId;
  author: Types.ObjectId;
  parentComment?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  replies?: IComment[];
}

const CommentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  { timestamps: true }
);

CommentSchema.virtual("replies", {
  ref: "Comment",
  localField: "_id",
  foreignField: "parentComment",
});

CommentSchema.set("toObject", { virtuals: true });
CommentSchema.set("toJSON", { virtuals: true });

export const Comment = model<IComment>("Comment", CommentSchema);

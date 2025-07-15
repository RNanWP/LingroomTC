"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    content: { type: String, require: true },
    post: { type: mongoose_1.Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    parentComment: { type: mongoose_1.Schema.Types.ObjectId, ref: "Comment" },
}, { timestamps: true });
exports.Comment = (0, mongoose_1.model)("Comment", CommentSchema);

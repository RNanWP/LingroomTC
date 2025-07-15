"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsByPostService = getCommentsByPostService;
exports.createCommentService = createCommentService;
exports.createReplyService = createReplyService;
const Comment_1 = require("../models/Comment");
// busca comentários
function getCommentsByPostService(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        return Comment_1.Comment.find({ post: postId, parentComment: null })
            .populate("author", "name")
            .populate({
            path: "replies",
            populate: { path: "author", select: "name" },
        })
            .sort({ createdAt: "desc" });
    });
}
// cria comentario
function createCommentService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = new Comment_1.Comment({
            content: data.content,
            post: data.postId,
            author: data.authorId,
        });
        return yield comment.save();
    });
}
// cria resposta
function createReplyService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const reply = new Comment_1.Comment({
            content: data.content,
            post: data.postId,
            author: data.authorId,
            parentComment: data.parentCommentId,
        });
        return yield reply.save();
    });
}

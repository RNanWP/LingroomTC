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
exports.searchPostService = searchPostService;
exports.getAdminPostService = getAdminPostService;
exports.getAllPostsService = getAllPostsService;
exports.getPostByIdService = getPostByIdService;
exports.createPostService = createPostService;
exports.updatePostService = updatePostService;
exports.deletePostService = deletePostService;
const Post_1 = require("../models/Post");
// Buscar post por palavra chave no titulo ou conteudo
function searchPostService(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const searchRegex = new RegExp(query, "i");
        return Post_1.Post.find({
            $or: [
                { title: { $regex: searchRegex } },
                { content: { $regex: searchRegex } },
            ],
        })
            .sort({ createdAt: -1 })
            .exec();
    });
}
// Retorna todos os posts para gerenciamento (ADM)
function getAdminPostService() {
    return __awaiter(this, void 0, void 0, function* () {
        return Post_1.Post.find().sort({ createdAt: -1 }).exec();
    });
}
// ------
function getAllPostsService() {
    return __awaiter(this, void 0, void 0, function* () {
        return Post_1.Post.find().sort({ createdAt: -1 }).exec();
    });
}
function getPostByIdService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return Post_1.Post.findById(id).exec();
    });
}
function createPostService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const post = new Post_1.Post(data);
        return post.save();
    });
}
function updatePostService(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return Post_1.Post.findByIdAndUpdate(id, data, { new: true }).exec();
    });
}
function deletePostService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return Post_1.Post.findByIdAndDelete(id).exec();
    });
}

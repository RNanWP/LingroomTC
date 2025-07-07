"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.searchPosts = searchPosts;
exports.getAdminPosts = getAdminPosts;
exports.getAllPosts = getAllPosts;
exports.getPostById = getPostById;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
const postService = __importStar(require("../services/postServices"));
// barra de pesquisa
function searchPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = req.query.q;
        if (!query || typeof query !== "string") {
            return res
                .status(400)
                .json({ message: "Parâmetro de busca é obrigatório" });
        }
        try {
            const post = yield postService.searchPostService(query);
            res.json(post);
        }
        catch (err) {
            res.status(500).json({ message: "Erro ao buscar posts" });
        }
    });
}
// Visão ADM
function getAdminPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const posts = yield postService.getAdminPostService();
            res.json(posts);
        }
        catch (err) {
            res.status(500).json({ message: "Erro ao buscar posts para admin" });
        }
    });
}
function getAllPosts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const posts = yield postService.getAllPostsService();
            res.json(posts);
        }
        catch (err) {
            res.status(500).json({ message: "Erro ao buscar posts" });
        }
    });
}
function getPostById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const post = yield postService.getPostByIdService(id);
            if (!post)
                return res.status(404).json({ message: "Post não encontrado" });
            res.json(post);
        }
        catch (err) {
            res.status(500).json({ message: "Error ao buscar post" });
        }
    });
}
function createPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, content, author } = req.body;
            const newPost = yield postService.createPostService({
                title,
                content,
                author,
            });
            res.status(201).json(newPost);
        }
        catch (err) {
            res.status(500).json({ message: "Erro ao criar post" });
        }
    });
}
function updatePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const updated = yield postService.updatePostService(id, req.body);
            if (!updated)
                return res.status(404).json({ message: "Post não encontrado" });
            res.json(updated);
        }
        catch (err) {
            res.status(500).json({ message: "Erro ao atualizar post" });
        }
    });
}
function deletePost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            yield postService.deletePostService(id);
            res.status(204).send();
        }
        catch (err) {
            res.status(500).json({ message: "Erro ao excluir post" });
        }
    });
}

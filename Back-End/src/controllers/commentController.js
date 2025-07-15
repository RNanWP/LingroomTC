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
exports.getCommentsByPost = getCommentsByPost;
exports.createComment = createComment;
exports.createReply = createReply;
const commentService = __importStar(require("../services/commentService"));
// listar comentarios
function getCommentsByPost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const comments = yield commentService.getCommentsByPostService(req.params.postId);
            res.status(200).json(comments);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Erro ao buscar comentários", error: error.message });
        }
    });
}
// Criar comentario
function createComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { content } = req.body;
            const postId = req.params.postId;
            const authorId = req.user.id;
            if (!content) {
                return res
                    .status(400)
                    .json({ message: "O conteúdo do cometário é obrigatório" });
            }
            const newComment = yield commentService.createCommentService({
                content,
                postId,
                authorId,
            });
            res.status(201).json(newComment);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Erro ao criar comentário", error: error.message });
        }
    });
}
// Criar resposta
function createReply(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { content } = req.body;
            const { postId, commentId } = req.params;
            const authorId = req.user.id;
            if (!content) {
                return res
                    .status(400)
                    .json({ message: "O conteúdo da resposta é obrigatório" });
            }
            const newReply = yield commentService.createReplyService({
                content,
                postId,
                authorId,
                parentCommentId: commentId,
            });
            res.status(201).json(newReply);
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Erro ao criar resposta", error: error.message });
        }
    });
}

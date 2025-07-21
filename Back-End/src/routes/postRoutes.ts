import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth";
import { asyncHandler } from "../utils/asyncHandler";
import * as postController from "../controllers/postController";

const router = Router();

/**
 * @swagger
 * components:
 * schemas:
 * Post:
 * type: object
 * required:
 * - title
 * - content
 * - author
 * properties:
 * _id:
 * type: string
 * description: O ID gerado automaticamente para o post
 * title:
 * type: string
 * description: O título do post
 * content:
 * type: string
 * description: O conteúdo do post
 * author:
 * type: string
 * description: O ID do autor do post
 * createdAt:
 * type: string
 * format: date-time
 * description: A data de criação do post
 * updatedAt:
 * type: string
 * format: date-time
 * description: A data da última atualização do post
 * example:
 * _id: 60d21b4667d0d8992e610c8b
 * title: "Introdução ao TypeScript"
 * content: "TypeScript é um superset do JavaScript..."
 * author: 60d21b4667d0d8992e610c8a
 * createdAt: "2024-07-21T17:32:28Z"
 * updatedAt: "2024-07-21T17:32:28Z"
 */

/**
 * @swagger
 * tags:
 * name: Posts
 * description: API para gerenciamento de posts
 */

/**
 * @swagger
 * /api/posts:
 * get:
 * summary: Lista todos os posts
 * tags: [Posts]
 * responses:
 * 200:
 * description: Uma lista de posts.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Post'
 * 500:
 * description: Erro no servidor.
 */
router.get("/posts", asyncHandler(postController.getAllPosts));

/**
 * @swagger
 * /api/posts/search:
 * get:
 * summary: Busca posts por um termo no título ou conteúdo
 * tags: [Posts]
 * parameters:
 * - in: query
 * name: q
 * schema:
 * type: string
 * required: true
 * description: O termo a ser buscado.
 * responses:
 * 200:
 * description: Uma lista de posts que correspondem ao termo de busca.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Post'
 * 400:
 * description: Parâmetro de busca 'q' não foi fornecido.
 * 500:
 * description: Erro no servidor.
 */
router.get("/posts/search", asyncHandler(postController.searchPosts));

/**
 * @swagger
 * /api/posts/{id}:
 * get:
 * summary: Busca um post específico pelo ID
 * tags: [Posts]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: O ID do post.
 * responses:
 * 200:
 * description: O post encontrado.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Post'
 * 404:
 * description: Post não encontrado.
 * 500:
 * description: Erro no servidor.
 */
router.get("/posts/:id", asyncHandler(postController.getPostById));

/**
 * @swagger
 * /api/posts:
 * post:
 * summary: Cria um novo post
 * tags: [Posts]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - title
 * - content
 * properties:
 * title:
 * type: string
 * content:
 * type: string
 * example:
 * title: "Novo Post sobre Node.js"
 * content: "Conteúdo detalhado sobre o novo post."
 * responses:
 * 201:
 * description: Post criado com sucesso.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Post'
 * 401:
 * description: Acesso não autorizado (token inválido ou ausente).
 * 403:
 * description: Acesso proibido (usuário não tem permissão de 'professor' ou 'administrador').
 * 500:
 * description: Erro no servidor.
 */
router.post(
  "/posts",
  authenticate,
  authorize("professor", "administrador"),
  asyncHandler(postController.createPost)
);

/**
 * @swagger
 * /api/posts/{id}:
 * put:
 * summary: Atualiza um post existente
 * tags: [Posts]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: O ID do post a ser atualizado.
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * title:
 * type: string
 * content:
 * type: string
 * example:
 * title: "Título do Post Atualizado"
 * content: "Conteúdo do post devidamente atualizado."
 * responses:
 * 200:
 * description: Post atualizado com sucesso.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Post'
 * 401:
 * description: Acesso não autorizado.
 * 403:
 * description: Acesso proibido.
 * 404:
 * description: Post não encontrado.
 * 500:
 * description: Erro no servidor.
 */
router.put(
  "/posts/:id",
  authenticate,
  authorize("professor", "administrador"),
  asyncHandler(postController.updatePost)
);

/**
 * @swagger
 * /api/posts/{id}:
 * delete:
 * summary: Deleta um post
 * tags: [Posts]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: O ID do post a ser deletado.
 * responses:
 * 204:
 * description: Post deletado com sucesso (sem conteúdo).
 * 401:
 * description: Acesso não autorizado.
 * 403:
 * description: Acesso proibido.
 * 500:
 * description: Erro no servidor.
 */
router.delete(
  "/posts/:id",
  authenticate,
  authorize("professor", "administrador"),
  asyncHandler(postController.deletePost)
);

/**
 * @swagger
 * /api/admin/posts:
 * get:
 * summary: Retorna todos os posts para gerenciamento (Rota de ADM)
 * tags: [Posts]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Uma lista completa de todos os posts no sistema.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Post'
 * 401:
 * description: Acesso não autorizado.
 * 403:
 * description: Acesso proibido (requer permissão de 'administrador').
 * 500:
 * description: Erro no servidor.
 */
router.get(
  "/admin/posts",
  authenticate,
  authorize("administrador"),
  asyncHandler(postController.getAdminPosts)
);

export default router;

// -----------------------------------------------------------------------
// const router = Router();

// // Rotas publicas
// router.get("/posts", asyncHandler(postController.getAllPosts));
// router.get("/posts/search", asyncHandler(postController.searchPosts));
// router.get("/posts/:id", asyncHandler(postController.getPostById));

// // Rotas protegidas
// router.post(
//   "/posts",
//   authenticate,
//   authorize("professor", "administrador"),
//   asyncHandler(postController.createPost)
// );
// router.put(
//   "/posts/:id",
//   authenticate,
//   authorize("professor", "administrador"),
//   asyncHandler(postController.updatePost)
// );
// router.delete(
//   "/posts/:id",
//   authenticate,
//   authorize("professor", "administrador"),
//   asyncHandler(postController.deletePost)
// );

// // Rota ADM
// router.get(
//   "/admin/posts",
//   authenticate,
//   authorize("administrador"),
//   asyncHandler(postController.getAdminPosts)
// );

// export default router;

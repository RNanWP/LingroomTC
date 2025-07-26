# TECH CHALLENGE FIAP - LingroomTC Back-End

Bem-vindo ao back-end do projeto LingroomTC! Esta é uma API RESTful completa, desenvolvida como parte de um desafio técnico, que serve como base para uma plataforma de aprendizado interativa (blog educacional).

Desde a concepção, o foco foi criar uma aplicação robusta, escalável e de fácil manutenção, seguindo as melhores práticas do mercado de desenvolvimento de software.

## ✨ Visão Geral e Funcionalidades

Este projeto não é apenas um conjunto de endpoints; é uma base sólida construída com uma arquitetura pensada para o futuro.

* **Autenticação Segura:** Sistema de registro e login com tokens JWT, utilizando `bcryptjs` para hashing de senhas.
* **Controle de Acesso por Papel (RBAC):**
    * **Alunos:** Podem consumir conteúdo e interagir através de comentários.
    * **Professores:** São os criadores de conteúdo, podendo gerenciar posts e responder a dúvidas.
    * **Administradores:** Têm controle total sobre todas as entidades do sistema (usuários, posts, comentários).
* **Gerenciamento de Conteúdo:** CRUD completo para posts.
* **Sistema de Interação:** Um sistema de comentários aninhados onde professores e administradores podem responder diretamente aos alunos.
* **Busca Flexível:** Um endpoint que permite pesquisar posts por título ou conteúdo.
* **Documentação Interativa:** A API é 100% documentada e testável via Swagger, acessível no endpoint `/api-docs`.

## 🛠️ Arquitetura e Tecnologias

A escolha das tecnologias foi feita para garantir produtividade, performance e confiabilidade.

* **Linguagem:** **TypeScript**
* **Runtime e Framework:** **Node.js** + **Express**
* **Banco de Dados:** **MongoDB (NoSQL)**
* **ODM:** **Mongoose**
* **Containerização:** **Docker** e **Docker Compose**
* **CI/CD:** **GitHub Actions**
* **Testes:** **Jest** + **Supertest**
* **Documentação:** **Swagger (OpenAPI)**

A arquitetura segue o padrão **Controller-Service-Model**, garantindo uma separação clara de responsabilidades, o que torna o código mais limpo e testável.

## 🚀 Como Executar Localmente

Você pode ter todo o ambiente rodando na sua máquina com um único comando, graças ao Docker.

**Pré-requisitos:**
* [Docker](https://www.docker.com/products/docker-desktop/)
* [Docker Compose](https://docs.docker.com/compose/install/)

**Passos:**

1.  **Clone o Repositório**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd LingroomTC/Back-End
    ```

2.  **Crie o Arquivo de Ambiente**
    Crie um arquivo chamado `.env` na raiz da pasta `Back-End` e adicione as seguintes variáveis:
    ```env
    MONGO_URI=mongodb://mongo:27017/LingroomTC
    PORT=3000
    JWT_SECRET=seu_segredo_super_secreto_aqui
    ```
    > **Nota:** O `JWT_SECRET` é crucial para a segurança da autenticação. Use um valor longo e aleatório.

3.  **Inicie os Contêineres**
    Execute o comando:
    ```bash
    docker-compose up --build
    ```

Pronto! A API estará disponível em `http://localhost:3000` e o banco de dados MongoDB estará acessível na porta `27017`.

## 📂 Estrutura de Pastas

A estrutura do projeto foi cuidadosamente organizada para seguir as melhores práticas de desenvolvimento, garantindo uma clara separação de responsabilidades

```
/Back-End
├── .github/                # Configurações de Integração Contínua (GitHub Actions)
│   └── workflows/
│       └── ci-cd.yml       # Define o pipeline de build, teste e deploy automatizado.
├── src/                    # Contém todo o código-fonte da aplicação.
│   ├── config/             # Arquivos de configuração (variáveis de ambiente, definição do Swagger).
│   ├── controllers/        # Camada de entrada: recebe as requisições HTTP e retorna as respostas. Orquestra o fluxo.
│   ├── middlewares/        # Funções que interceptam requisições (ex: autenticação, autorização, logs).
│   ├── models/             # Definição dos Schemas do Mongoose, que modelam os dados no MongoDB.
│   ├── routes/             # Mapeamento dos endpoints (URLs) para as funções dos controllers correspondentes.
│   ├── services/           # Onde a lógica de negócio principal da aplicação reside.
│   ├── tests/              # Suíte de testes automatizados para garantir a qualidade e estabilidade da API.
│   ├── utils/              # Funções auxiliares e helpers reutilizáveis em várias partes do projeto.
│   ├── app.ts              # Configuração central da aplicação Express (middlewares, rotas).
│   └── server.ts           # Ponto de entrada que inicia o servidor e estabelece a conexão com o banco de dados.
├── .env.example            # Arquivo de exemplo para as variáveis de ambiente necessárias.
├── .gitignore              # Lista de arquivos e pastas a serem ignorados pelo sistema de controle de versão Git.
├── docker-compose.yml      # Orquestra a inicialização dos containers da aplicação e do banco de dados.
├── Dockerfile              # "Receita" para construir a imagem Docker da aplicação, otimizada para produção.
├── jest.config.js          # Arquivo de configuração principal para o framework de testes Jest.
├── jest.setup.ts           # Script de setup que roda antes da suíte de testes (ex: conectar ao DB de teste).
├── package.json            # Metadados do projeto e lista de dependências (produção e desenvolvimento).
└── tsconfig.json           # Configurações do compilador TypeScript.
```

## Fluxo de uma Requisição
Para ilustrar como as pastas se conectam, o fluxo de uma requisição (POST /api/posts) seria:

1. A requisição chega no server.ts e é passada para o app.ts.

2. O app.ts direciona a requisição para o arquivo de rotas correto (/routes/postRoutes.ts).

3. A rota postRoutes.ts aciona os middlewares (/middlewares/auth.ts) para verificar a autenticação e autorização.

4. Se autorizado, a rota chama a função correspondente no /controllers/postController.ts.

5. O controller invoca o /services/postService.ts para executar a lógica de negócio de criar um post.

6. O service utiliza o /models/Post.ts para criar e salvar o novo documento no MongoDB.

7. O resultado volta pela mesma cadeia (Service -> Controller), que então envia a resposta final ao cliente.

## 🧪 Testando a API

### Com a Documentação Swagger

A forma mais fácil de explorar e testar a API é através da documentação interativa.

* **Acesse:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Lá você poderá ver todos os endpoints, seus parâmetros e schemas, além de poder executar requisições diretamente do navegador.

### Com Testes Automatizados

O projeto conta com uma suíte de testes de integração robusta. Para executá-la:

1.  Certifique-se de que as dependências de desenvolvimento estão instaladas:
    ```bash
    npm install
    ```
2.  Execute os testes:
    ```bash
    npm run test
    ```
    Isso irá rodar todos os testes e gerar um relatório de cobertura de código na pasta `/coverage`.

## ⚙️ Pipeline de CI/CD

Este projeto utiliza **GitHub Actions** para automação. A cada `push` ou `pull request` na branch `main`:
1.  O ambiente é configurado com a versão correta do Node.js e um banco de dados MongoDB de teste.
2.  As dependências são instaladas.
3.  A suíte de testes completa é executada para garantir que nenhuma funcionalidade foi quebrada.

Futuramente, o pipeline será estendido para realizar o build da imagem Docker e o deploy automático em um ambiente de produção.
# TECH CHALLENGE FASE 2 FIAP - LingroomTC Back-End - 2025

Bem-vindo ao back-end do projeto LingroomTC! Esta é uma API RESTful completa, desenvolvida como parte de um desafio técnico, que serve para uma plataforma de aprendizado interativa (blog educacional).

Desde a concepção, o foco foi criar uma aplicação robusta, escalável e de fácil manutenção, seguindo as melhores práticas do mercado de desenvolvimento de software.

## ✨ Visão Geral e Funcionalidades

Este projeto não é apenas um conjunto de endpoints; é uma base sólida construída com uma arquitetura pensada para o futuro.

* **Autenticação Segura:** Sistema de registro e login com tokens JWT.
* **Controle de Acesso por Papel (RBAC):**
    * **Alunos:** Podem consumir conteúdo e interagir através de comentários.
    * **Professores:** São os criadores de conteúdo, podendo gerenciar posts e responder a dúvidas.
    * **Administradores:** Têm controle total sobre todas as entidades do sistema.
* **Gerenciamento de Conteúdo:** CRUD completo para posts.
* **Sistema de Interação:** Um sistema de comentários aninhados onde professores podem responder diretamente aos alunos.
* **Busca Flexível:** Um endpoint que permite pesquisar posts por título ou conteúdo.
* **Documentação Interativa:** A API é 100% documentada e testável via Swagger.

## 🛠️ Tecnologias e Arquitetura

A escolha das tecnologias foi feita para garantir produtividade, performance e confiabilidade.

* **Linguagem:** **TypeScript**
* **Runtime e Framework:** **Node.js** + **Express**
* **Banco de Dados:** **MongoDB (NoSQL)**
* **ODM:** **Mongoose**
* **Containerização:** **Docker** e **Docker Compose**
* **CI/CD:** **GitHub Actions**
* **Testes:** **Jest** + **Supertest**
* **Documentação:** **Swagger (OpenAPI)**

A arquitetura segue o padrão **Controller-Service-Model**, garantindo uma separação clara de responsabilidades, o que torna o código mais limpo e testável. Para uma análise aprofundada, consulte a documentação completa do projeto.

## 🚀 Como Executar Localmente

Você pode ter todo o ambiente rodando na sua máquina com um único comando, graças ao Docker.

**Pré-requisitos:**
* [Docker](https://www.docker.com/products/docker-desktop/)
* [Docker Compose](https://docs.docker.com/compose/install/)

**Passos:**

1.  **Clone o Repositório**
    ```bash
    git clone [https://github.com/seu-usuario/LingroomTC.git](https://github.com/seu-usuario/LingroomTC.git)
    cd LingroomTC/Back-End
    ```

2.  **Crie o Arquivo de Ambiente**
    Crie um arquivo chamado `.env` na raiz da pasta `Back-End` e adicione as seguintes variáveis:
    ```env
    MONGO_URI=mongodb://mongo:27017/LingroomTC
    PORT=3000
    JWT_SECRET=seu_segredo_aqui
    ```

3.  **Inicie os Contêineres**
    Execute o comando mágico:
    ```bash
    docker-compose up --build
    ```

Pronto! A API estará disponível em `http://localhost:3000` e o banco de dados MongoDB estará acessível na porta `27017`.

## 🧪 Testando a API

### Com a Documentação Swagger

A forma mais fácil de explorar e testar a API é através da documentação interativa.
* **Acesse:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Lá você poderá ver todos os endpoints, seus parâmetros e schemas, além de poder executar requisições diretamente do navegador.

### Com Testes Automatizados

O projeto conta com uma suíte de testes de integração robusta. Para executá-la:
```bash
npm run test
```
Isso irá rodar todos os testes e gerar um relatório de cobertura de código na pasta `/coverage`.

## ⚙️ Pipeline de CI/CD

Este projeto utiliza **GitHub Actions** para automação. A cada `push` ou `pull request` na branch `main`:
1.  O ambiente é configurado com a versão correta do Node.js e um banco de dados MongoDB de teste.
2.  As dependências são instaladas.
3.  A suíte de testes completa é executada para garantir que nenhuma funcionalidade foi quebrada.

Futuramente, o pipeline será estendido para realizar o deploy automático da aplicação em um ambiente de produção.
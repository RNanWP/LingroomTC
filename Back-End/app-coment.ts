// Connect to Cluster0 Tech Challenge
//
// reenan92011
// uTUCcf8O3A2bB8P1

//          COISAS A SE FAZER NO PROJETO:
//
// Pegar o JWT Token e implementar-lo no código

//          DICAS E APRENDIZADOS
//
// .ENV usado para adicionar a rota do MongoDB.
// Ex:PORT=3000
// MONGO_URI=mongodb://mongo:27017/blogdb
// JWT_SECRET=dfsfs
//
//          --Try-catch--
// Try-catch, é usado para tratar erros e exceções que podem ocorrer durante a execução do códgo (O bloco "TRY" contém o código que pode gerar uma exceção, enquanto o "CATCH" contém o código que será executado caso uma exceção ocorra)
//
//           --Const--
// Const é um modificador que torna uma variável imutável. Usado para declarar constantes, valores que devem permanecer fixos
//
//           --Export--
// Export é usada para tornar elementos de um módulo (funções, classes, interfaces, etc) acessíveis a outros módulos
//
//
//          --DUVIDA NO CÓDIGO--
//
//    Como usar o .json e para que serve "res.status(201).json(newPost)"
// O método res.json() do Express transforma seu objeto JavaScript em JSON e envia como resposta HTTP.
// é como dizer “Envie uma resposta com status 201 (Created) e o corpo no formato JSON.”
//
//    Exclamação "!"
// É um operador lógico de negação lógica, função de inverter um valor booleano.
// usamos para checar se uma variável não é null ou undefined
// garantir que um valor obrigatório não é vazio
// 
//    Schema
// O schema é um modelo que define a estrutura lógica de um banco de dados, incuindo tabelas, colunas, tipos de dados, relacionamentos e restrições
// Ele é usado no banco de dados mostrando como os dados são organizados e como eles podem ser acessados
// 
//    Timetamps
// Usando para documentar e registrar quando um evento ocorreu, como a criação ou modificação de um arquivo, ou o envio de uma mensagem
// Em alguem casos podem ser usados para verificar a autenticidade de um documento eletronico


//          INSTALAÇÃOES
// _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
// npm install express
// npm install -- save-dev nodemon ou npm install -g nodemon
// tsc --init / create tsconfig.json
// npm i --save-dev @types/express` / para o tsconfig
// npm install --save-dev jest
// docker-compose up --build
// npm run build
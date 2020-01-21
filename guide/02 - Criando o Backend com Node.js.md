# Criando o Backend com Node.js
Obs.: Este guia não tem como objetivo ensinar todos os pormenores das tecnologias utilizadas. A intenção é apenas deixar um caminho introdutório para o reaproveitamento do aprendizado adquirido na Semana OmniStack 10.0 da Rocketseat.

### 1- Iniciando o projeto
Dentro do diretório do projeto no terminal do sistema operacional, execute:
```
yarn init -y
```
Assim, o Yarn instalará todas as dependências inicias de um projeto, agora é só abrir o projeto no VS Code:
```
code .
```

### 2- Importando o Express
> O Express.js é um framework Node que cria abstrações de rotas, middlewares e muitas outras funções para facilitar a criação tanto de API's quanto SPA's.

Pesquisar os três tipos de parâmetros principais do Express: Query Params, Route Params e Body.

Dentro do terminal integrado do VS Code (Ctrl + "), execute:
```
yarn add express
```
Poderá utilizá-lo como:
```
const express = require('express');

const app = express();
```
E acessar métodos importantes para a conexão, como por exemplo:
```
app.get('/', (request, response) => {
    return response.json({message: 'Hello World'})
});

app.use(express.json());

app.listen(3333);
```
### 3- Importando o Nodemon
>O Nodemon permite que a gente rode um script em node em que ele fique monitorando os arquivos. Caso você altere (salve as alterações), ele restarta automaticamente o servidor, isso é muito interessante principalmente quando vamos fazer algo com o express.

Dentro do terminal integrado do VS Code (Ctrl + "), execute:
```
yarn add nodemon -D
```
Agora para executar nossa aplicação, podemos executar:
```
yarn nodemon index.js
```
Podemos criar um script que encurtará o comando acima. No arquivo package.json, adicione o comando:
```
"scripts": {
    "dev": "nodemon src/index.js"
},
```
### 4- Instalando o Insomnia
> Insomnia é um cliente GraphQL e REST multiplataforma. Para não depender de um Frontend para fazer os requests, o aplicativo Insomnia facilita a comunicação com nosso Backend para testes iniciais. Basta baixá-lo no [site oficial](https://insomnia.rest/). 
Obs.: Não funciona em sistemas x86 (32-bits), apenas x64. (Alternativa: Postman).

Extremamente útil para testar rotas e diferentes tipos de métodos HTTP do tipo REST (Get, Post, Delete etc).

### 5- Preparando o MongoDB Atlas
> O MongoDB é um sistema de bando de dados não-relacional que permite os desenvolvedores experimentarem gratuitamente, basta criar uma conta gratuita no [site oficial](https://www.mongodb.com/cloud/atlas).

Após possuir uma conta no MongoDB, é necessário criar um Cluster:
1. Build a Cluster
2. Selecione o plano Free
3. Pode deixar as configurações recomendadas, Create a Cluster
4. Enquanto agaurda o Cluster ser criado, vá em Security > Database Access
5. Add New User
6. Digite Usuário, Senha e determine os privilégios.
7. Vá em Security > Network Access
8. Add IP Address
9. Add Current IP Address ou Allow Acess From Anywhere
10. Confirm
11. Retorne ao Cluster, vá em Connect
12. Connect Your Application
13. Selecione o Driver (Node.js) e a versão desejada (3.0+ ou 2.2.12+)
14. Copie a String de conexão

### 6- Importando o Mongoose
> Mongoose é uma biblioteca do Nodejs que proporciona uma solução baseada em esquemas para modelar os dados da sua aplicação. Ele possui sistema de conversão de tipos, validação, criação de consultas e hooks para lógica de negócios.

> O Mongoose fornece um mapeamento de objetos do MongoDB similar ao ORM (Object Relational Mapping), ou ODM (Object Data Mapping) no caso do Mongoose. Isso significa que o Mongoose traduz os dados do banco de dados para objetos JavaScript para que possam ser utilizados por sua aplicação.

Dentro do terminal integrado do VS Code (Ctrl + "), execute:
```
yarn add mongose
```
E para acessar seus recursos, deverá importá-lo da forma:
```
const mongoose = require('mongoose');
```
Após a criação da aplicação do express ser criada, conecte ao banco de dados utilizando:
```
mongoose.connect('String de conexão', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
```
Dentro da String você deverá inserir seu usuário e senha criado dentro do Cluster. Poderá também substituir o nome do banco de dados que, por padrão, vem como "test".

Caso ocorra algum erro, é recomendado verificar se sua conexão está por trás de algum proxy. Acesse o site:
```
portquiz.net:27017
```
Obs.: 27017 é a porta padrão do MongoDB

Caso consiga acessar o site e houver a mensagem "You have reached this page on port 27017", signifca que está tudo certo com seu proxy.

Caso contrário, o recomendado é instalar o MongoDB na sua própria maquina ou trocar de rede.

Outra função importantíssima do Mongoose é seu método "Schema", utilizado para criar um objeto dentro do banco de dados e pode ser criado da seguinte forma:
```
const NomeSchema = new mongoose.Schema({
    atributos
});

module.exports = mongoose.model('Nome', NomeSchema);
```
### 7- Importando o Axios
> Axios é um cliente HTTP, que funciona tanto no browser quanto em node.js. A biblioteca é basicamente uma API que sabe interagir tanto com XMLHttpRequest quanto com a interface http do node. Isso significa que o mesmo código utilizado para fazer requisições ajax no browser também funciona no servidor. Além disso, as requisições feitas através da biblioteca retornam uma promise, compatível com as novas versões do JavaScript - ES6.

Dentro do terminal integrado do VS Code (Ctrl + "), execute:
```
yarn add axios
```
Podemos utilizá-lo para chamar a api do, por exemplo, Github e assim ter acesso às informações do mesmo. Exemplo:
```
const axios = require('axios');

const apiResponse = axios.get(`https://api.github.com/users/${github_username}`);
```
Onde "github_username" é uma variável com o valor informado pelo usuário. Assim, nós podemos:
```
console.log(apiResponse.data);

const { name = login, avatar_url, bio } = apiResponse.data;
```

Para colher os dados informados pela resposta da API do Github!

### 8- Instalando o MongoDB Compass Community
>Como GUI (Graphical User Interface) do MongoDB, o MongoDB Compass Community permite que você tome decisões mais inteligentes sobre a estrutura do documento, consultas, indexação, validação de documentos e muito mais!

Para instalá-lo, basta baixar o executável no [site oficial](https://www.mongodb.com/download-center/compass) e proceder normalmente. 

Após executá-lo, retorne ao Cluster do MongoDB, vá em Connect e escolha "Connect with MongoDB Compass". Copie a String de conexão informada pelo site e retorne ao Compass, autentique-se informando usuário e senha da conta no cluster. Caso desejar, é possível nomear o acesso mudando o nome em "Authentication Database" (recomendado nomear "admin").

Por fim, clique em Conect, vá no nome do banco de dados e terá acesso às suas collections (tabelas), podendo alterar os dados salvos como bem desejar.

### 9- Importando o Cors
> O Node.js tem um comportamento padrão de evitar acesso externos à API, permitindo apenas acesso no mesmo endereço. Para remover este bloqueio e acessarmos o backend pelo frontend, utilizamos a extensão Cors (Cross Origin Resource Sharing)!

Dentro do terminal integrado do VS Code (Ctrl + "), execute:
```
yarn add cors
```
E em seguida você poderá:
```
const cors = require('cors');
```
E liberar o acesso para um endereço específico da seguinte forma:
```
app.use(cors({
    origin: 'http://localhost:3000'
}));
```
Ou liberar para todo tipo de aplicação:
```
app.use(cors());
```

### 10- Importando o Socket.io
>O Socket.IO pretende tornar possíveis os aplicativos em tempo real em todos os navegadores e dispositivos móveis, minimizando as diferenças entre os mecanismos de transporte diferentes. A biblioteca Socket.IO convencional é escrita em JavaScript tanto para front end, quanto para back-end, por isso foi projetada para rodar em um servidor Node.js. 

> O Socket.IO oferece uma API de JavaScript simples, baseada em eventos que permite o servidor comunicar com o cliente sem esforço e em tempo real, sem necessitar de uma request do frontend. Seu mecanismo padrão é o WebSockets, mas se não for implementado no navegador do usuário, ele recorrerá à fallbacks, como Flash e AJAX. Isso o torna disponível para um grande número de navegadores.

Dentro do terminal integrado do VS Code (Ctrl + "), execute:
```
yarn add socket.io
```

Agora basta importar no código:
```
const http = require('http');

const server = http.Server(app);
```
E podemos substituir o que antes era "app.listen(3333);" para:
```
server.listen(3333);
```
Agora basta fazer com que nosso server escute também o protocólo WebSocket:
```
    const socketio = require('socket.io');
    
    exports.setupWebsocket = (server) => {
        const io = socketio(server);
        
        io.on('connection', socket => {
            console.log(socket.id); //será executado apenas após a conexão de um novo cliente
        });
    }
```











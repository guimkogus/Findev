# Criando o Frontend Web com ReactJS
Obs.: Este guia não tem como objetivo ensinar todos os pormenores das tecnologias utilizadas. A intenção é apenas deixar um caminho introdutório para o reaproveitamento do aprendizado adquirido na Semana OmniStack 10.0 da Rocketseat.

### 1- Iniciando o projeto
Dentro do diretório do projeto no terminal do sistema operacional, execute:
```
yarn create react-app NomeDaPasta
```
Aguarde até aparecer a mensagem "Happy Hacking! Done in x seconds". Dentro do diretório "NomeDaPasta" criado no projeto, você poderá abrir o projeto com o comando:
```
code .
```
Para abrir o projeto no Visual Studio Code.

### 2- Preparando o ambiente
O projeto se inicia automaticamente com alguns arquivos de exemplo.
Para visualizar a página web, execute dentro do terminal integrado do VS Code (Ctrl + "):
```
yarn start
```
Siga os passos para deixar o projeto em branco:
1. Em src/index.html, exclua os comentários
2. Na pasta src, exclua: App.css, App.test.js, index.css, logo.svg, serviceWorker.js e setupTests.js
3. Em src/index.js, exclua a linha de importação " import './index.css' "
4. Em src/index.js, exclua a linha "serviceWorker.unregistered();" e seus comentários
5. Em src/App.js, exclua as linhas de importação "import './App.css';" e "import logo from './logo.svg';"
6. Em src/App.js, exclua todo o HTML dentro do return da função "App()"

Obs.: Estude os três conceitos principais do ReactJS: Componente, Estado e Propriedade.

### 3- Crie a parte visual do seu projeto!
> Após entender os três conceitos principais do ReactJS, agora é botar a mão na massa e criar toda parte visual da sua Web, utilizando JSX e CSS!

### 4- Importando o Axios
> Axios é um cliente HTTP, que funciona tanto no browser quanto em node.js. A biblioteca é basicamente uma API que sabe interagir tanto com XMLHttpRequest quanto com a interface http do node. Isso significa que o mesmo código utilizado para fazer requisições ajax no browser também funciona no servidor. Além disso, as requisições feitas através da biblioteca retornam uma promise, compatível com as novas versões do JavaScript - ES6.

Dentro do terminal integrado do VS Code (Ctrl + "), execute:
```
yarn add axios
```
Podemos utilizá-lo para chamar a API do seu Backend criado juntamente ao Cors assim ter acesso às informações do mesmo. Crie um arquivo api.js e importe o axios, exemplo:
```
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333'
});
```
Onde 3333 é a porta da sua API no Backend, agora basta exportar:
```
export default api;
```
Agora é só importar nossa api dentro do arquivo do Frontend que será necessário fazer a chamada do Backend:
```
import api from './api'

const response = await api.post('/users', {
    atributos
});

console.log(response.data);

setUsers([...users, response.data]);
```


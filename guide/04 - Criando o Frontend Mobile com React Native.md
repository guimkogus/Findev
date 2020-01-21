# Criando o Frontend Mobile com React Native
Obs.: Este guia não tem como objetivo ensinar todos os pormenores das tecnologias utilizadas. A intenção é apenas deixar um caminho introdutório para o reaproveitamento do aprendizado adquirido na Semana OmniStack 10.0 da Rocketseat.

### 1- Importanto o Expo
>O Expo é uma ferramenta utilizada no desenvolvimento mobile com React Native que permite o fácil acesso às API’s nativas do dispositivo sem precisar instalar qualquer dependência ou alterar código nativo.

Dentro do diretório do projeto no terminal do sistema operacional, execute:
```
yarn global add expo-cli
```
Após a importação inicial do Expo, caso esteja utilizando os sistemas operacionais Linux ou MacOS, é necessário habilitar o recurso para que o sistema encontre os comandos globais do expo via terminal. Dentro da pasta do seu usário, será necessário abrir o arquivo bash_profile (pode ser também "profile" ou "bashrc"):
```
code .bash_profile
```
Adicionar a linha:
```
export PATH="$(yarn global bin): $PATH"
```

### 2- Iniciando o projeto
Dentro do diretório do projeto no terminal do sistema operacional, execute:
```
expo init mobile
```
Obs: A palavra "mobile" presente no comando é apenas como será chamada a pasta do seu projeto.

Em seguida, é possível selecionar qual template pré-programado deseja utilizar. Recomenda-se o uso da opção "blank".

Após o download e instalação dos recursos, é necessário entrar na pasta "mobile" pelo terminal e executar o comando:
```
yarn start
```

Basta aguardar e o projeto estará inicialmente pronto para ser executado. Abrirá uma janela no navegador e dentro do mesmo é possível acessar o endereço de acesso (IP + Porta), escanear um QR Code ou pedir para que encontre um emulador de IOS ou Android.

##### Obs.: 
É obrigatório o uso do aplicativo "Expo" no smartphone para visualizar e testar sua aplicação.

##### Obs. 2: 
Existe um repositório no Github para [solucionar problemas comuns do Expo](https://github.com/Rocketseat/expo-common-issues).

##### Obs. 3: 
Assim com no backend, é necessário deixar um terminal executando o Expo (yarn start) enquanto deseja fazer alterações e visualizar as modificações. Em caso de erros esquisitos, é recomendado reiniciar esta execução.

##### Obs. 4: 
É necessário importar uma biblioteca do Expo para cada tipo de recurso nativo do sistema do smartphone que sua aplicação precisará. Todas estas bibliotecas podem ser encontradas na [documentação oficial do Expo](https://docs.expo.io/). Ex.: [React Navigation](https://reactnavigation.org/docs/en/getting-started.html) para a troca de páginas dentro do App.

### 3- Importanto o React Navigation
> O React Navigation nasceu da necessidade da comunidade React Native de ter uma solução de navegação extensível e fácil de usar, escrita inteiramente em JavaScript (para que você possa ler e entender toda a fonte).

Dentro do terminal integrado do VS Code (Ctrl + "), execute:
```
yarn add react-navigation @react-native-community/masked-view
```
```
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context
```
Caso seu projeto utilize navegação por pilhas (quando o usuário clicka em botões e muda de página):
```
yarn add react-navigation-stack
```
Exemplo de importações no código:
```
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'; 

const Routes = createAppContainer(
    createStackNavigator({
        rotas da sua navegação (páginas)
    })
);

export default Routes;
```

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
    baseURL: '192.168.1.5:3333'
});

export default api;
```
Onde 192.168.1.5 é o IP da sua máquina e 3333 é a porta da sua API no Backend.

Agora é só importar nossa api dentro do arquivo do Frontend que será necessário fazer a chamada do Backend:
```
import api from './api'

async function loadDevs() {
        const response = await api.get('/search', {
            params: {
                atributos que vai buscar da api
            }
        });
}

console.log(response.data.users);

setUsers([...users, response.data]);
```

### 5- Importando o cliente do Socket.io
>O Socket.IO pretende tornar possíveis os aplicativos em tempo real em todos os navegadores e dispositivos móveis, minimizando as diferenças entre os mecanismos de transporte diferentes. A biblioteca Socket.IO convencional é escrita em JavaScript tanto para front end, quanto para back-end, por isso foi projetada para rodar em um servidor Node.js. 

> O Socket.IO oferece uma API de JavaScript simples, baseada em eventos que permite o servidor comunicar com o cliente sem esforço e em tempo real, sem necessitar de uma request do frontend. Seu mecanismo padrão é o WebSockets, mas se não for implementado no navegador do usuário, ele recorrerá à fallbacks, como Flash e AJAX. Isso o torna disponível para um grande número de navegadores.

Dentro do terminal integrado do VS Code (Ctrl + "), execute:
```
yarn add socket.io-client
```
Agora basta importar no código:
```
    import socketio from 'socket.io-client';
    
    const socket = socketio('http://192.168.1.5:3333', {
        autoConnect: false,
    });
```
Onde 192.168.1.5 é o IP da sua máquina e 3333 é a porta da sua API no Backend.

Agora é necessário criar duas funções principais:
```
function connect(){
    socket.connect();
}
```
```
function disconnect(){
    if(socket.connected){
        socket.disconnect();
    }
}
```
```
export {
    connect,
    disconnect,
};
```
Agora basta importar o socket na página em que precisará de uma conexão em tempo real com o seu servidor:
```
    import socket from './socket';
    
    function setupWebsocket(){
        connect();
    }
```











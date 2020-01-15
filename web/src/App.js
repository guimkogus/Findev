import React, { useEffect, useState } from 'react';
import api from './services/api';

import './Global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm'

/*
 * Os três conceitos principais do REACT:
 * COMPONENTE:
 *    Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
 *    É uma função (JSX) que retorna um conteúdo HTML, CSS ou JS p/ interface que será reutilizado diversas vezes
 *    Regra do react: apenas um componente por arquivo
 * PROPRIEDADE:
 *    Informações que um componente PAI passa para o componente FILHO
 *    São os atributos de um COMPONENTE, exemplo Header "title = ..."    
 * ESTADO:
 *    Informações mantidas pelo COMPONENTE (Lembrar: imutabilidade, Usar: useState)
 */

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);
  
  async function handleAddDev(data){
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }
  
   return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>        
      </aside>
     <main>
      <ul>
        {devs.map(dev => (
          <DevItem  key={dev._id} dev={dev}/>
        ) )}        
      </ul>
     </main>
   </div>
  );
}

export default App;

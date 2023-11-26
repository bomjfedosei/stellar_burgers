import './App.css';
import { useState, useEffect } from 'react';
import AppHeader from './components/app-header/app-header';

import BurgerIngredients from './components/burger-ingredients/burger-ingredients'
import BurgerConstructor from './components/burger-constructor/burger-constructor'


const API = `https://norma.nomoreparties.space/api`;


const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function getIngredients() {
  return fetch(`${API}/ingredients`)
      .then(checkReponse)
}

const App = () => {
  const [state, setState] = useState({
    succes: false,
    data: []
  });

  useEffect(() => {
    getIngredients()
      .then((json) => setState({ data: json.data, succes: true }))
      .catch((err) => alert(err))
  }, []);

  return (
    <div className="App" >
      <AppHeader />
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '0 100px', }}>
        <BurgerIngredients title={'Соберите бургер'} ingridients={state.data} />
        <BurgerConstructor ingridients={state.data} />
      </div >
    </div >
  );
}

export default App;

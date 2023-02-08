import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {MainPanel} from "./pages/main-panel/MainPanel";
import {Header} from "./components/header/Header";

function App() {

  return (
    <div className="App">
        <Header/>
      <MainPanel/>
    </div>
  );
}

export default App;

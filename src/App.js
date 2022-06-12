import logo from './logo.svg';
import './App.css';
import Marketplace from './components/Marketplace';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import SellPrompt from './components/SellPrompt';
import Header from './components/Header';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const activeChainId = ChainId.Mumbai;

function App() {
  return (
    <Router>
      <ThirdwebProvider desiredChainId={activeChainId}>
        <div className="App">
          <header className="App-header">
            <Header></Header>
          </header>

            <Routes>
              <Route path="/sell" element={<SellPrompt/>}/>
              <Route path="/buy" element={<Marketplace/>}/>
              <Route path="/" element={<Marketplace/>}/>
            </Routes>
          
        </div>
      </ThirdwebProvider>

    </Router>


  );
}

export default App;

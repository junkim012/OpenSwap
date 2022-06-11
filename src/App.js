import logo from './logo.svg';
import './App.css';
import Marketplace from './components/Marketplace';
import SellPrompt from './components/SellPrompt';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
		<Header></Header>
		<Marketplace></Marketplace>
      <header className="App-header">
        
        <SellPrompt></SellPrompt>


      </header>
    </div>
  );
}

export default App;

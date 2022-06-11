import logo from './logo.svg';
import './App.css';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import SellPrompt from './components/SellPrompt';

const activeChainId = ChainId.Mumbai;

function App() {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <div className="App">
        <header className="App-header">

          <SellPrompt></SellPrompt>


        </header>
      </div>
    </ThirdwebProvider>

  );
}

export default App;

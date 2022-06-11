import logo from './logo.svg';
import './App.css';
import Marketplace from './components/Marketplace';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import SellPrompt from './components/SellPrompt';
import Header from './components/Header';

const activeChainId = ChainId.Mumbai;

function App() {
  return (
	<ThirdwebProvider desiredChainId={activeChainId}>
		<div className="App">
			<Header></Header>
			<Marketplace></Marketplace>
		<header className="App-header">
			
			<SellPrompt></SellPrompt>


			</header>
		</div>
    </ThirdwebProvider>

  );
}

export default App;

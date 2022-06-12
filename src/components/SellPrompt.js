import { useState } from 'react';
import { ListingType, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useAddress, useCreateDirectListing, useMetamask, useNetwork, useNetworkMismatch, useMarketplace } from "@thirdweb-dev/react";

const SellPrompt = () => {

    // later move this to prop
    const [tokenAddress, setTokenAddress] = useState("0xe249989ebBf2fa317D623Ce7f216A6A0c5e96d95");
    const [tokenId, setTokenId] = useState('0');
    const [paymentCurrency, setPaymentCurrency] = useState('0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747'); //USDC 

    const address = useAddress();
    const marketplace = useMarketplace("0xb9661439AB5e2839Df8b0c0a3f377895cA582a7B");
    const networkMismatch = useNetworkMismatch(); 
    const connectWallet = useMetamask();
    const [, switchNetwork] = useNetwork(); 

    // function to create a listing on thirdweb

    const createDirectListing = async (tokenId, quantity, price) => {
        try {
            const transaction = await marketplace?.direct.createListing({
                assetContractAddress: tokenAddress, // Contract Address of the NFT
                buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
                currencyContractAddress: paymentCurrency, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Rinkeby ETH.
                listingDurationInSeconds: 86400, // When the auction will be closed and no longer accept bids (1 Week)
                quantity: quantity, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
                startTimestamp: new Date(0), // When the listing will start
                tokenId: tokenId, // Token ID of the NFT.
            })
            return transaction; 
        } catch (error) {
            console.error('create direct listing error: ', error); 
        }
    }


    const handleCreateListing = async (e) => {
        console.log('handleCreateListing'); 
        try {
            if (!address) {
                console.log('prompt connect wallet'); 
                connectWallet();
            }
    
            if (networkMismatch) {
                console.log('prompt switch network'); 
                switchNetwork && switchNetwork(80001);
                return;
            }
    
            e.preventDefault();
            console.log('e: ', e); 
            console.log('e.target: ', e.target); 
            console.log('e.target.value: ', e.target[0].value); 

            const quantity = e.target[0].value; 
            const price = e.target[1].value; 

            console.log(`quantity ${quantity} price ${price}`)
            const transactionResult = await createDirectListing(
                tokenId, 
                quantity, 
                price
            ); 
    
            if (transactionResult) {
                console.log('transactionResult: ', transactionResult); 
            }
        } catch (e) {
            console.log('handle create listing: ', e);
        }
        


    }
    return (
        <div>
            <h1 className="font-semibold text-white">Sell Prompt</h1>
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    onSubmit={(e) => handleCreateListing(e)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="quantity">
                            Quantity
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="quantity" type="number" placeholder="quantity" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="price">
                            Price
                        </label>
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" placeholder="0.00" />
                        <p className="text-red-500 text-xs italic">Please choose a price.</p>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            // value="Submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SellPrompt;
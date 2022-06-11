import { useState } from 'react';
import { ThirdwebSDK } from "@thirdweb-dev/sdk"; 

const SellPrompt = () => {

    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    // later move this to prop
    const [ address, setAddress ] = useState("0xe249989ebBf2fa317D623Ce7f216A6A0c5e96d95");
    const [ tokenId, setTokenId ] = useState('0'); 
    const [ paymentCurrency, setPaymentCurrency ] = useState('0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747'); //USDC 

    const sdk = new ThirdwebSDK("mumbai"); 
    const contract = sdk.getMarketplace("{{")

    // function to create a listing on thirdweb
    const listing = {
        assetContractAddress: address,
        tokenId: tokenId,
        startTimestamp: new Date(), // asap
        listingDurationInSeconds: 86400, // 24 hours 
        quantity: quantity, 
        currencyContractAddress: paymentCurrency,
        buyoutPricePerToken: price.toString()
    }

    return (
        <div>
            <h1 className="font-semibold text-white">Sell Prompt</h1>
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SellPrompt;
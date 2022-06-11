import React, { useEffect, useState } from 'react';

function Marketplace() {
    const [assets, setAssets] = useState([])

    const marketplace = useMarketplace(
        "0xe249989ebBf2fa317D623Ce7f216A6A0c5e96d95" // Your marketplace contract address here
      );
    
    const { data: listings, isLoading: loadingListings } =
    useActiveListings(marketplace);
    console.log(listings)

    useEffect(() => {
        setAssets([
            { "image": "https://cdn.statically.io/img/cuddlyoctopus.com/wp-content/uploads/2019/09/KI-021B-Nanachi-750x828.jpg?quality=100&f=auto", "name": "Nanachi", "description": 1233, "floor_price": "0.01 weth", "id": 1 },
            { "image": "https://cdn.statically.io/img/cuddlyoctopus.com/wp-content/uploads/2019/09/KI-021B-Nanachi-750x828.jpg?quality=100&f=auto", "name": "Nanachi 2", "description": 1233, "floor_price": "0.01 weth", "id": 2 },
            { "image": "https://cdn.statically.io/img/cuddlyoctopus.com/wp-content/uploads/2019/09/KI-021B-Nanachi-750x828.jpg?quality=100&f=auto", "name": "Nanachi 3", "description": 1233, "floor_price": "0.01 weth", "id": 3 },
            { "image": "https://cdn.statically.io/img/cuddlyoctopus.com/wp-content/uploads/2019/09/KI-021B-Nanachi-750x828.jpg?quality=100&f=auto", "name": "Nanachi 4", "description": 1233, "floor_price": "0.01 weth", "id": 4 },
            { "image": "https://cdn.statically.io/img/cuddlyoctopus.com/wp-content/uploads/2019/09/KI-021B-Nanachi-750x828.jpg?quality=100&f=auto", "name": "Nanachi 5", "description": 1233, "floor_price": "0.01 weth", "id": 5 }
        ])
    }, [])

    return (
        <div class="grid grid-cols-4 gap-4 mx-4">
            {
                assets.map((asset) => {
                    return (
                        <div key={asset.id} className="max-w-sm rounded overflow-hidden shadow-lg">
                            <img className="w-full" src={asset.image} alt="Sunset in the mountains"></img>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{asset.name}</div>
                                <p className="text-gray-700 text-base">
                                    {asset.description}
                                </p>
                            </div>
                            <div className="px-6 pt-2 pb-3 gap-4 mx-4">
                                <button class=" mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                    Buy
                                </button>
                                <button class="  mx-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                    Sell
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}


export default Marketplace;
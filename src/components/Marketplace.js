import React, { useEffect, useState } from 'react';
import {
    useEditionDrop,
    useNFTs,
    useMarketplace,
    useActiveListings
  } from "@thirdweb-dev/react";

function Marketplace() {
    const nftCollection = useEditionDrop("0xe249989ebBf2fa317D623Ce7f216A6A0c5e96d95");
    const { data: nfts, isLoading } = useNFTs(nftCollection);
    const marketplace = useMarketplace("0xb9661439AB5e2839Df8b0c0a3f377895cA582a7B")
    const { data: listings, isLoading: loadingListings } = useActiveListings(marketplace);

    console.log(listings)

    if (isLoading) {
        return <p>Loading</p>
    }

    async function buyNft(id, amount) {
        try {
          await marketplace?.buyoutListing(id, amount);
          alert("NFT bought successfully!");
        } catch (error) {
          console.error(error);
          alert(error);
        }
      }

    
    function formBuyingList(id, amount) {
        console.log(id, amount)
        let filtered_listings = listings.filter((listing) => {
            return parseInt(listing.asset.id._hex, 16) == id
        }).sort((a,b) => {
            return parseInt(b.buyoutPrice._hex, 16) - parseInt(a.buyoutPrice._hex, 16);
        })

        console.log(filtered_listings)

        let amount_counted = 0
        let result_listings = [] 

        for (let listing of filtered_listings) {
            if (amount_counted >= amount) {
                break
            }

            if (parseInt(listing.quantity._hex, 16) > amount - amount_counted) {
                result_listings.push({
                    "id": listing.id,
                    "amount": amount - amount_counted
                })

                amount_counted += amount - amount_counted
            } else {
                result_listings.push({
                    "id": listing.id,
                    "amount": parseInt(listing.quantity._hex, 16)
                })

                amount_counted += parseInt(listing.quantity._hex, 16)
            }

        }


        return result_listings
    }

    async function buyTokens(id, amount=1) {
        let listings = await formBuyingList(id, amount)
        for (let listing of listings) {
            console.log(listing)
            await buyNft(listing.id, listing.amount)
        }
    }

    return (
        <div class="grid grid-cols-4 gap-4 mx-4">
            {
                nfts.map((nft) => {
                    console.log(nft)
                    return (
                        <div key={nft.metadata.id._hex} className="max-w-sm rounded overflow-hidden shadow-lg">
                            <img className="w-full" src={nft.metadata.image} alt="Sunset in the mountains"></img>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{nft.metadata.name}</div>
                                {Object.keys(nft.metadata.properties).map((property) => {
                                    return (
                                        <p className="text-gray-700 text-base">
                                            {property}: {nft.metadata.properties[property]}
                                        </p>
                                    )
                                })}
                                
                            </div>
                            <div className="px-6 pt-2 pb-3 gap-4 mx-4">
                                <button class=" mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={() => buyTokens(parseInt(nft.metadata.id._hex, 16))}>
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
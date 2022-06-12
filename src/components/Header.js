import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react";
// import Link from "next/link";
import React from "react";

export default function Header() {
  // Helpful thirdweb hooks to connect and manage the wallet from metamask.
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  return (
    <div >
      <div >
        <div>
          {/* <Link href="/" passHref role="button">
            <img
              src={`/logo.png`}
              alt="Thirdweb Logo"
              width={135}
              style={{ cursor: "pointer" }}
            />
          </Link> */}
        </div>
      </div>
      <div >
        {address ? (
          <>
            <a
              
              onClick={() => disconnectWallet()}
            >
              Disconnect Wallet
            </a>
            <p style={{ marginLeft: 8, marginRight: 8, color: "grey" }}>|</p>
            <p>{address.slice(0, 6).concat("...").concat(address.slice(-4))}</p>
          </>
        ) : (
          <a
            
            onClick={() => connectWithMetamask()}
          >
            Connect Wallet
          </a>
        )}
      </div>
    </div>
  );
}
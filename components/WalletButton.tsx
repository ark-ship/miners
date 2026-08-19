"use client";

import {
 ConnectButton
} from "@rainbow-me/rainbowkit";


export default function WalletButton(){

return(

<div className="wallet">

<ConnectButton
 label="Connect Wallet"
 accountStatus="address"
/>

</div>

)

}
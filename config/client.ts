import { createPublicClient, http } from "viem";


export const publicClient =
createPublicClient({

chain:{
id:46630,
name:"Robinhood Testnet",
nativeCurrency:{
name:"ETH",
symbol:"ETH",
decimals:18
},
rpcUrls:{
default:{
http:[
"https://rpc.testnet.chain.robinhood.com"
]
}
}
},

transport:http()

});
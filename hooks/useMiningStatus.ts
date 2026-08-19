"use client";


import {useReadContract} from "wagmi";

import MiningJSON from "@/abi/HoodMinersMining.json";


const ADDRESS =
"0x24F6c0D981c8c927C95F6D2a90F75F1F3f7d8031";



export function useMiningStatus(
tokenId:number
){


return useReadContract({


address:ADDRESS,


abi:MiningJSON,


functionName:"getMiningStatus",


args:[
BigInt(tokenId)
],


query:{


refetchInterval:3000


}


});


}
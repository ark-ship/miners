"use client";

import { useReadContract } from "wagmi";

import HoodMinersJSON from "@/abi/HoodMiners.json";


const ABI = HoodMinersJSON;


const ADDRESS =
"0x98eb0511d3e16fE0331b3B13476c1b170A6D9941";



export function useMinerOwner(
    tokenId:number
){


return useReadContract({

address: ADDRESS,

abi: ABI,

functionName:"ownerOf",

args:[
BigInt(tokenId)
],


query:{

enabled:
tokenId > 0

}

});


}
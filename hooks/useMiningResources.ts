"use client";


import {useReadContract} from "wagmi";

import MiningJSON from "@/abi/HoodMinersMining.json";


const ADDRESS =
"0x24F6c0D981c8c927C95F6D2a90F75F1F3f7d8031";



export function useMiningResources(
tokenId:number
){


const {
data,
isLoading
}=useReadContract({


address:ADDRESS,


abi:MiningJSON,


functionName:"getResources",


args:[
BigInt(tokenId)
]


});



return {

resources:data,
isLoading

};


}
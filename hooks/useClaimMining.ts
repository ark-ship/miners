"use client";


import {useWriteContract} from "wagmi";

import MiningJSON from "@/abi/HoodMinersMining.json";


const ADDRESS =
"0x24F6c0D981c8c927C95F6D2a90F75F1F3f7d8031";



export function useClaimMining(){


const {
writeContract,
isPending
}=useWriteContract();



function claimMining(
tokenId:number
){


console.log(
"CLAIM MINING",
tokenId
);



writeContract({

address:ADDRESS,

abi:MiningJSON,

functionName:"claimMining",

args:[
BigInt(tokenId)
]

});


}



return {

claimMining,

isPending

};


}
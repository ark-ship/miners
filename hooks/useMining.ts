"use client";

import {
  useWriteContract,
  useWaitForTransactionReceipt
} from "wagmi";

import MiningJSON from "@/abi/HoodMinersMining.json";


const MINING_ADDRESS =
"0x24F6c0D981c8c927C95F6D2a90F75F1F3f7d8031";


const ABI = MiningJSON;


export function useMining(){


const {
writeContract,
data:hash,
isPending
}=useWriteContract();



const {
isLoading:isConfirming,
isSuccess
}=useWaitForTransactionReceipt({
hash
});



function startMining(
tokenId:number,
duration:number
){


console.log(
"START MINING",
{
tokenId,
duration
}
);



writeContract({

address:MINING_ADDRESS,

abi:ABI,

functionName:"startMining",

args:[
BigInt(tokenId),
BigInt(duration)
]

});


}



return {

startMining,

hash,

isPending,

isConfirming,

isSuccess

};


}
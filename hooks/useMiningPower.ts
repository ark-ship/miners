"use client";

import { useReadContract } from "wagmi";

import HoodMinersJSON from "@/abi/HoodMiners.json";


const ABI = HoodMinersJSON;


const ADDRESS =
"0x98eb0511d3e16fE0331b3B13476c1b170A6D9941";


export function useMiningPower(tokenId:number){


const {
data:miningPower,
error,
isLoading

}=useReadContract({

address: ADDRESS,

abi: ABI,

functionName:"miningPower",

args:[
BigInt(tokenId)
]

});



console.log(
"MINING POWER DEBUG",
{
tokenId,
miningPower,
error,
isLoading
}
);



return {

miningPower,
error,
isLoading

};


}
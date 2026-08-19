"use client";


import { useAccount } from "wagmi";
import { useReadContract } from "wagmi";


import HoodMinersJSON from "@/abi/HoodMiners.json";


const ABI =
HoodMinersJSON;



const ADDRESS =
"0x81533b3c52f38d87D5b3CdeB663EDe6Badc753B7";



export function useMinerBalance(){


const {
address
}=useAccount();



return useReadContract({


address:ADDRESS,


abi:ABI,


functionName:"balanceOf",


args:[
address!
],



query:{

enabled:
!!address

}


});


}
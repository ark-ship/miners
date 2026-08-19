"use client";

import { useReadContract } from "wagmi";

import HoodMinersABI from "@/abi/HoodMiners.json";


const ABI = HoodMinersABI;


const ADDRESS =
"0x98eb0511d3e16fE0331b3B13476c1b170A6D9941";



export function useMinerImage(tokenId:number){


const {

data,
error,
isLoading

}=useReadContract({

address: ADDRESS,

abi: ABI,

functionName:"tokenURI",

args:[
BigInt(tokenId)
],

});



console.log(
"TOKEN URI",
tokenId,
data
);



if(error){

console.error(
"URI ERROR",
error
);

}



if(!data || isLoading)

return null;



try{


const uri = data as string;


let json:any;



if(
uri.startsWith(
"data:application/json;base64,"
)
){


const base64 =
uri.split(",")[1];


json =
JSON.parse(

atob(base64)

);


}



else if(

uri.startsWith(
"data:application/json,"
)

){


json =
JSON.parse(

decodeURIComponent(
uri.split(",")[1]
)

);


}



else{


console.log(
"UNKNOWN URI",
uri
);


return null;


}



console.log(
"METADATA",
json
);



return json.image;



}

catch(err){


console.error(
"DECODE ERROR",
err
);


return null;


}



}
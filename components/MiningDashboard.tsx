"use client";


import {useEffect,useState} from "react";


import {useOwnedMiners} from "@/hooks/useOwnedMiners";

import {publicClient} from "@/config/client";

import MiningJSON from "@/abi/HoodMinersMining.json";



const MINING_ADDRESS =
"0x24F6c0D981c8c927C95F6D2a90F75F1F3f7d8031";




export default function MiningDashboard(){



const {
miners=[],
loading

}=useOwnedMiners();



const [active,setActive]=useState(0);



const [claimable,setClaimable]=useState(0);



const [gold,setGold]=useState(0);





useEffect(()=>{


if(!miners || miners.length===0){

setActive(0);

return;

}



async function load(){


let activeCount=0;


let claimCount=0;



for(
const id of miners
){


try{


const status:any =
await publicClient.readContract({


address:MINING_ADDRESS,


abi:MiningJSON,


functionName:"getMiningStatus",


args:[
BigInt(id)
]


});



console.log(
"MINING STATUS",
id,
status
);





if(status[0]){

activeCount++;

}




const canClaim:any =
await publicClient.readContract({


address:MINING_ADDRESS,


abi:MiningJSON,


functionName:"canClaim",


args:[
BigInt(id)
]


});



if(canClaim){

claimCount++;

}



}catch(e){


console.error(
"MINING DASHBOARD ERROR",
id,
e
);


}



}




setActive(activeCount);

setClaimable(claimCount);



}



load();



},[miners]);







return (


<div

className="
grid
grid-cols-2
md:grid-cols-4
gap-4
mb-8
"

>



<div className="
bg-[#111]
border border-[#333]
rounded-xl
p-5
">

<p className="text-gray-400">
TOTAL MINERS
</p>

<h2 className="
text-3xl
font-bold
text-[#ccff00]
">

{
loading
?
"..."
:
miners.length
}

</h2>

</div>





<div className="
bg-[#111]
border border-[#333]
rounded-xl
p-5
">


<p className="text-gray-400">
ACTIVE
</p>


<h2 className="
text-3xl
font-bold
text-[#ccff00]
">

{active}

</h2>


</div>






<div className="
bg-[#111]
border border-[#333]
rounded-xl
p-5
">


<p className="text-gray-400">
READY CLAIM
</p>


<h2 className="
text-3xl
font-bold
text-[#ccff00]
">

{claimable}

</h2>


</div>







<div className="
bg-[#111]
border border-[#333]
rounded-xl
p-5
">


<p className="text-gray-400">
TOTAL GOLD
</p>


<h2 className="
text-3xl
font-bold
text-[#ccff00]
">

{gold}

</h2>


</div>





</div>


)


}
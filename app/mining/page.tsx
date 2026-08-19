"use client";


import MinerCard from "@/components/MinerCard";
import {useOwnedMiners} from "@/hooks/useOwnedMiners";
import MiningDashboard from "@/components/MiningDashboard";


export default function Mining(){


const {
miners,
loading
}=useOwnedMiners();



return(

<div className="
min-h-screen
bg-black
text-white
p-8
">


<h1 className="
text-4xl
font-black
text-[#ccff00]
mb-8
">

MINING

</h1>

<MiningDashboard />


{
loading &&

<p>
Loading miners...
</p>

}



{
!loading &&
miners.length === 0 &&

<p className="
text-gray-400
">

No Hood Miners found.

</p>

}



<div className="
grid
grid-cols-1
md:grid-cols-3
gap-6
">


{
miners.map(id=>(

<MinerCard

key={id}

id={id}

/>

))
}


</div>


</div>

)

}
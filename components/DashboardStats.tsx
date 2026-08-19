"use client";


import {useDashboardStats} from "@/hooks/useDashboardStats";



export default function DashboardStats({

miners

}:{

miners:number[]

}){


const {

stats,
loading

}=useDashboardStats(miners);





if(loading)

return (

<p className="text-white">

Loading dashboard...

</p>

);





const data=[


["⚡ Mining Power",stats.power],

["🔥 Active Mining",stats.active],

["🪨 Stone",stats.stone],

["⛏ Ore",stats.ore],

["🔶 Copper",stats.copper],

["🟡 Gold",stats.gold],

["💎 Diamond",stats.diamond],

["🔮 Crystal",stats.crystal]


];




return (

<div

className="
grid
grid-cols-2
md:grid-cols-4
gap-4
"

>


{
data.map((item)=>(


<div

key={item[0]}

className="
bg-[#111]
border
border-[#333]
rounded-xl
p-5
"

>


<p className="text-gray-400">

{item[0]}

</p>


<h2

className="
text-3xl
font-bold
text-[#ccff00]
"

>

{item[1]}

</h2>


</div>


))

}



</div>


)


}
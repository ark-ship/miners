"use client";

import { useOwnedMiners } from "@/hooks/useOwnedMiners";
import DashboardStats from "@/components/DashboardStats";


export default function DashboardPage(){


const {
miners
}=useOwnedMiners();



return (

<div

className="
min-h-screen
bg-black
p-10
text-white
"

>


<h1

className="
text-4xl
font-bold
text-[#ccff00]
mb-10
"

>

DASHBOARD

</h1>



<div className="
mb-10
">

<DashboardStats

miners={miners || []}

/>

</div>





<div

className="
grid
grid-cols-1
md:grid-cols-3
gap-5
"

>



<div

className="
bg-[#111]
border
border-[#333]
rounded-2xl
p-6
"

>

<p className="text-gray-400">
Total Miners
</p>


<h2

className="
text-4xl
font-bold
text-[#ccff00]
"

>

{
miners?.length || 0
}

</h2>


</div>



<div

className="
bg-[#111]
border
border-[#333]
rounded-2xl
p-6
"

>

<p className="text-gray-400">
Mining Power
</p>


<h2

className="
text-4xl
font-bold
text-[#ccff00]
"

>

0

</h2>


</div>




<div

className="
bg-[#111]
border
border-[#333]
rounded-2xl
p-6
"

>

<p className="text-gray-400">
Active Mining
</p>


<h2

className="
text-4xl
font-bold
text-[#ccff00]
"

>

0

</h2>


</div>



</div>





<div

className="
mt-10
bg-[#111]
border
border-[#333]
rounded-2xl
p-6
"

>


<h2

className="
text-2xl
font-bold
text-[#ccff00]
mb-5
"

>

Your Miners

</h2>



<div

className="
grid
grid-cols-2
md:grid-cols-5
gap-4
"

>


{
miners?.map((id:number)=>(


<div

key={id}

className="
bg-[#222]
rounded-xl
p-5
"

>


<h3>

Hood Miner #{id}

</h3>


<p className="text-gray-400">

View mining details →

</p>


</div>


))
}



</div>


</div>



</div>

)

}
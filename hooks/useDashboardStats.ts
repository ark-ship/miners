"use client";


import { 
useReadContracts 
} from "wagmi";


import HoodMinersJSON from "@/abi/HoodMiners.json";
import MiningJSON from "@/abi/HoodMinersMining.json";


const MINER_ADDRESS =
"0x98eb0511d3e16fE0331b3B13476c1b170A6D9941";


const MINING_ADDRESS =
"0x24F6c0D981c8c927C95F6D2a90F75F1F3f7d8031";




export function useDashboardStats(
miners:number[]
){



const contracts:any[]=[];



miners.forEach((id)=>{


contracts.push(

{
address:MINER_ADDRESS,
abi:HoodMinersJSON,
functionName:"miningPower",
args:[BigInt(id)]
},


{
address:MINING_ADDRESS,
abi:MiningJSON,
functionName:"getMiningStatus",
args:[BigInt(id)]
},


{
address:MINING_ADDRESS,
abi:MiningJSON,
functionName:"getResources",
args:[BigInt(id)]
}

);


});





const {
data,
isLoading,
error

}=useReadContracts({

contracts

});





let power = 0;
let active = 0;


let stone = 0;
let ore = 0;
let copper = 0;
let gold = 0;
let diamond = 0;
let crystal = 0;





if(data){


for(
let i=0;
i<data.length;
i+=3
){



const powerData:any =
data[i];


const statusData:any =
data[i+1];


const resourceData:any =
data[i+2];





if(powerData.status==="success"){


power += Number(
powerData.result
);


}





if(statusData.status==="success"){


const status:any =
statusData.result;


if(status[0])
active++;


}





if(resourceData.status==="success"){


const r:any =
resourceData.result;



stone += Number(r[0]);

ore += Number(r[1]);

copper += Number(r[2]);

gold += Number(r[3]);

diamond += Number(r[4]);

crystal += Number(r[5]);



}



}



}





return {


stats:{

power,
active,
stone,
ore,
copper,
gold,
diamond,
crystal

},


loading:isLoading,
error


};



}
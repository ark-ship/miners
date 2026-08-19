"use client";


import {useOwnedMiners} from "./useOwnedMiners";



export function useMyMiners(){


const {
miners,
loading
}=useOwnedMiners();



return {


miners,

loading,

count:miners.length


};


}
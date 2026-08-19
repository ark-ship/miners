import "./globals.css";

import Providers from "./providers";
import Navbar from "@/components/Navbar";


export const metadata = {
title:"HoodMiners",
description:"Mine Upgrade Earn",
icons: {
    icon: "/logo.png",
    },
};


export default function RootLayout({
children,
}:{
children:React.ReactNode
}){


return(

<html lang="en">

<body className="bg-black">


<Providers>


<Navbar/>


{children}


</Providers>


</body>

</html>

)

}
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { defineChain } from "viem";


export const robinhood = defineChain({

  id: 4663,

  name: "Robinhood Chain",

  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },

  rpcUrls: {
    default: {
      http: [
        "https://rpc.mainnet.chain.robinhood.com",
      ],
    },
  },

  blockExplorers: {
    default: {
      name: "Robinhood Blockscout",
      url: "https://robinhoodchain.blockscout.com",
    },
  },

});


export const config = getDefaultConfig({

  appName: "HoodMiners",

  projectId:
    "55c73c3792f10cc614386dd8825c1bd9",

  chains: [
    robinhood,
  ],

  transports: {

    [robinhood.id]: http(
      "https://rpc.mainnet.chain.robinhood.com"
    ),

  },

});
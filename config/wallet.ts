import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  http
} from 'wagmi';

import {
  mainnet
} from 'wagmi/chains';


export const config = getDefaultConfig({

  appName: "HoodMiners",

  projectId:
  "55c73c3792f10cc614386dd8825c1bd9",

  chains:[
    mainnet
  ],

  transports:{
    [mainnet.id]:http()
  }

});
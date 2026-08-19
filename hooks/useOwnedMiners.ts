"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getLogs } from "viem/actions";
import { parseAbiItem } from "viem";

import { publicClient } from "@/config/client";


const NFT_ADDRESS =
  "0x98eb0511d3e16fE0331b3B13476c1b170A6D9941";


const DEPLOY_BLOCK =
  BigInt(40224204);


const transferEvent = parseAbiItem(
  "event Transfer(address indexed from,address indexed to,uint256 indexed tokenId)"
);


export function useOwnedMiners() {

  const { address } = useAccount();


  const [miners, setMiners] =
    useState<number[]>([]);


  const [loading, setLoading] =
    useState(false);


  useEffect(() => {

    if (!address) {

      setMiners([]);
      setLoading(false);

      return;
    }


    async function load() {

      try {

        setLoading(true);


        const logs =
          await getLogs(
            publicClient,
            {
              address: NFT_ADDRESS,

              event: transferEvent,

              args: {
                to: address,
              },

              fromBlock:
                DEPLOY_BLOCK,

              toBlock: "latest",
            }
          );


        const ids =
          logs.map(
            (log) =>
              Number(log.args.tokenId)
          );


        console.log(
          "TRANSFER LOGS",
          logs
        );


        console.log(
          "OWNED MINERS",
          ids
        );


        setMiners(ids);

      } catch (error) {

        console.error(
          "OWNED MINERS ERROR:",
          error
        );

        setMiners([]);

      } finally {

        setLoading(false);

      }

    }


    load();

  }, [address]);


  return {
    miners,
    loading,
  };

}
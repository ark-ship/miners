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


        const logs = await getLogs(
          publicClient,
          {
            address: NFT_ADDRESS,
            event: transferEvent,
            fromBlock: DEPLOY_BLOCK,
            toBlock: "latest",
          }
        );


        const ownership =
          new Map<bigint, string>();


        for (const log of logs) {

          const tokenId =
            log.args.tokenId;

          const to =
            log.args.to;

          if (
            tokenId === undefined ||
            to === undefined
          ) {
            continue;
          }


          ownership.set(
            tokenId,
            to.toLowerCase()
          );

        }


        const wallet =
          address.toLowerCase();


        const ownedIds =
          Array.from(
            ownership.entries()
          )
            .filter(
              ([, owner]) =>
                owner === wallet
            )
            .map(
              ([tokenId]) =>
                Number(tokenId)
            )
            .sort(
              (a, b) => a - b
            );


        console.log(
          "ALL TRANSFER LOGS",
          logs
        );


        console.log(
          "CONNECTED WALLET",
          address
        );


        console.log(
          "OWNED MINERS",
          ownedIds
        );


        setMiners(
          ownedIds
        );


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
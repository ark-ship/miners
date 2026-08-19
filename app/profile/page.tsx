"use client";

import { useEffect, useState } from "react";
import { useAccount, useReadContract } from "wagmi";

import HoodMinersJSON from "@/abi/HoodMiners.json";

import { useOwnedMiners } from "@/hooks/useOwnedMiners";
import { useMinerImage } from "@/hooks/useMinerImage";
import { useMiningPower } from "@/hooks/useMiningPower";
import { useMiningStatus } from "@/hooks/useMiningStatus";
import { useResources } from "@/hooks/useResources";


const NFT_ADDRESS =
  "0x98eb0511d3e16fE0331b3B13476c1b170A6D9941";


type MiningStatus = readonly [
  boolean,
  bigint,
  bigint,
  bigint
];


type MiningResources = readonly [
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint
];


function MinerProfileCard({
  id,
}: {
  id: number;
}) {

  const image = useMinerImage(id);


  const {
    miningPower,
  } = useMiningPower(id);


  const {
    data: statusData,
  } = useMiningStatus(id);


  const {
    data: resourcesData,
  } = useResources(id);


  const status =
    statusData as MiningStatus | undefined;


  const resources =
    resourcesData as MiningResources | undefined;


  const active =
    status?.[0] ?? false;


  return (
    <div
      className="
        bg-[#111]
        border
        border-[#333]
        rounded-2xl
        p-5
      "
    >

      <div
        className="
          h-64
          bg-[#222]
          rounded-xl
          overflow-hidden
          flex
          items-center
          justify-center
        "
      >

        {image ? (
          <img
            src={image}
            alt={`Hood Miner #${id}`}
            className="
              w-full
              h-full
              object-contain
            "
          />
        ) : (
          <span className="text-gray-500">
            Loading...
          </span>
        )}

      </div>


      <h3
        className="
          mt-4
          text-xl
          font-black
          text-[#ccff00]
        "
      >
        Hood Miner #{id}
      </h3>


      <div
        className="
          mt-4
          grid
          grid-cols-2
          gap-3
        "
      >

        <div
          className="
            bg-black
            rounded-xl
            p-3
          "
        >

          <p className="text-xs text-gray-500">
            Mining Power
          </p>

          <p
            className="
              text-lg
              font-black
              text-[#ccff00]
            "
          >
            {miningPower?.toString() ?? "0"}
          </p>

        </div>


        <div
          className="
            bg-black
            rounded-xl
            p-3
          "
        >

          <p className="text-xs text-gray-500">
            Status
          </p>

          <p
            className="
              text-lg
              font-black
              text-white
            "
          >
            {active ? "ACTIVE" : "READY"}
          </p>

        </div>

      </div>


      <div
        className="
          mt-4
          bg-black
          rounded-xl
          p-4
        "
      >

        <p
          className="
            text-sm
            font-bold
            text-[#ccff00]
            mb-3
          "
        >
          Resources
        </p>


        <div
          className="
            grid
            grid-cols-2
            gap-2
            text-sm
          "
        >

          <div>
            🪨 Stone:{" "}
            {resources?.[0]?.toString() ?? "0"}
          </div>

          <div>
            ⛏ Ore:{" "}
            {resources?.[1]?.toString() ?? "0"}
          </div>

          <div>
            🔶 Copper:{" "}
            {resources?.[2]?.toString() ?? "0"}
          </div>

          <div>
            🟡 Gold:{" "}
            {resources?.[3]?.toString() ?? "0"}
          </div>

          <div>
            💎 Diamond:{" "}
            {resources?.[4]?.toString() ?? "0"}
          </div>

          <div>
            🔮 Crystal:{" "}
            {resources?.[5]?.toString() ?? "0"}
          </div>

        </div>

      </div>

    </div>
  );
}


export default function ProfilePage() {

  const { address } = useAccount();


  const {
    miners = [],
    loading,
  } = useOwnedMiners();


  const [mounted, setMounted] =
    useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);


  const {
    data: collectionName,
  } = useReadContract({
    address: NFT_ADDRESS,
    abi: HoodMinersJSON,
    functionName: "name",
  });


  if (!mounted) {

    return (
      <main
        className="
          min-h-screen
          bg-black
          text-white
          p-8
        "
      >

        <div className="max-w-7xl mx-auto">

          <h1
            className="
              text-5xl
              font-black
              text-[#ccff00]
            "
          >
            PROFILE
          </h1>

          <div
            className="
              mt-8
              bg-[#111]
              border
              border-[#333]
              rounded-2xl
              p-6
              text-gray-400
            "
          >
            Loading...
          </div>

        </div>

      </main>
    );
  }


  if (!address) {

    return (
      <main
        className="
          min-h-screen
          bg-black
          text-white
          p-8
        "
      >

        <div className="max-w-7xl mx-auto">

          <h1
            className="
              text-5xl
              font-black
              text-[#ccff00]
            "
          >
            PROFILE
          </h1>

          <div
            className="
              mt-8
              bg-[#111]
              border
              border-[#333]
              rounded-2xl
              p-6
              text-gray-400
            "
          >
            Connect your wallet to view your profile.
          </div>

        </div>

      </main>
    );
  }


  return (
    <main
      className="
        min-h-screen
        bg-black
        text-white
        p-8
      "
    >

      <div className="max-w-7xl mx-auto">


        <h1
          className="
            text-5xl
            font-black
            text-[#ccff00]
          "
        >
          PROFILE
        </h1>


        <p className="
          mt-2
          text-gray-400
        ">
          {collectionName?.toString() || "Hood Miners"}
        </p>


        {/* WALLET */}

        <div
          className="
            mt-8
            bg-[#111]
            border
            border-[#333]
            rounded-2xl
            p-6
          "
        >

          <p className="
            text-sm
            text-gray-500
          ">
            Connected Wallet
          </p>

          <p
            className="
              mt-2
              break-all
              font-bold
              text-white
            "
          >
            {address}
          </p>

        </div>


        {/* STATS */}

        <div
          className="
            mt-6
            grid
            grid-cols-2
            md:grid-cols-3
            gap-4
          "
        >

          <div
            className="
              bg-[#111]
              border
              border-[#333]
              rounded-xl
              p-5
            "
          >

            <p className="
              text-gray-500
              text-sm
            ">
              Hood Miners
            </p>

            <p
              className="
                text-3xl
                font-black
                text-[#ccff00]
                mt-2
              "
            >
              {miners.length}
            </p>

          </div>


          <div
            className="
              bg-[#111]
              border
              border-[#333]
              rounded-xl
              p-5
            "
          >

            <p className="
              text-gray-500
              text-sm
            ">
              Collection
            </p>

            <p
              className="
                text-xl
                font-black
                mt-2
              "
            >
              Hood Miners
            </p>

          </div>


          <div
            className="
              bg-[#111]
              border
              border-[#333]
              rounded-xl
              p-5
            "
          >

            <p className="
              text-gray-500
              text-sm
            ">
              Wallet
            </p>

            <p
              className="
                text-xl
                font-black
                text-[#ccff00]
                mt-2
              "
            >
              Connected
            </p>

          </div>

        </div>


        {/* MINERS */}

        <div className="mt-10">

          <h2
            className="
              text-2xl
              font-black
              text-[#ccff00]
              mb-5
            "
          >
            Your Hood Miners
          </h2>


          {loading ? (

            <div
              className="
                bg-[#111]
                border
                border-[#333]
                rounded-2xl
                p-6
                text-gray-400
              "
            >
              Loading your miners...
            </div>

          ) : miners.length === 0 ? (

            <div
              className="
                bg-[#111]
                border
                border-[#333]
                rounded-2xl
                p-6
                text-gray-400
              "
            >
              You don't own any Hood Miners.
            </div>

          ) : (

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
              "
            >

              {miners.map((id) => (

                <MinerProfileCard
                  key={id}
                  id={id}
                />

              ))}

            </div>

          )}

        </div>

      </div>

    </main>
  );
}
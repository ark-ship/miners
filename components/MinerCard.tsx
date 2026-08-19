"use client";

import { useState } from "react";

import { useMinerImage } from "@/hooks/useMinerImage";
import { useMiningPower } from "@/hooks/useMiningPower";
import { useMiningStatus } from "@/hooks/useMiningStatus";
import { useMining } from "@/hooks/useMining";
import { useClaimMining } from "@/hooks/useClaimMining";
import { useResources } from "@/hooks/useResources";
import { useCanClaim } from "@/hooks/useCanClaim";


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


export default function MinerCard({
  id
}: {
  id: number
}) {


  const image = useMinerImage(id);


  const {
    miningPower
  } = useMiningPower(id);


  const {
    data: statusData,
    refetch: refetchStatus
  } = useMiningStatus(id);


  const {
    data: resourcesData,
    refetch: refetchResources
  } = useResources(id);


  const {
    data: canClaimData,
    refetch: refetchClaim
  } = useCanClaim(id);


  const {
    startMining,
    isPending
  } = useMining();


  const {
    claimMining,
    isPending: claimPending
  } = useClaimMining();


  const [duration, setDuration] = useState<number>(86400);
  const [loading, setLoading] = useState(false);


  const status =
    statusData as MiningStatus | undefined;


  const resources =
    resourcesData as MiningResources | undefined;


  const canClaim =
    canClaimData as boolean | undefined;


  async function handleStart() {

    try {

      setLoading(true);

      await startMining(
        id,
        duration
      );

      setTimeout(() => {

        refetchStatus();
        refetchClaim();

      }, 3000);

    } catch (err) {

      console.error(
        "START ERROR",
        err
      );

    } finally {

      setLoading(false);

    }

  }


  async function handleClaim() {

    try {

      setLoading(true);

      await claimMining(id);

      setTimeout(() => {

        refetchResources();
        refetchStatus();
        refetchClaim();

      }, 3000);

    } catch (err) {

      console.error(
        "CLAIM ERROR",
        err
      );

    } finally {

      setLoading(false);

    }

  }


  const active =
    status?.[0] ?? false;


  const remaining =
    status?.[3] ?? 0n;


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


      {/* IMAGE */}

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

        {image && (

          <img
            src={image}
            alt={`Hood Miner #${id}`}
            className="
              w-full
              h-full
              object-contain
            "
          />

        )}

      </div>


      {/* TITLE */}

      <h2
        className="
          text-xl
          font-bold
          text-[#ccff00]
          mt-4
        "
      >
        Hood Miner #{id}
      </h2>


      {/* MINING POWER */}

      <p className="text-white mt-3">

        Mining Power:

        <span
          className="
            text-[#ccff00]
            ml-2
            font-bold
          "
        >
          {miningPower?.toString() || "0"}
        </span>

      </p>


      {/* STATUS */}

      <p className="text-white mt-2">

        Mining Status:

        <span
          className="
            text-[#ccff00]
            ml-2
            font-bold
          "
        >
          {active ? "ACTIVE" : "READY"}
        </span>

      </p>


      {/* REMAINING */}

      {active && (

        <p className="
          text-gray-400
          mt-2
        ">

          Remaining:

          {" "}

          {remaining.toString()}

          {" "}sec

        </p>

      )}


      {/* RESOURCES */}

      {resources && (

        <div
          className="
            mt-5
            bg-[#222]
            rounded-xl
            p-4
            text-white
          "
        >

          <h3
            className="
              text-[#ccff00]
              font-bold
              mb-3
            "
          >
            Mining Resources
          </h3>


          <p>
            🪨 Stone:
            {" "}
            {resources[0].toString()}
          </p>


          <p>
            ⛏ Ore:
            {" "}
            {resources[1].toString()}
          </p>


          <p>
            🔶 Copper:
            {" "}
            {resources[2].toString()}
          </p>


          <p>
            🟡 Gold:
            {" "}
            {resources[3].toString()}
          </p>


          <p>
            💎 Diamond:
            {" "}
            {resources[4].toString()}
          </p>


          <p>
            🔮 Crystal:
            {" "}
            {resources[5].toString()}
          </p>

        </div>

      )}


      {/* DURATION */}

      {!active && !canClaim && (

        <div
          className="
            grid
            grid-cols-2
            gap-3
            mt-5
          "
        >

          {[
            {
              name: "12 Hours",
              value: 43200
            },
            {
              name: "24 Hours",
              value: 86400
            },
            {
              name: "3 Days",
              value: 259200
            },
            {
              name: "7 Days",
              value: 604800
            }
          ].map((item) => (

            <button
              key={item.value}
              onClick={() =>
                setDuration(item.value)
              }
              className={`
                py-2
                rounded-xl
                font-bold
                ${
                  duration === item.value
                    ? "bg-[#ccff00] text-black"
                    : "bg-[#222] text-white"
                }
              `}
            >
              {item.name}
            </button>

          ))}

        </div>

      )}


      {/* ACTION BUTTON */}

      <button

        disabled={
          loading ||
          isPending ||
          claimPending ||
          (active && !canClaim)
        }

        onClick={() => {

          if (canClaim) {

            handleClaim();

          } else {

            handleStart();

          }

        }}

        className={`
          mt-5
          w-full
          py-3
          rounded-xl
          font-bold
          ${
            canClaim
              ? "bg-blue-500 text-white"
              : active
              ? "bg-gray-600 text-gray-300"
              : "bg-[#ccff00] text-black"
          }
        `}
      >

        {canClaim
          ? "CLAIM REWARD"
          : active
          ? "MINING ACTIVE"
          : loading
          ? "STARTING..."
          : "START MINING"}

      </button>


    </div>

  );

}
"use client";

import { useEffect, useState } from "react";

import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import UpgradeJSON from "@/abi/HoodMinersUpgrade.json";

import { useOwnedMiners } from "@/hooks/useOwnedMiners";
import { useMiningPower } from "@/hooks/useMiningPower";


const UPGRADE_ADDRESS =
  "0x74f56f2112c7aed20f36f66e0d58fbe6de5c76ce";


export default function UpgradePage() {

  const [mounted, setMounted] = useState(false);

  const {
    address,
  } = useAccount();


  const {
    miners = [],
    loading: minersLoading,
  } = useOwnedMiners();


  const [selectedId, setSelectedId] =
    useState<number | null>(null);


  useEffect(() => {
    setMounted(true);
  }, []);


  const selected =
    selectedId ?? miners[0] ?? 0;


  const {
    data: maxLevelData,
  } = useReadContract({
    address: UPGRADE_ADDRESS,
    abi: UpgradeJSON,
    functionName: "MAX_LEVEL",
  });


  const {
    data: upgradeFeeData,
  } = useReadContract({
    address: UPGRADE_ADDRESS,
    abi: UpgradeJSON,
    functionName: "UPGRADE_FEE",
  });


  const {
    data: pickaxeLevelData,
    refetch: refetchPickaxe,
  } = useReadContract({
    address: UPGRADE_ADDRESS,
    abi: UpgradeJSON,
    functionName: "pickaxeLevel",
    args: [
      BigInt(selected)
    ],
    query: {
      enabled:
        mounted &&
        selected > 0,
    },
  });


  const {
    data: rigLevelData,
    refetch: refetchRig,
  } = useReadContract({
    address: UPGRADE_ADDRESS,
    abi: UpgradeJSON,
    functionName: "rigLevel",
    args: [
      BigInt(selected)
    ],
    query: {
      enabled:
        mounted &&
        selected > 0,
    },
  });


  const {
    miningPower,
  } = useMiningPower(selected);


  const {
    writeContract,
    data: txHash,
    isPending,
    error: writeError,
  } = useWriteContract();


  const {
    isLoading: isConfirming,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });


  const maxLevel =
    maxLevelData as bigint | undefined;


  const upgradeFee =
    upgradeFeeData as bigint | undefined;


  const pickaxeLevel =
    pickaxeLevelData as bigint | undefined;


  const rigLevel =
    rigLevelData as bigint | undefined;


  const currentPickaxe =
    Number(pickaxeLevel ?? BigInt(0));


  const currentRig =
    Number(rigLevel ?? BigInt(0));


  const max =
    Number(maxLevel ?? BigInt(0));


  async function refreshUpgrade() {

    await Promise.all([
      refetchPickaxe(),
      refetchRig(),
    ]);

  }


  useEffect(() => {

    if (!isSuccess) {
      return;
    }

    refreshUpgrade();

  }, [isSuccess]);


  function upgradePickaxe() {

    if (
      selected <= 0 ||
      upgradeFee === undefined
    ) {
      return;
    }


    if (
      max > 0 &&
      currentPickaxe >= max
    ) {
      return;
    }


    writeContract({

      address: UPGRADE_ADDRESS,

      abi: UpgradeJSON,

      functionName: "upgradePickaxe",

      args: [
        BigInt(selected)
      ],

      value: upgradeFee,

    });

  }


  function upgradeRig() {

    if (
      selected <= 0 ||
      upgradeFee === undefined
    ) {
      return;
    }


    if (
      max > 0 &&
      currentRig >= max
    ) {
      return;
    }


    writeContract({

      address: UPGRADE_ADDRESS,

      abi: UpgradeJSON,

      functionName: "upgradeRig",

      args: [
        BigInt(selected)
      ],

      value: upgradeFee,

    });

  }


  if (!mounted) {

    return (
      <main className="
        min-h-screen
        bg-black
        text-white
        p-8
      ">

        <div className="
          max-w-6xl
          mx-auto
        ">

          <h1 className="
            text-5xl
            font-black
            text-[#ccff00]
          ">
            UPGRADE
          </h1>


          <div className="
            mt-8
            bg-[#111]
            border
            border-[#333]
            rounded-2xl
            p-6
            text-gray-400
          ">
            Loading...
          </div>

        </div>

      </main>
    );

  }


  if (!address) {

    return (
      <main className="
        min-h-screen
        bg-black
        text-white
        p-8
      ">

        <div className="
          max-w-6xl
          mx-auto
        ">

          <h1 className="
            text-5xl
            font-black
            text-[#ccff00]
          ">
            UPGRADE
          </h1>


          <div className="
            mt-8
            bg-[#111]
            border
            border-[#333]
            rounded-2xl
            p-6
            text-gray-400
          ">
            Connect your wallet to upgrade your Hood Miner.
          </div>

        </div>

      </main>
    );

  }


  if (minersLoading) {

    return (
      <main className="
        min-h-screen
        bg-black
        text-white
        p-8
      ">

        <div className="
          max-w-6xl
          mx-auto
        ">

          <h1 className="
            text-5xl
            font-black
            text-[#ccff00]
          ">
            UPGRADE
          </h1>


          <div className="
            mt-8
            bg-[#111]
            border
            border-[#333]
            rounded-2xl
            p-6
            text-gray-400
          ">
            Loading your Hood Miners...
          </div>

        </div>

      </main>
    );

  }


  if (miners.length === 0) {

    return (
      <main className="
        min-h-screen
        bg-black
        text-white
        p-8
      ">

        <div className="
          max-w-6xl
          mx-auto
        ">

          <h1 className="
            text-5xl
            font-black
            text-[#ccff00]
          ">
            UPGRADE
          </h1>


          <div className="
            mt-8
            bg-[#111]
            border
            border-[#333]
            rounded-2xl
            p-6
            text-gray-400
          ">
            You don't own any Hood Miners.
          </div>

        </div>

      </main>
    );

  }


  return (
    <main className="
      min-h-screen
      bg-black
      text-white
      p-8
    ">

      <div className="
        max-w-6xl
        mx-auto
      ">


        <h1 className="
          text-5xl
          font-black
          text-[#ccff00]
        ">
          UPGRADE
        </h1>


        <p className="
          text-gray-400
          mt-2
        ">
          Upgrade your mining equipment.
        </p>


        {/* SELECT MINER */}

        <div className="
          mt-8
          bg-[#111]
          border
          border-[#333]
          rounded-2xl
          p-6
        ">

          <h2 className="
            text-2xl
            font-black
            text-[#ccff00]
            mb-5
          ">
            Select Miner
          </h2>


          <div className="
            grid
            grid-cols-2
            md:grid-cols-5
            gap-3
          ">

            {miners.map((id) => (

              <button
                key={id}
                onClick={() =>
                  setSelectedId(id)
                }
                className={`
                  rounded-xl
                  p-4
                  font-bold
                  transition
                  ${
                    selected === id
                      ? "bg-[#ccff00] text-black"
                      : "bg-[#222] text-white hover:bg-[#2d2d2d]"
                  }
                `}
              >
                Hood Miner #{id}
              </button>

            ))}

          </div>

        </div>


        {/* OVERVIEW */}

        <div className="
          mt-8
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
        ">

          <div className="
            bg-[#111]
            border
            border-[#333]
            rounded-2xl
            p-6
          ">

            <p className="text-gray-400">
              Token ID
            </p>

            <h2 className="
              text-4xl
              font-black
              text-[#ccff00]
              mt-2
            ">
              #{selected}
            </h2>

          </div>


          <div className="
            bg-[#111]
            border
            border-[#333]
            rounded-2xl
            p-6
          ">

            <p className="text-gray-400">
              Mining Power
            </p>

            <h2 className="
              text-4xl
              font-black
              text-[#ccff00]
              mt-2
            ">
              {miningPower?.toString() ?? "0"}
            </h2>

          </div>

        </div>


        {/* UPGRADE CARDS */}

        <div className="
          mt-8
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        ">


          {/* PICKAXE */}

          <div className="
            bg-[#111]
            border
            border-[#333]
            rounded-2xl
            p-6
          ">

            <div className="
              flex
              justify-between
            ">

              <div>

                <p className="text-gray-400">
                  PICKAXE
                </p>

                <h2 className="
                  text-4xl
                  font-black
                  text-[#ccff00]
                  mt-2
                ">
                  Level {currentPickaxe}
                </h2>

              </div>


              <div className="
                text-right
                text-gray-400
              ">

                <p>
                  MAX
                </p>

                <p className="
                  text-white
                  font-bold
                ">
                  {max || "—"}
                </p>

              </div>

            </div>


            <button
              onClick={upgradePickaxe}
              disabled={
                isPending ||
                isConfirming ||
                upgradeFee === undefined ||
                (
                  max > 0 &&
                  currentPickaxe >= max
                )
              }
              className="
                mt-6
                w-full
                bg-[#ccff00]
                text-black
                font-black
                py-4
                rounded-xl
                disabled:opacity-40
                disabled:cursor-not-allowed
              "
            >

              {
                currentPickaxe >= max &&
                max > 0

                  ? "MAX LEVEL"

                  : isPending

                  ? "CONFIRM WALLET..."

                  : isConfirming

                  ? "UPGRADING..."

                  : "UPGRADE PICKAXE"
              }

            </button>

          </div>


          {/* RIG */}

          <div className="
            bg-[#111]
            border
            border-[#333]
            rounded-2xl
            p-6
          ">

            <div className="
              flex
              justify-between
            ">

              <div>

                <p className="text-gray-400">
                  MINING RIG
                </p>

                <h2 className="
                  text-4xl
                  font-black
                  text-[#ccff00]
                  mt-2
                ">
                  Level {currentRig}
                </h2>

              </div>


              <div className="
                text-right
                text-gray-400
              ">

                <p>
                  MAX
                </p>

                <p className="
                  text-white
                  font-bold
                ">
                  {max || "—"}
                </p>

              </div>

            </div>


            <button
              onClick={upgradeRig}
              disabled={
                isPending ||
                isConfirming ||
                upgradeFee === undefined ||
                (
                  max > 0 &&
                  currentRig >= max
                )
              }
              className="
                mt-6
                w-full
                bg-[#ccff00]
                text-black
                font-black
                py-4
                rounded-xl
                disabled:opacity-40
                disabled:cursor-not-allowed
              "
            >

              {
                currentRig >= max &&
                max > 0

                  ? "MAX LEVEL"

                  : isPending

                  ? "CONFIRM WALLET..."

                  : isConfirming

                  ? "UPGRADING..."

                  : "UPGRADE RIG"
              }

            </button>

          </div>


        </div>


        {/* SUCCESS */}

        {isSuccess && (

          <div className="
            mt-6
            bg-green-950
            border
            border-green-800
            rounded-xl
            p-4
            text-green-300
          ">
            Upgrade successful.
          </div>

        )}


        {/* ERROR */}

        {writeError && (

          <div className="
            mt-6
            bg-red-950
            border
            border-red-800
            rounded-xl
            p-4
            text-red-300
            break-all
          ">
            {writeError.message}
          </div>

        )}


        {/* TX HASH */}

        {txHash && (

          <div className="
            mt-4
            bg-[#111]
            border
            border-[#333]
            rounded-xl
            p-4
            text-sm
            text-gray-400
            break-all
          ">

            Transaction:
            <br />

            <span className="text-white">
              {txHash}
            </span>

          </div>

        )}

      </div>

    </main>
  );
}
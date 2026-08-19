"use client";

import { useState } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
} from "wagmi";

import MiningJSON from "@/abi/HoodMinersMining.json";
import ResourceJSON from "@/abi/HoodMinersResource.json";


const MINING_ADDRESS =
  "0x24F6c0D981c8c927C95F6D2a90F75F1F3f7d8031";

const RESOURCE_ADDRESS =
  "0x928Da26C1Ac2E71735dA21c3251d2BDB884961C2";

const MINERS_ADDRESS =
  "0x98eb0511d3e16fE0331b3B13476c1b170A6D9941";


const MINING_ABI = MiningJSON;
const RESOURCE_ABI = ResourceJSON;


type MiningResources = readonly [
  bigint,
  bigint,
  bigint,
  bigint,
  bigint,
  bigint
];


const resources = [
  {
    key: "stone",
    label: "Stone",
    index: 0,
    sellFunction: "convertStone",
    buyFunction: "buyStone",
    rate: 1000,
  },
  {
    key: "ore",
    label: "Ore",
    index: 1,
    sellFunction: "convertOre",
    buyFunction: "buyOre",
    rate: 500,
  },
  {
    key: "copper",
    label: "Copper",
    index: 2,
    sellFunction: "convertCopper",
    buyFunction: "buyCopper",
    rate: 250,
  },
  {
    key: "gold",
    label: "Gold",
    index: 3,
    sellFunction: "convertGold",
    buyFunction: "buyGold",
    rate: 100,
  },
  {
    key: "diamond",
    label: "Diamond",
    index: 4,
    sellFunction: "convertDiamond",
    buyFunction: "buyDiamond",
    rate: 25,
  },
  {
    key: "crystal",
    label: "Crystal",
    index: 5,
    sellFunction: "convertCrystal",
    buyFunction: "buyCrystal",
    rate: 5,
  },
] as const;


export default function SwapPage() {

  const { address } = useAccount();


  const [mode, setMode] =
    useState<"sell" | "buy">("sell");


  const [tokenId, setTokenId] =
    useState(1);


  const [selected, setSelected] =
    useState<(typeof resources)[number]>(
      resources[0]
    );


  const [amount, setAmount] =
    useState("");


  const {
    writeContract,
    isPending,
  } = useWriteContract();


  const {
    data: miningResourcesData,
    refetch: refetchResources,
  } = useReadContract({

    address: MINING_ADDRESS,

    abi: MINING_ABI,

    functionName: "getResources",

    args: [
      BigInt(tokenId)
    ],

    query: {

      enabled:
        !!address &&
        tokenId > 0,

    },

  });


  const miningResources =
    miningResourcesData as
      | MiningResources
      | undefined;


  const balance =
    miningResources?.[selected.index] ??
    0n;


  const parsedAmount = BigInt(
    amount &&
    /^\d+$/.test(amount)
      ? amount
      : "0"
  );


  const receiveAmount =
    mode === "sell"
      ? parsedAmount /
        BigInt(selected.rate)

      : parsedAmount *
        BigInt(selected.rate);


  const canSell =
    parsedAmount > 0n &&
    parsedAmount <= balance &&
    parsedAmount %
      BigInt(selected.rate) ===
      0n;


  const canBuy =
    parsedAmount > 0n;


  const canSubmit =
    !!address &&
    tokenId > 0 &&
    parsedAmount > 0n &&
    (
      mode === "sell"
        ? canSell
        : canBuy
    ) &&
    !isPending;


  function handleSwap() {

    if (!canSubmit) {
      return;
    }


    if (mode === "sell") {

      writeContract({

        address:
          RESOURCE_ADDRESS,

        abi:
          RESOURCE_ABI,

        functionName:
          selected.sellFunction,

        args: [

          BigInt(tokenId),

          parsedAmount,

        ],

      });

    } else {

      writeContract({

        address:
          RESOURCE_ADDRESS,

        abi:
          RESOURCE_ABI,

        functionName:
          selected.buyFunction,

        args: [

          BigInt(tokenId),

          parsedAmount,

        ],

      });

    }


    setTimeout(() => {

      refetchResources();

    }, 5000);

  }


  const receiveLabel =
    mode === "sell"
      ? "$MINERS"
      : selected.label;


  const inputLabel =
    mode === "sell"
      ? selected.label
      : "$MINERS";


  return (

    <main className="
      min-h-screen
      bg-black
      text-white
      p-8
    ">

      <div className="
        max-w-4xl
        mx-auto
      ">


        <h1 className="
          text-5xl
          font-black
          text-[#ccff00]
        ">
          SWAP
        </h1>


        <p className="
          text-gray-400
          mt-2
        ">
          Convert resources and $MINERS
        </p>


        {/* MODE */}

        <div className="
          mt-8
          grid
          grid-cols-2
          gap-3
        ">

          <button

            onClick={() =>
              setMode("sell")
            }

            className={`

              py-3

              rounded-xl

              font-black

              ${
                mode === "sell"

                  ? "bg-[#ccff00] text-black"

                  : "bg-[#111] text-white border border-[#333]"
              }

            `}
          >
            RESOURCE → $MINERS
          </button>


          <button

            onClick={() =>
              setMode("buy")
            }

            className={`

              py-3

              rounded-xl

              font-black

              ${
                mode === "buy"

                  ? "bg-[#ccff00] text-black"

                  : "bg-[#111] text-white border border-[#333]"
              }

            `}
          >
            $MINERS → RESOURCE
          </button>

        </div>


        {/* SWAP PANEL */}

        <div className="
          mt-8
          bg-[#111]
          border
          border-[#333]
          rounded-2xl
          p-6
        ">


          {/* RESOURCE SELECT */}

          {mode === "sell" && (

            <div className="
              grid
              grid-cols-2
              md:grid-cols-3
              gap-3
            ">

              {resources.map(
                (resource) => (

                  <button

                    key={
                      resource.key
                    }

                    onClick={() => {

                      setSelected(
                        resource
                      );

                      setAmount("");

                    }}

                    className={`

                      p-4

                      rounded-xl

                      font-bold

                      ${
                        selected.key ===
                        resource.key

                          ? "bg-[#ccff00] text-black"

                          : "bg-[#222] text-white"
                      }

                    `}
                  >

                    {resource.label}

                    <div className="
                      text-xs
                      opacity-70
                      mt-1
                    ">

                      {
                        resource.rate.toLocaleString()
                      }

                      {" : 1"}

                    </div>

                  </button>

                )
              )}

            </div>

          )}


          {/* BUY RESOURCE */}

          {mode === "buy" && (

            <div>

              <p className="
                text-gray-400
                mb-3
              ">
                Resource to buy
              </p>


              <div className="
                grid
                grid-cols-2
                md:grid-cols-3
                gap-3
              ">

                {resources.map(
                  (resource) => (

                    <button

                      key={
                        resource.key
                      }

                      onClick={() => {

                        setSelected(
                          resource
                        );

                        setAmount("");

                      }}

                      className={`

                        p-4

                        rounded-xl

                        font-bold

                        ${
                          selected.key ===
                          resource.key

                            ? "bg-[#ccff00] text-black"

                            : "bg-[#222] text-white"
                        }

                      `}
                    >

                      {resource.label}

                    </button>

                  )
                )}

              </div>

            </div>

          )}


          {/* TOKEN ID */}

          <div className="mt-8">

            <label className="
              text-sm
              text-gray-400
            ">
              NFT Token ID
            </label>


            <input

              type="number"

              min={1}

              value={tokenId}

              onChange={(e) =>
                setTokenId(
                  Number(
                    e.target.value
                  )
                )
              }

              className="
                mt-2
                w-full
                bg-black
                border
                border-[#333]
                rounded-xl
                p-4
                outline-none
              "

            />

          </div>


          {/* BALANCE + AMOUNT */}

          <div className="mt-6">

            <div className="
              flex
              justify-between
              text-sm
              text-gray-400
            ">

              <span>
                Your {selected.label}
              </span>


              <span>
                {balance.toString()}
              </span>

            </div>


            <label className="
              text-sm
              text-gray-400
              block
              mt-5
            ">
              {inputLabel} amount
            </label>


            <input

              type="number"

              min={1}

              value={amount}

              onChange={(e) =>
                setAmount(
                  e.target.value
                )
              }

              placeholder="0"

              className="
                mt-2
                w-full
                bg-black
                border
                border-[#333]
                rounded-xl
                p-4
                text-xl
                outline-none
              "

            />

          </div>


          {/* RECEIVE */}

          <div className="
            mt-6
            bg-black
            rounded-xl
            p-5
          ">

            <p className="
              text-gray-400
            ">
              You receive
            </p>


            <p className="
              text-3xl
              font-black
              text-[#ccff00]
              mt-2
            ">

              {receiveAmount.toString()}

              {" "}

              {receiveLabel}

            </p>

          </div>


          {/* VALIDATION */}

          {mode === "sell" &&
            parsedAmount > 0n &&
            !canSell && (

              <p className="
                text-red-400
                mt-4
              ">

                Amount must be a multiple
                of{" "}
                {selected.rate.toLocaleString()}
                {" "}
                and cannot exceed
                your balance.

              </p>

            )}


          {/* BUTTON */}

          <button

            onClick={
              handleSwap
            }

            disabled={
              !canSubmit
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

            {isPending

              ? "CONFIRM TRANSACTION..."

              : mode === "sell"

              ? `CONVERT ${
                  selected.label.toUpperCase()
                }`

              : `BUY ${
                  selected.label.toUpperCase()
                }`

            }

          </button>


        </div>

      </div>

    </main>

  );
}
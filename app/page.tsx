"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatEther } from "viem";

import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import HoodMinersJSON from "@/abi/HoodMiners.json";


const HOOD_MINERS_ADDRESS =
  "0x98eb0511d3e16fE0331b3B13476c1b170A6D9941";


type BigIntValue = bigint | undefined;


export default function Home() {

  const [mounted, setMounted] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);

  const { address } = useAccount();


  useEffect(() => {
    setMounted(true);
  }, []);


  /* =========================================================
     CONTRACT READS
  ========================================================= */

  const {
    data: mintOpenData,
    isLoading: mintOpenLoading,
    error: mintOpenError,
  } = useReadContract({
    address: HOOD_MINERS_ADDRESS,
    abi: HoodMinersJSON,
    functionName: "mintOpen",
    query: {
      enabled: mounted,
    },
  });


  const {
    data: mintPriceData,
    isLoading: mintPriceLoading,
    error: mintPriceError,
  } = useReadContract({
    address: HOOD_MINERS_ADDRESS,
    abi: HoodMinersJSON,
    functionName: "mintPrice",
    query: {
      enabled: mounted,
    },
  });


  const {
    data: maxMintPerTxData,
    isLoading: maxMintLoading,
    error: maxMintError,
  } = useReadContract({
    address: HOOD_MINERS_ADDRESS,
    abi: HoodMinersJSON,
    functionName: "maxMintPerTx",
    query: {
      enabled: mounted,
    },
  });


  const {
    data: totalMintedData,
    isLoading: totalMintedLoading,
    error: totalMintedError,
  } = useReadContract({
    address: HOOD_MINERS_ADDRESS,
    abi: HoodMinersJSON,
    functionName: "totalMinted",
    query: {
      enabled: mounted,
    },
  });


  const {
    data: maxSupplyData,
    isLoading: maxSupplyLoading,
    error: maxSupplyError,
  } = useReadContract({
    address: HOOD_MINERS_ADDRESS,
    abi: HoodMinersJSON,
    functionName: "MAX_SUPPLY",
    query: {
      enabled: mounted,
    },
  });


  /* =========================================================
     TYPE CAST
  ========================================================= */

  const mintOpen =
    mintOpenData as boolean | undefined;

  const mintPrice =
    mintPriceData as BigIntValue;

  const maxMintPerTx =
    maxMintPerTxData as BigIntValue;

  const totalMinted =
    totalMintedData as BigIntValue;

  const maxSupply =
    maxSupplyData as BigIntValue;


  /* =========================================================
     MINT CALCULATION
  ========================================================= */

  const maxMint = Math.max(
    1,
    Number(maxMintPerTx ?? BigInt(1))
  );


  const quantity = Math.min(
    Math.max(mintAmount, 1),
    maxMint
  );


  const totalCost =
    mintPrice !== undefined
      ? mintPrice * BigInt(quantity)
      : BigInt(0);


  /* =========================================================
     MINT TRANSACTION
  ========================================================= */

  const {
    writeContract,
    data: mintHash,
    isPending,
    error: mintError,
  } = useWriteContract();


  const {
    isLoading: isConfirming,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash: mintHash,
  });


  function handleMint() {

    if (!address) {
      return;
    }

    if (mintOpen !== true) {
      return;
    }

    if (mintPrice === undefined) {
      return;
    }

    if (quantity < 1) {
      return;
    }


    writeContract({

      address: HOOD_MINERS_ADDRESS,

      abi: HoodMinersJSON,

      functionName: "mint",

      args: [
        BigInt(quantity),
      ],

      value: totalCost,

    });

  }


  return (

    <main className="
      min-h-screen
      bg-black
      text-white
    ">


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="
        min-h-[85vh]
        flex
        items-center
        px-6
      ">

        <div className="
          max-w-6xl
          mx-auto
          w-full
        ">

          <p className="
            text-[#ccff00]
            font-black
            text-sm
            tracking-[0.2em]
          ">
            HOOD MINERS
          </p>


          <h1 className="
            mt-5
            text-6xl
            md:text-8xl
            font-black
            leading-[0.9]
          ">
            MINE.
            <br />
            EARN.
            <br />
            UPGRADE.
          </h1>


          <p className="
            mt-8
            max-w-xl
            text-lg
            md:text-xl
            text-gray-400
            leading-relaxed
          ">
            Mine resources, upgrade your Miner,
            and turn your loot into $MINERS.
          </p>


          <div className="
            mt-8
            flex
            flex-wrap
            gap-4
          ">

            <Link
              href="/mining"
              className="
                px-7
                py-4
                rounded-xl
                bg-[#ccff00]
                text-black
                font-black
              "
            >
              START MINING
            </Link>


            <Link
              href="/profile"
              className="
                px-7
                py-4
                rounded-xl
                bg-[#111]
                border
                border-[#333]
                font-black
              "
            >
              VIEW PROFILE
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          MINT
      ===================================================== */}

      <section
        id="mint"
        className="
          border-t
          border-[#222]
          px-6
          py-24
        "
      >

        <div className="
          max-w-5xl
          mx-auto
        ">

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-8
            items-center
          ">


            {/* LEFT */}

            <div>

              <p className="
                text-[#ccff00]
                font-black
                text-sm
                tracking-[0.2em]
              ">
                MINT
              </p>


              <h2 className="
                mt-4
                text-4xl
                md:text-6xl
                font-black
              ">
                GET YOUR
                <br />
                HOOD MINER.
              </h2>


              <p className="
                mt-5
                text-gray-400
                text-lg
                leading-relaxed
              ">
                Mint a Miner, put it to work,
                and start building your setup.
              </p>


              <div className="
                mt-8
                grid
                grid-cols-2
                gap-4
              ">


                {/* MINTED */}

                <div className="
                  bg-[#111]
                  border
                  border-[#333]
                  rounded-xl
                  p-5
                ">

                  <p className="
                    text-sm
                    text-gray-500
                  ">
                    MINTED
                  </p>


                  <p className="
                    mt-2
                    text-2xl
                    font-black
                    text-[#ccff00]
                  ">

                    {!mounted
                      ? "..."
                      : totalMintedLoading
                      ? "..."
                      : totalMinted !== undefined
                      ? totalMinted.toString()
                      : "—"}

                  </p>

                </div>


                {/* SUPPLY */}

                <div className="
                  bg-[#111]
                  border
                  border-[#333]
                  rounded-xl
                  p-5
                ">

                  <p className="
                    text-sm
                    text-gray-500
                  ">
                    SUPPLY
                  </p>


                  <p className="
                    mt-2
                    text-2xl
                    font-black
                    text-[#ccff00]
                  ">

                    {!mounted
                      ? "..."
                      : maxSupplyLoading
                      ? "..."
                      : maxSupply !== undefined
                      ? maxSupply.toString()
                      : "—"}

                  </p>

                </div>

              </div>

            </div>


            {/* RIGHT MINT BOX */}

            <div className="
              bg-[#111]
              border
              border-[#333]
              rounded-2xl
              p-6
            ">


              {/* PRICE */}

              <div className="
                flex
                justify-between
                items-center
              ">

                <span className="text-gray-400">
                  Mint Price
                </span>


                <span className="
                  font-black
                  text-[#ccff00]
                ">

                  {!mounted
                    ? "..."
                    : mintPriceLoading
                    ? "..."
                    : mintPrice !== undefined
                    ? `${formatEther(mintPrice)} ETH`
                    : "—"}

                </span>

              </div>


              {/* QUANTITY */}

              <div className="
                mt-6
                flex
                items-center
                justify-between
                bg-black
                rounded-xl
                p-3
              ">


                <button
                  type="button"

                  onClick={() =>
                    setMintAmount(
                      Math.max(
                        1,
                        mintAmount - 1
                      )
                    )
                  }

                  disabled={
                    mintAmount <= 1
                  }

                  className="
                    w-12
                    h-12
                    rounded-lg
                    bg-[#222]
                    text-white
                    text-xl
                    font-black
                    disabled:opacity-30
                  "
                >
                  −
                </button>


                <div className="text-center">

                  <p className="
                    text-xs
                    text-gray-500
                  ">
                    QUANTITY
                  </p>


                  <p className="
                    text-3xl
                    font-black
                    text-[#ccff00]
                  ">
                    {quantity}
                  </p>

                </div>


                <button
                  type="button"

                  onClick={() =>
                    setMintAmount(
                      Math.min(
                        maxMint,
                        mintAmount + 1
                      )
                    )
                  }

                  disabled={
                    mintAmount >= maxMint
                  }

                  className="
                    w-12
                    h-12
                    rounded-lg
                    bg-[#222]
                    text-white
                    text-xl
                    font-black
                    disabled:opacity-30
                  "
                >
                  +
                </button>

              </div>


              {/* MAX PER TX */}

              <div className="
                mt-5
                flex
                justify-between
                text-sm
              ">

                <span className="
                  text-gray-500
                ">
                  Max per tx
                </span>


                <span className="font-bold">

                  {!mounted
                    ? "..."
                    : maxMintLoading
                    ? "..."
                    : maxMint}

                </span>

              </div>


              {/* TOTAL */}

              <div className="
                mt-3
                flex
                justify-between
              ">

                <span className="
                  text-gray-400
                ">
                  Total
                </span>


                <span className="
                  text-xl
                  font-black
                  text-[#ccff00]
                ">

                  {mintPrice !== undefined
                    ? `${formatEther(totalCost)} ETH`
                    : "—"}

                </span>

              </div>


              {/* BUTTON */}

              <button
                onClick={handleMint}

                disabled={
                  !mounted ||
                  !address ||
                  mintOpen !== true ||
                  mintPrice === undefined ||
                  isPending ||
                  isConfirming
                }

                className="
                  mt-6
                  w-full
                  py-4
                  rounded-xl
                  bg-[#ccff00]
                  text-black
                  font-black
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >

                {!mounted
                  ? "LOADING..."
                  : !address
                  ? "CONNECT WALLET"
                  : mintOpen === undefined
                  ? "LOADING..."
                  : mintOpen === false
                  ? "MINT CLOSED"
                  : isPending
                  ? "CONFIRM WALLET..."
                  : isConfirming
                  ? "MINTING..."
                  : `MINT ${quantity}`}

              </button>


              {/* READ ERROR */}

              {mounted &&
                (
                  mintOpenError ||
                  mintPriceError ||
                  maxMintError ||
                  totalMintedError ||
                  maxSupplyError
                ) && (

                  <div className="
                    mt-4
                    bg-red-950
                    border
                    border-red-800
                    rounded-xl
                    p-4
                    text-red-300
                    text-xs
                    break-all
                  ">

                    <p className="
                      font-black
                      mb-2
                    ">
                      CONTRACT READ ERROR
                    </p>


                    <p>
                      {
                        (
                          mintOpenError ||
                          mintPriceError ||
                          maxMintError ||
                          totalMintedError ||
                          maxSupplyError
                        )?.message
                      }
                    </p>

                  </div>

                )}


              {/* SUCCESS */}

              {isSuccess && (

                <div className="
                  mt-4
                  rounded-xl
                  bg-green-950
                  border
                  border-green-800
                  p-4
                  text-green-300
                  text-sm
                ">
                  Mint successful.
                </div>

              )}


              {/* WRITE ERROR */}

              {mintError && (

                <div className="
                  mt-4
                  rounded-xl
                  bg-red-950
                  border
                  border-red-800
                  p-4
                  text-red-300
                  text-sm
                  break-all
                ">
                  {mintError.message}
                </div>

              )}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ABOUT
      ===================================================== */}

      <section className="
        border-t
        border-[#222]
        px-6
        py-24
      ">

        <div className="
          max-w-6xl
          mx-auto
        ">

          <p className="
            text-[#ccff00]
            font-black
            text-sm
            tracking-[0.2em]
          ">
            HOOD MINERS
          </p>


          <h2 className="
            mt-4
            text-4xl
            md:text-6xl
            font-black
          ">
            YOUR NFT ACTUALLY DOES SOMETHING.
          </h2>


          <div className="
            mt-10
            max-w-3xl
            text-gray-400
            text-lg
            leading-relaxed
          ">

            <p>
              Every Hood Miner comes with its own
              mining power and equipment.
            </p>


            <p className="mt-5">
              Put your Miner to work, collect resources,
              upgrade it and keep mining.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}

      <section className="
        border-t
        border-[#222]
        px-6
        py-24
      ">

        <div className="
          max-w-6xl
          mx-auto
        ">

          <p className="
            text-[#ccff00]
            font-black
            text-sm
            tracking-[0.2em]
          ">
            HOW IT WORKS
          </p>


          <h2 className="
            mt-4
            text-4xl
            md:text-6xl
            font-black
          ">
            SIMPLE.
          </h2>


          <div className="
            mt-10
            grid
            grid-cols-1
            md:grid-cols-4
            gap-4
          ">

            {[
              ["01", "OWN", "Hold a Hood Miner."],
              ["02", "MINE", "Pick a duration and start mining."],
              ["03", "CLAIM", "Finish the session and collect your loot."],
              ["04", "UPGRADE", "Upgrade your setup and go again."],
            ].map(([number, title, text]) => (

              <div
                key={number}
                className="
                  bg-[#111]
                  border
                  border-[#333]
                  rounded-2xl
                  p-6
                "
              >

                <p className="
                  text-[#ccff00]
                  font-black
                ">
                  {number}
                </p>


                <h3 className="
                  mt-4
                  text-2xl
                  font-black
                ">
                  {title}
                </h3>


                <p className="
                  mt-3
                  text-gray-400
                ">
                  {text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          RESOURCES
      ===================================================== */}

      <section className="
        border-t
        border-[#222]
        px-6
        py-24
      ">

        <div className="
          max-w-6xl
          mx-auto
        ">

          <p className="
            text-[#ccff00]
            font-black
            text-sm
            tracking-[0.2em]
          ">
            RESOURCES
          </p>


          <h2 className="
            mt-4
            text-4xl
            md:text-6xl
            font-black
          ">
            MINE SOMETHING.
          </h2>


          <div className="
            mt-10
            grid
            grid-cols-2
            md:grid-cols-6
            gap-4
          ">

            {[
              ["🪨", "Stone"],
              ["⛏", "Ore"],
              ["🔶", "Copper"],
              ["🟡", "Gold"],
              ["💎", "Diamond"],
              ["🔮", "Crystal"],
            ].map(([icon, name]) => (

              <div
                key={name}
                className="
                  bg-[#111]
                  border
                  border-[#333]
                  rounded-2xl
                  p-6
                  text-center
                "
              >

                <div className="text-3xl">
                  {icon}
                </div>


                <p className="
                  mt-3
                  font-black
                ">
                  {name}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          $MINERS
      ===================================================== */}

      <section className="
        border-t
        border-[#222]
        px-6
        py-24
      ">

        <div className="
          max-w-6xl
          mx-auto
        ">

          <p className="
            text-[#ccff00]
            font-black
            text-sm
            tracking-[0.2em]
          ">
            $MINERS
          </p>


          <h2 className="
            mt-4
            text-4xl
            md:text-6xl
            font-black
          ">
            WHAT CAN YOU DO WITH IT?
          </h2>


          <div className="
            mt-10
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
          ">

            {[
              [
                "01",
                "CONVERT",
                "Turn your mined resources into $MINERS.",
              ],
              [
                "02",
                "BUY",
                "Use $MINERS to buy resources when you need them.",
              ],
              [
                "03",
                "SWAP",
                "$MINERS can be traded for ETH where liquidity is available.",
              ],
            ].map(([number, title, text]) => (

              <div
                key={number}
                className="
                  bg-[#111]
                  border
                  border-[#333]
                  rounded-2xl
                  p-7
                "
              >

                <div className="
                  text-3xl
                  font-black
                  text-[#ccff00]
                ">
                  {number}
                </div>


                <h3 className="
                  mt-5
                  text-2xl
                  font-black
                ">
                  {title}
                </h3>


                <p className="
                  mt-3
                  text-gray-400
                  leading-relaxed
                ">
                  {text}
                </p>

              </div>

            ))}

          </div>


          <div className="
            mt-8
            bg-[#111]
            border
            border-[#333]
            rounded-2xl
            p-7
          ">

            <div className="
              flex
              flex-wrap
              items-center
              gap-4
              text-lg
              font-black
            ">

              <span>
                RESOURCES
              </span>


              <span className="text-[#ccff00]">
                →
              </span>


              <span className="
                text-[#ccff00]
              ">
                $MINERS
              </span>


              <span className="text-[#ccff00]">
                →
              </span>


              <span>
                ETH
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ROADMAP
      ===================================================== */}

      <section className="
        border-t
        border-[#222]
        px-6
        py-24
      ">

        <div className="
          max-w-6xl
          mx-auto
        ">

          <p className="
            text-[#ccff00]
            font-black
            text-sm
            tracking-[0.2em]
          ">
            ROADMAP
          </p>


          <h2 className="
            mt-4
            text-4xl
            md:text-6xl
            font-black
          ">
            WHAT'S NEXT
          </h2>


          <div className="
            mt-10
            space-y-4
          ">

            {[
              [
                "PHASE 01",
                "START",
                "NFT launch, mining, resources, $MINERS and upgrades.",
              ],
              [
                "PHASE 02",
                "BUILD IT OUT",
                "More ways to use your Miner, your resources and your $MINERS.",
              ],
              [
                "PHASE 03",
                "MORE TO COME",
                "New systems, new utility and more reasons to keep mining.",
              ],
            ].map(([phase, title, text]) => (

              <div
                key={phase}
                className="
                  bg-[#111]
                  border
                  border-[#333]
                  rounded-2xl
                  p-7
                "
              >

                <p className="
                  text-[#ccff00]
                  font-black
                ">
                  {phase}
                </p>


                <h3 className="
                  mt-2
                  text-3xl
                  font-black
                ">
                  {title}
                </h3>


                <p className="
                  mt-4
                  text-gray-400
                ">
                  {text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="
        border-t
        border-[#222]
        px-6
        py-24
      ">

        <div className="
          max-w-4xl
          mx-auto
          text-center
        ">

          <h2 className="
            text-4xl
            md:text-6xl
            font-black
          ">
            GOT A MINER?
          </h2>


          <p className="
            mt-5
            text-gray-400
            text-lg
          ">
            Put it to work.
          </p>


          <Link
            href="/mining"
            className="
              inline-block
              mt-8
              bg-[#ccff00]
              text-black
              font-black
              px-8
              py-4
              rounded-xl
            "
          >
            START MINING
          </Link>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="
        border-t
        border-[#222]
        px-6
        py-8
      ">

        <div className="
          max-w-6xl
          mx-auto
          flex
          flex-col
          sm:flex-row
          justify-between
          items-center
          gap-4
          text-sm
          text-gray-500
        ">

          <span>
            HOOD MINERS
          </span>


          <span>
            MINE. EARN. UPGRADE.
          </span>

        </div>

      </footer>


    </main>
  );
}
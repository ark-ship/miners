"use client";

import { useEffect, useState } from "react";


const ADDRESS =
  "0x24F6c0D981c8c927C95F6D2a90F75F1F3f7d8031";


export function useMiningActiveCount(
  miners: number[]
) {

  const [active, setActive] =
    useState(0);


  useEffect(() => {

    async function check() {

      let count = 0;


      if (
        typeof window === "undefined" ||
        !window.ethereum
      ) {
        setActive(0);
        return;
      }


      for (const id of miners) {

        try {

          const result: string =
            await window.ethereum.request({

              method: "eth_call",

              params: [
                {
                  to: ADDRESS,

                  data:
                    "0x11703c57" +
                    id
                      .toString(16)
                      .padStart(64, "0"),
                },

                "latest",
              ],

            });


          if (result !== "0x") {

            const hex =
              result.slice(2, 66);


            if (
              BigInt(hex) === BigInt(1)
            ) {
              count++;
            }

          }

        } catch (error) {

          console.error(
            "MINING STATUS ERROR",
            id,
            error
          );

        }

      }


      setActive(count);

    }


    check();

  }, [miners]);


  return active;

}
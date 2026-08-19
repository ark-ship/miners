"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";


export default function Navbar() {

  const pathname = usePathname();

  const [open, setOpen] = useState(false);


  const menu = [
    {
      name: "HOME",
      url: "/",
    },
    {
      name: "MINING",
      url: "/mining",
    },
    {
      name: "DASHBOARD",
      url: "/dashboard",
    },
    {
      name: "SWAP",
      url: "/swap",
    },
    {
      name: "UPGRADE",
      url: "/upgrade",
    },
    {
      name: "PROFILE",
      url: "/profile",
    },
  ];


  function closeMenu() {
    setOpen(false);
  }


  return (

    <nav
      className="
        relative
        z-50
        w-full
        bg-black
        border-b
        border-[#222]
      "
    >

      <div
        className="
          h-20
          w-full
          flex
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
      >

        {/* LOGO */}

        <Link
          href="/"
          onClick={closeMenu}
          className="
            text-[#ccff00]
            text-xl
            sm:text-2xl
            lg:text-3xl
            font-black
            whitespace-nowrap
          "
        >
          ⛏ HOODMINERS
        </Link>


        {/* DESKTOP MENU */}

        <div
          className="
            hidden
            lg:flex
            items-center
            gap-5
            xl:gap-8
          "
        >

          {menu.map((item) => (

            <Link
              key={item.url}
              href={item.url}
              className={`
                font-bold
                text-sm
                xl:text-base
                transition
                whitespace-nowrap

                ${
                  pathname === item.url
                    ? "text-[#ccff00]"
                    : "text-white hover:text-[#ccff00]"
                }
              `}
            >
              {item.name}
            </Link>

          ))}

        </div>


        {/* DESKTOP WALLET */}

        <div className="hidden lg:block">
          <ConnectButton />
        </div>


        {/* MOBILE BUTTON */}

        <button
          onClick={() => setOpen(!open)}
          className="
            lg:hidden
            w-11
            h-11
            rounded-xl
            border
            border-[#333]
            flex
            items-center
            justify-center
            text-white
            text-2xl
          "
          aria-label="Toggle navigation"
          type="button"
        >
          {open ? "×" : "☰"}
        </button>

      </div>


      {/* MOBILE MENU */}

      {open && (

        <div
          className="
            lg:hidden
            border-t
            border-[#222]
            bg-black
            px-4
            py-4
          "
        >

          <div
            className="
              flex
              flex-col
              gap-2
            "
          >

            {menu.map((item) => (

              <Link
                key={item.url}
                href={item.url}
                onClick={closeMenu}
                className={`
                  px-4
                  py-3
                  rounded-xl
                  font-bold
                  transition

                  ${
                    pathname === item.url
                      ? "bg-[#ccff00] text-black"
                      : "text-white hover:bg-[#111] hover:text-[#ccff00]"
                  }
                `}
              >
                {item.name}
              </Link>

            ))}


            {/* MOBILE WALLET */}

            <div
              className="
                pt-3
                mt-2
                border-t
                border-[#222]
              "
            >
              <ConnectButton />
            </div>

          </div>

        </div>

      )}

    </nav>
  );
}
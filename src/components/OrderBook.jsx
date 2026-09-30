"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function OrderBook() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-[#048152] text-white px-6 py-3 hover:bg-transparent hover:border-2 hover:border-[#A72024] hover:text-[#A72024] transition"
      >
        ORDER NOW
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[1000] bg-black/75 flex items-center justify-center px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-[#262626] rounded-lg p-6 w-full max-w-md"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-white"
                aria-label="Close"
              >
                <X size={32} />
              </button>
            </div>
            <div className="text-white text-sm sm:text-base leading-relaxed">
              <h3 className="text-lg font-semibold mb-4">
                To purchase any of the books, contact:
              </h3>
              <ul className="space-y-4">
                <li>
                  <p className="font-semibold">1. Dati Harry</p>
                  <p>
                    <a href="tel:+2349076493507" className="underline">
                      09076493507
                    </a>
                  </p>
                  <p>
                    <a href="mailto:datiharry@gmail.com" className="underline">
                      datiharry@gmail.com
                    </a>
                  </p>
                </li>
                <li>
                  <p className="font-semibold">To purchase (UK)</p>
                  <p>
                    <a
                      href="mailto:fortheappleidsaint@gmail.com"
                      className="underline"
                    >
                      fortheappleidsaint@gmail.com
                    </a>
                  </p>
                </li>
                <li>
                  <p className="font-semibold">Stewart Ezekiel</p>
                  <p>
                    <a href="tel:+2349030643105" className="underline">
                      09030643105
                    </a>
                  </p>
                  <p>
                    <a
                      href="mailto:info.stewartofficial@gmail.com"
                      className="underline"
                    >
                      info.stewartofficial@gmail.com
                    </a>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function OrderBook({ links = [] }) {
  const [open, setOpen] = useState(false);

  if (links.length === 0) return null;

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
            <div className="grid gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="bg-[#eb2e34] text-white px-4 py-3 rounded text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

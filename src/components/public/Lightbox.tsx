"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const reduce = useReducedMotion();

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        onNavigate((index + 1) % images.length);
      }
      if (e.key === "ArrowRight") {
        onNavigate((index - 1 + images.length) % images.length);
      }
    },
    [index, images.length, onClose, onNavigate]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [handleKey]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0.15 : 0.3 }}
        onClick={onClose}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 p-3 text-white hover:bg-white/10 rounded-full"
          aria-label="إغلاق"
        >
          <X size={24} />
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate((index - 1 + images.length) % images.length);
              }}
              className="absolute right-3 p-3 text-white hover:bg-white/10 rounded-full"
              aria-label="السابق"
            >
              <ChevronRight size={28} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNavigate((index + 1) % images.length);
              }}
              className="absolute left-3 p-3 text-white hover:bg-white/10 rounded-full"
              aria-label="التالي"
            >
              <ChevronLeft size={28} />
            </button>
          </>
        )}

        <motion.div
          key={index}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0.15 : 0.3 }}
          className="max-w-4xl w-[90%] max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={images[index]}
              alt="صورة المشروع"
              fill
              sizes="(max-width:1200px) 100vw, 1100px"
              className="object-contain"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

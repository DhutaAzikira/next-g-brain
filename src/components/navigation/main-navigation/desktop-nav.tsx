"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { duration, easing } from "@/utils/animation";
import { siteConfig } from "@/lib/config";

type Position = {
  hover: boolean;
  left: number;
  width: number;
  height: number;
};

export function DesktopNav({ links }: { links: typeof siteConfig.navLinks }) {
  const [position, setPosition] = useState<Position>({
    hover: false,
    left: 0,
    width: 0,
    height: 0,
  });

  return (
    <ul
      className="relative flex items-center"
      onMouseLeave={() => setPosition((prev) => ({ ...prev, hover: false }))}
    >
      {links.map((link, index) => {
        return (
          <DesktopNavItem
            index={index}
            setPosition={setPosition}
            key={link.href}
          >
            <Link
              href={link.href}
              className="text-foreground/50 group-hover:text-foreground block px-4 py-2 text-sm leading-none transition-colors duration-500"
            >
              {link.label}
            </Link>
          </DesktopNavItem>
        );
      })}

      <DesktopNavIndicator position={position} />
    </ul>
  );
}

function DesktopNavItem({
  setPosition,
  children,
  index,
}: {
  index: number;
  setPosition: (pos: Position) => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const { width, height } = ref.current.getBoundingClientRect();
    const { offsetLeft } = ref.current;

    if (index === 0) {
      setPosition({
        hover: false,
        left: offsetLeft,
        width,
        height,
      });
    }
  }, []);

  const handleMouseEnter = () => {
    if (!ref.current) return;

    const { width, height } = ref.current.getBoundingClientRect();
    const { offsetLeft } = ref.current;

    setPosition({
      hover: true,
      left: offsetLeft,
      width,
      height,
    });
  };

  return (
    <li
      ref={ref}
      onMouseEnter={handleMouseEnter}
      className="group relative z-10 overflow-hidden rounded-full"
    >
      {children}
    </li>
  );
}

function DesktopNavIndicator({ position }: { position: Position }) {
  return (
    <motion.li
      animate={{
        left: position.left,
        width: position.width,
        height: position.height,
        transition: { ease: easing.inOut },
      }}
      className="absolute flex overflow-hidden rounded-full"
    >
      <AnimatePresence mode="wait">
        {position.hover && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: duration.short, ease: easing.in },
            }}
            exit={{
              opacity: 0,
              transition: { duration: duration.medium, ease: easing.out },
            }}
            className="bg-muted pointer-events-none size-full rounded-full"
          />
        )}
      </AnimatePresence>
    </motion.li>
  );
}

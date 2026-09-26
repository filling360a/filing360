"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

type ArrowDir = "se" | "sw" | "ne" | "nw";

type Props = {
  /** Text to reveal. Use \n for line breaks. */
  text: string;
  /** Absolute positioning classes from the parent. */
  className?: string;
  /** Slight tilt in degrees. */
  rotate?: number;
  /** Spiral arrow direction. */
  arrow?: ArrowDir;
  /** Stagger before first play starts (ms). */
  delayMs?: number;
  /** How many appear→hold→fade cycles before staying gone. */
  maxPlays?: number;
};

/**
 * ONE continuous stroke: expanding spiral → tip → both arrow wings.
 * pathLength animation draws the whole mark as a single ink line.
 */
const spirals: Record<
  ArrowDir,
  { viewBox: string; d: string; align: string; arrowBefore: boolean }
> = {
  // Coil near text → open down-right → continuous chevron (no lift)
  se: {
    viewBox: "0 0 100 90",
    align: "",
    arrowBefore: false,
    d:
      "M 38 22 " +
      "c 0 -6 4.5 -10 10.5 -10 " +
      "c 7 0 12 5.5 12 12.5 " +
      "c 0 9 -7.5 16 -17 16 " +
      "c -12.5 0 -21 -10 -21 -22 " +
      "c 0 -15 12.5 -26 28 -26 " +
      "c 18 0 32 14.5 36 32 " +
      "c 2.5 11 4 22 5 32 " +
      "c 0.5 5 1 9 1.5 12 " +
      "l -10 -4 " +
      "l 10 4 " +
      "l -4 -10",
  },
  sw: {
    viewBox: "0 0 100 90",
    align: "ml-auto",
    arrowBefore: false,
    d:
      "M 62 22 " +
      "c 0 -6 -4.5 -10 -10.5 -10 " +
      "c -7 0 -12 5.5 -12 12.5 " +
      "c 0 9 7.5 16 17 16 " +
      "c 12.5 0 21 -10 21 -22 " +
      "c 0 -15 -12.5 -26 -28 -26 " +
      "c -18 0 -32 14.5 -36 32 " +
      "c -2.5 11 -4 22 -5 32 " +
      "c -0.5 5 -1 9 -1.5 12 " +
      "l 10 -4 " +
      "l -10 4 " +
      "l 4 -10",
  },
  ne: {
    viewBox: "0 0 100 90",
    align: "",
    arrowBefore: true,
    d:
      "M 38 68 " +
      "c 0 6 4.5 10 10.5 10 " +
      "c 7 0 12 -5.5 12 -12.5 " +
      "c 0 -9 -7.5 -16 -17 -16 " +
      "c -12.5 0 -21 10 -21 22 " +
      "c 0 15 12.5 26 28 26 " +
      "c 18 0 32 -14.5 36 -32 " +
      "c 2.5 -11 4 -22 5 -32 " +
      "c 0.5 -5 1 -9 1.5 -12 " +
      "l -10 4 " +
      "l 10 -4 " +
      "l -4 10",
  },
  nw: {
    viewBox: "0 0 100 90",
    align: "ml-auto",
    arrowBefore: true,
    d:
      "M 62 68 " +
      "c 0 6 -4.5 10 -10.5 10 " +
      "c -7 0 -12 -5.5 -12 -12.5 " +
      "c 0 -9 7.5 -16 17 -16 " +
      "c 12.5 0 21 10 21 22 " +
      "c 0 15 -12.5 26 -28 26 " +
      "c -18 0 -32 -14.5 -36 -32 " +
      "c -2.5 -11 -4 -22 -5 -32 " +
      "c -0.5 -5 -1 -9 -1.5 -12 " +
      "l 10 4 " +
      "l -10 -4 " +
      "l 4 10",
  },
};

const easeLux = [0.22, 1, 0.36, 1] as const;

type Token =
  | { kind: "br"; key: string }
  | { kind: "word"; key: string; label: string; index: number };

function SpiralMark({
  dir,
  playId,
  active,
  reduce,
}: {
  dir: ArrowDir;
  playId: number;
  active: boolean;
  reduce: boolean | null;
}) {
  const spiral = spirals[dir];
  const gradId = `hand-spiral-${dir}-${playId}`;

  return (
    <div className={`relative h-[78px] w-[88px] shrink-0 ${spiral.align}`}>
      <svg
        viewBox={spiral.viewBox}
        className="h-full w-full overflow-visible"
        fill="none"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="50%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>

        {/* Soft bloom — same path */}
        <motion.path
          d={spiral.d}
          stroke={`url(#${gradId})`}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.18}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: active ? 1 : 0 }}
          transition={{
            duration: reduce ? 0 : 1.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        />

        {/* Single continuous ink: spiral + attached tip */}
        <motion.path
          d={spiral.d}
          stroke={`url(#${gradId})`}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: active ? 1 : 0 }}
          transition={{
            duration: reduce ? 0 : 1.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
        />
      </svg>
    </div>
  );
}

/**
 * Hand-note callout: ink-like word reveal + continuous spiral arrow.
 * Plays a few times on scroll-into-view, then stays hidden.
 */
export function HandNote({
  text,
  className = "",
  rotate = -6,
  arrow = "se",
  delayMs = 0,
  maxPlays = 3,
}: Props) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.15, margin: "-60px" });
  const inViewRef = useRef(inView);
  inViewRef.current = inView;

  const [visible, setVisible] = useState(false);
  const [playId, setPlayId] = useState(0);
  const [arrowOn, setArrowOn] = useState(false);
  const playsRef = useRef(0);
  const timersRef = useRef<number[]>([]);
  const runningRef = useRef(false);

  const tokens = useMemo(() => {
    const out: Token[] = [];
    let wordIndex = 0;
    text.split(/(\n)/).forEach((chunk, ci) => {
      if (chunk === "\n") {
        out.push({ kind: "br", key: `br-${ci}` });
        return;
      }
      chunk
        .split(/\s+/)
        .filter(Boolean)
        .forEach((word, wi) => {
          out.push({
            kind: "word",
            key: `w-${ci}-${wi}`,
            label: word,
            index: wordIndex++,
          });
        });
    });
    return out;
  }, [text]);

  const wordCount = tokens.filter((t) => t.kind === "word").length;
  const textDurationMs = reduce ? 0 : 220 + wordCount * 95;
  const arrowDurationMs = reduce ? 0 : 1550;
  const holdMs = 2800;
  const gapMs = 900;

  function clearTimers() {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }

  function schedule(fn: () => void, ms: number) {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  }

  useEffect(() => {
    if (!inView || playsRef.current >= maxPlays || runningRef.current) return;

    let cancelled = false;

    function runCycle() {
      if (cancelled || playsRef.current >= maxPlays) {
        runningRef.current = false;
        return;
      }

      runningRef.current = true;
      playsRef.current += 1;
      setArrowOn(false);
      setPlayId(playsRef.current);
      setVisible(true);

      const startDelay = playsRef.current === 1 ? delayMs : 400;

      schedule(() => {
        if (cancelled) return;

        schedule(() => {
          if (cancelled) return;
          setArrowOn(true);

          schedule(() => {
            if (cancelled) return;
            setVisible(false);

            schedule(() => {
              if (cancelled) return;
              if (playsRef.current < maxPlays && inViewRef.current) {
                runCycle();
              } else {
                runningRef.current = false;
              }
            }, gapMs);
          }, arrowDurationMs + holdMs);
        }, textDurationMs + 320);
      }, startDelay);
    }

    runCycle();

    return () => {
      cancelled = true;
      clearTimers();
      runningRef.current = false;
    };
  }, [
    inView,
    delayMs,
    maxPlays,
    textDurationMs,
    arrowDurationMs,
    holdMs,
    gapMs,
  ]);

  const spiral = spirals[arrow];
  const textAlign = className.includes("text-right") ? "text-right" : "text-left";

  const copy = (
    <p
      className={`text-[12.5px] font-semibold leading-[1.35] text-[#3b82f6] ${textAlign}`}
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {tokens.map((token) => {
        if (token.kind === "br") {
          return <br key={token.key} />;
        }
        return (
          <motion.span
            key={`${playId}-${token.key}`}
            className="mr-[0.28em] inline-block will-change-transform"
            initial={
              reduce
                ? false
                : {
                    opacity: 0,
                    y: 14,
                    filter: "blur(8px)",
                    scale: 0.86,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              scale: 1,
            }}
            transition={{
              duration: 0.6,
              delay: reduce ? 0 : 0.08 + token.index * 0.09,
              ease: easeLux,
            }}
          >
            {token.label}
          </motion.span>
        );
      })}
    </p>
  );

  const mark = (
    <SpiralMark
      dir={arrow}
      playId={playId}
      active={arrowOn}
      reduce={reduce}
    />
  );

  return (
    <div
      ref={rootRef}
      className={`pointer-events-none absolute z-20 hidden w-[150px] select-none xl:block ${className}`}
      aria-hidden
    >
      <AnimatePresence mode="wait">
        {visible ? (
          <motion.div
            key={`note-${playId}`}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              filter: "blur(4px)",
              transition: { duration: 0.55, ease: easeLux },
            }}
            transition={{ duration: 0.45, ease: easeLux }}
          >
            <div
              style={{ transform: `rotate(${rotate}deg)` }}
              className="origin-center"
            >
              {spiral.arrowBefore ? (
                <div className="flex flex-col items-end gap-0.5">
                  {mark}
                  {copy}
                </div>
              ) : (
                <div className="flex flex-col gap-0.5">
                  {copy}
                  {mark}
                </div>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

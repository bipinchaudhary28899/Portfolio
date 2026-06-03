"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

export interface Diagram {
  src: string;
  title: string;
  caption: string;
}

interface Props {
  diagrams: Diagram[];
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.5;

export function ArchitectureCarousel({ diagrams }: Props) {
  const [idx, setIdx] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const lastPoint = useRef({ x: 0, y: 0 });

  if (!diagrams || diagrams.length === 0) return null;

  const total = diagrams.length;
  const current = diagrams[idx];

  const resetView = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const go = (dir: 1 | -1) => {
    setIdx((i) => (i + dir + total) % total);
    resetView();
  };

  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, +(z + ZOOM_STEP).toFixed(2)));
  const zoomOut = () =>
    setZoom((z) => {
      const next = Math.max(MIN_ZOOM, +(z - ZOOM_STEP).toFixed(2));
      if (next === MIN_ZOOM) setOffset({ x: 0, y: 0 });
      return next;
    });

  /* ── Drag-to-pan (only meaningful when zoomed) ── */
  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom === 1) return;
    setIsDragging(true);
    lastPoint.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPoint.current.x;
    const dy = e.clientY - lastPoint.current.y;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* no-op */
    }
  };

  const iconBtn: React.CSSProperties = {
    border: "1px solid var(--border)",
    color: "var(--fg)",
    background: "var(--bg)",
  };

  return (
    <div className="mb-2">
      {/* Section header + counter */}
      <div className="flex items-center justify-between mb-4">
        <p
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: "var(--accent)" }}
        >
          Architecture
        </p>
        <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
          {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Title + caption for the current diagram */}
      <p className="text-sm font-bold mb-1" style={{ color: "var(--fg)" }}>
        {current.title}
      </p>
      <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--fg-dim)" }}>
        {current.caption}
      </p>

      {/* Stage */}
      <div
        className="relative rounded-2xl overflow-hidden select-none"
        style={{ border: "1.5px solid var(--border)", background: "#ffffff" }}
      >
        {/* Fixed-size frame so every diagram shows at the same size */}
        <div
          className="relative w-full h-[300px] sm:h-[440px] flex items-center justify-center"
          style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default", touchAction: "none" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <div
            className="relative w-full h-full"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
              transition: isDragging ? "none" : "transform 0.18s ease-out",
            }}
          >
            <Image
              src={current.src}
              alt={current.title}
              fill
              draggable={false}
              sizes="(max-width: 768px) 100vw, 720px"
              style={{ objectFit: "contain", padding: "12px" }}
            />
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          aria-label="Previous diagram"
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all hover:scale-110"
          style={iconBtn}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          aria-label="Next diagram"
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all hover:scale-110"
          style={iconBtn}
        >
          <ChevronRight size={18} />
        </button>

        {/* Zoom controls */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5">
          <button
            aria-label="Zoom out"
            onClick={zoomOut}
            disabled={zoom <= MIN_ZOOM}
            className="p-1.5 rounded-lg transition-all hover:scale-110 disabled:opacity-40 disabled:hover:scale-100"
            style={iconBtn}
          >
            <ZoomOut size={15} />
          </button>
          <span
            className="font-mono text-xs px-1 min-w-[34px] text-center"
            style={{ color: "var(--muted)" }}
          >
            {Math.round(zoom * 100)}%
          </span>
          <button
            aria-label="Zoom in"
            onClick={zoomIn}
            disabled={zoom >= MAX_ZOOM}
            className="p-1.5 rounded-lg transition-all hover:scale-110 disabled:opacity-40 disabled:hover:scale-100"
            style={iconBtn}
          >
            <ZoomIn size={15} />
          </button>
          <button
            aria-label="Reset zoom"
            onClick={resetView}
            disabled={zoom === 1 && offset.x === 0 && offset.y === 0}
            className="p-1.5 rounded-lg transition-all hover:scale-110 disabled:opacity-40 disabled:hover:scale-100"
            style={iconBtn}
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-3 flex-wrap">
        {diagrams.map((d, i) => (
          <button
            key={d.src}
            aria-label={`Go to diagram ${i + 1}`}
            onClick={() => {
              setIdx(i);
              resetView();
            }}
            className="rounded-full transition-all"
            style={{
              width: i === idx ? 18 : 7,
              height: 7,
              background: i === idx ? "var(--accent)" : "var(--border)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

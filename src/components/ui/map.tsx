"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

interface RouteData {
  start: { lat: number; lng: number; label?: string };
  end: { lat: number; lng: number; label?: string };
}

interface MapProps {
  dots?: RouteData[];
  lineColor?: string;
}

interface ArcData {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
}

interface LabelData {
  lat: number;
  lng: number;
  label: string;
  size: number;
  isDestination: boolean;
}

interface RingData {
  lat: number;
  lng: number;
  maxR: number;
  propagationSpeed: number;
  repeatPeriod: number;
}

export function WorldMap({
  dots = [],
  lineColor = "#12B5CB",
}: MapProps) {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isMobile = window.innerWidth < 1024;
        // On mobile: cap to 320px; on desktop: cap to 700px
        const maxSize = isMobile ? 320 : 700;
        const minSize = isMobile ? 280 : 500;
        const size = Math.min(rect.width, maxSize);
        setDimensions({ width: rect.width, height: Math.max(size, minSize) });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      // Focus on South/Central Asia — zoomed in
      globeRef.current.pointOfView({ lat: 26, lng: 70, altitude: 1.5 }, 1000);

      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.4;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.minPolarAngle = Math.PI * 0.2;
        controls.maxPolarAngle = Math.PI * 0.8;
      }
    }
  }, [isClient]);

  const arcsData: ArcData[] = dots.map((route) => ({
    startLat: route.start.lat,
    startLng: route.start.lng,
    endLat: route.end.lat,
    endLng: route.end.lng,
  }));

  const labelsData: LabelData[] = [];
  const seenLabels = new Set<string>();
  dots.forEach((route) => {
    if (route.start.label && !seenLabels.has(route.start.label)) {
      seenLabels.add(route.start.label);
      labelsData.push({ lat: route.start.lat, lng: route.start.lng, label: route.start.label, size: 0.8, isDestination: false });
    }
    if (route.end.label && !seenLabels.has(route.end.label)) {
      seenLabels.add(route.end.label);
      labelsData.push({ lat: route.end.lat, lng: route.end.lng, label: route.end.label, size: 1.2, isDestination: true });
    }
  });

  const ringsData: RingData[] = dots.length > 0
    ? [{ lat: dots[0].end.lat, lng: dots[0].end.lng, maxR: 4, propagationSpeed: 2, repeatPeriod: 1200 }]
    : [];

  const pointsData = labelsData.map((l) => ({
    lat: l.lat, lng: l.lng,
    size: l.isDestination ? 0.12 : 0.06,
    color: l.isDestination ? "#00355D" : lineColor,
  }));

  const labelRenderer = useCallback((d: object) => {
    const data = d as LabelData;
    const el = document.createElement("div");
    el.style.pointerEvents = "none";
    el.innerHTML = `
      <div style="
        font-family: 'Inter', system-ui, sans-serif;
        font-size: ${data.isDestination ? "13px" : "11px"};
        font-weight: ${data.isDestination ? "700" : "600"};
        color: ${data.isDestination ? "#fff" : "#00355D"};
        background: ${data.isDestination ? "#00355D" : "rgba(255,255,255,0.92)"};
        backdrop-filter: blur(8px);
        padding: ${data.isDestination ? "6px 14px" : "4px 10px"};
        border-radius: 8px;
        border: 1px solid ${data.isDestination ? "rgba(18,181,203,0.5)" : "rgba(0,53,93,0.12)"};
        white-space: nowrap;
        pointer-events: none;
        box-shadow: ${data.isDestination ? "0 2px 16px rgba(18,181,203,0.25)" : "0 2px 8px rgba(0,0,0,0.08)"};
      ">${data.label}</div>
    `;
    return el;
  }, []);

  // Block all globe clicks — prevent navigation
  const handleGlobeClick = useCallback(() => {
    // intentionally empty — no navigation
  }, []);

  if (!isClient) {
    return (
      <div ref={containerRef} className="w-full flex items-center justify-center bg-white" style={{ height: "600px" }}>
        <div className="text-[#575B5F] text-sm font-['Inter'] animate-pulse">Loading globe…</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-visible bg-transparent cursor-grab active:cursor-grabbing z-10"
      style={{ 
        height: `${dimensions.height}px`,
        WebkitMaskImage: "radial-gradient(circle at center, black 70%, transparent 100%)",
        maskImage: "radial-gradient(circle at center, black 70%, transparent 100%)"
      }}
    >
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        atmosphereColor="#87CEEB"
        atmosphereAltitude={0.18}

        // Block navigation on click
        onGlobeClick={handleGlobeClick}

        // Arcs
        arcsData={arcsData}
        arcStartLat={(d: object) => (d as ArcData).startLat}
        arcStartLng={(d: object) => (d as ArcData).startLng}
        arcEndLat={(d: object) => (d as ArcData).endLat}
        arcEndLng={(d: object) => (d as ArcData).endLng}
        arcColor={() => lineColor}
        arcAltitude={0.12}
        arcStroke={0.6}
        arcDashLength={0.5}
        arcDashGap={0.25}
        arcDashAnimateTime={2000}

        // Points
        pointsData={pointsData}
        pointAltitude={(d: object) => (d as { size: number }).size}
        pointRadius={(d: object) => (d as { size: number }).size * 6}
        pointColor={(d: object) => (d as { color: string }).color}

        // Labels (hidden text, using HTML instead)
        labelsData={labelsData}
        labelLat={(d: object) => (d as LabelData).lat}
        labelLng={(d: object) => (d as LabelData).lng}
        labelText={(d: object) => (d as LabelData).label}
        labelSize={(d: object) => (d as LabelData).size}
        labelColor={() => "rgba(0,0,0,0)"}
        labelDotRadius={0}
        labelAltitude={0.01}
        htmlElementsData={labelsData}
        htmlElement={labelRenderer}
        htmlAltitude={0.02}

        // Rings
        ringsData={ringsData}
        ringLat={(d: object) => (d as RingData).lat}
        ringLng={(d: object) => (d as RingData).lng}
        ringMaxRadius={(d: object) => (d as RingData).maxR}
        ringPropagationSpeed={(d: object) => (d as RingData).propagationSpeed}
        ringRepeatPeriod={(d: object) => (d as RingData).repeatPeriod}
        ringColor={() => (t: number) => `rgba(18, 181, 203, ${1 - t})`}

        animateIn={true}
      />
    </div>
  );
}

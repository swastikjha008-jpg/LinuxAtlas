/**
 * GlobalAtmosphere — the single cinematic environment behind every page.
 *
 * Fully vector/gradient-built (no external image asset), so it ships fast,
 * needs no licensing, and scales crisp at any viewport. Layers, back to front:
 * 1. sky gradient (deep navy -> warm ember near the horizon)
 * 2. cyan/blue atmospheric fog
 * 3. warm cloud glow near the horizon
 * 4. silhouetted mountains/cliffs (near + far, for depth)
 * 5. distant fantasy spires — LinuxAtlas's signature skyline
 * 6. grain + vignette for readability
 *
 * `docs` mode raises the dark overlay so long-form reading stays comfortable.
 */
export function GlobalAtmosphere({ docs = false }: { docs?: boolean }) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#040810]">
      {/* sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #040810 0%, #071a2c 24%, #0c2e45 42%, #1a3f52 58%, #4a4430 74%, #241a10 92%, #17100a 100%)",
        }}
      />

      {/* warm horizon glow (the "clouds" from the reference) */}
      <div
        className="absolute inset-x-0 bottom-[22%] h-[46%]"
        style={{
          background:
            "radial-gradient(ellipse 75% 100% at 55% 100%, rgba(255,150,90,0.42), rgba(255,138,76,0.16) 40%, transparent 72%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-[30%] h-[30%]"
        style={{
          background:
            "radial-gradient(ellipse 55% 90% at 30% 100%, rgba(255,180,120,0.22), transparent 65%)",
        }}
      />

      {/* cyan atmosphere, upper + left drift */}
      <div
        className="absolute inset-x-0 top-0 h-[60%]"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 15% 15%, rgba(76,201,240,0.24), transparent 65%), radial-gradient(ellipse 45% 45% at 90% 5%, rgba(94,234,212,0.14), transparent 60%)",
        }}
      />

      {/* distant spires — signature skyline */}
      <svg
        className="absolute inset-x-0 bottom-[26%] h-[24%] w-full opacity-70"
        viewBox="0 0 1600 260"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <g fill="#0a1420">
          <path d="M1180 260 V150 l10-22 6 14 4-20 8 18 4-16 10 24 V260Z" />
          <path d="M1230 260 V190 l14-30 8 18 6-26 12 22 6-14 14 28 V260Z" />
          <path d="M1300 260 V210 l8-16 6 10 8-20 6 14 V260Z" />
          <path d="M1120 260 V220 l6-12 8 10 6-18 8 16 V260Z" />
        </g>
      </svg>

      {/* mountain layer far */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[46%] w-full"
        viewBox="0 0 1600 400"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <path
          d="M0 400 L0 260 L160 190 L320 250 L460 150 L620 230 L780 120 L950 220 L1100 160 L1260 240 L1420 170 L1600 260 L1600 400 Z"
          fill="#0e2432"
          opacity="0.92"
        />
      </svg>

      {/* mountain layer near */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[32%] w-full"
        viewBox="0 0 1600 300"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <path
          d="M0 300 L0 200 L140 240 L300 140 L480 220 L640 100 L820 210 L1000 130 L1180 220 L1360 150 L1600 230 L1600 300 Z"
          fill="#050d14"
        />
      </svg>

      {/* soft cyan fog band across the mountain line */}
      <div
        className="absolute inset-x-0 bottom-[24%] h-28"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(94,234,212,0.14) 45%, transparent)",
          filter: "blur(8px)",
        }}
      />

      {/* grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.04] mix-blend-overlay" aria-hidden="true">
        <filter id="atmosphere-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#atmosphere-noise)" />
      </svg>

      {/* readability overlay (stronger on docs pages) */}
      <div
        className="absolute inset-0"
        style={{
          background: docs
            ? "linear-gradient(180deg, rgba(4,7,12,0.68) 0%, rgba(4,7,12,0.86) 100%)"
            : "radial-gradient(ellipse 90% 65% at 50% 22%, transparent 35%, rgba(4,7,12,0.4) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#040810] to-transparent" />
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#040810]/60 to-transparent" />
    </div>
  );
}

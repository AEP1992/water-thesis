/* ==========================================================
   ACT III · CHAPTER 8 — "IN THE BASEMENT"
   Hand-composed inline SVG basement scene + scenario player.
   Requires: basement-scenarios.js
   ========================================================== */
(() => {
  const host = document.getElementById("basement");
  if (!host || typeof BASEMENT_SCENARIOS === "undefined") return;

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

  /* ---------------------------------------------------------
     1 · THE SCENE — inline SVG, hand-composed
     --------------------------------------------------------- */

  // framing studs behind the wet wall
  let studs = "";
  for (let x = 235; x < 1340; x += 118) {
    studs += `<rect x="${x}" y="92" width="17" height="568" fill="#C77D3B" opacity=".42"/>
              <rect x="${x + 13}" y="92" width="4" height="568" fill="#96581F" opacity=".3"/>`;
  }
  studs += `<rect x="200" y="150" width="1160" height="15" fill="#C77D3B" opacity=".34"/>`;

  // overhead joists
  let joists = "";
  for (let x = 120; x < 1600; x += 92) {
    joists += `<rect x="${x}" y="0" width="26" height="92" fill="#C77D3B" opacity=".33"/>`;
  }

  // duct ribs
  let ribs = "";
  for (let x = 250; x < 1230; x += 62) ribs += `<rect x="${x}" y="20" width="7" height="52" fill="#39414C" opacity=".55"/>`;

  // floor perspective seams
  let seams = "";
  for (let i = 1; i <= 4; i++) {
    const y = 660 + i * i * 11;
    seams += `<path d="M0 ${y} H1600" stroke="#B9B2A2" stroke-width="1.4" opacity=".55"/>`;
  }
  seams += `<path d="M560 660 L470 900" stroke="#B9B2A2" stroke-width="1.4" opacity=".45"/>
            <path d="M1030 660 L1160 900" stroke="#B9B2A2" stroke-width="1.4" opacity=".45"/>`;

  // concrete speckle (deterministic pseudo-random)
  let speckle = "";
  let s = 7;
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < 210; i++) {
    const x = (rnd() * 1600).toFixed(0), y = (660 + rnd() * 240).toFixed(0), r = (0.7 + rnd() * 1.8).toFixed(1);
    speckle += `<circle cx="${x}" cy="${y}" r="${r}" fill="#A79E8B" opacity=".38"/>`;
  }
  for (let i = 0; i < 130; i++) {
    const x = (rnd() * 1600).toFixed(0), y = (95 + rnd() * 560).toFixed(0), r = (0.7 + rnd() * 1.6).toFixed(1);
    speckle += `<circle cx="${x}" cy="${y}" r="${r}" fill="#9A9282" opacity=".3"/>`;
  }

  // Ryan — articulated figure. Origin = between the boots, y grows down.
  // Limbs are round-capped strokes so joints bend naturally; jacket, cap and
  // boots are layered fills. Faces +x; poses flip with scale(-1,1).
  const ryanFigure = (idPrefix) => `
    <g class="ry-legs ry-legs-stand" id="${idPrefix}LegsStand">
      <path d="M-10 -100 Q-13 -58 -14 -22" stroke="#16202C" stroke-width="17" fill="none" stroke-linecap="round"/>
      <path d="M11 -100 Q12 -56 12 -22" stroke="#243348" stroke-width="17" fill="none" stroke-linecap="round"/>
      <path d="M-22 -31 l16 -1" stroke="#101820" stroke-width="3.5" opacity=".55"/>
      <path d="M4 -30 h16" stroke="#101820" stroke-width="3.5" opacity=".55"/>
      <path d="M-22 -24 l14 -1 1.5 9 4.5 3 q4.5 3 -.5 5.5 l-18 0 q-4.5 0 -4 -5.5z" fill="#33200F" stroke="#241509" stroke-width="1.2"/>
      <path d="M-25.5 -7 h22" stroke="#1A0F06" stroke-width="3.4" stroke-linecap="round"/>
      <path d="M4 -24 h14 l1.5 8 7.5 4.5 q5 3 -1 5.5 l-20 0 q-4.5 0 -4 -5.5z" fill="#3E2713" stroke="#241509" stroke-width="1.2"/>
      <path d="M1.5 -7 h26" stroke="#1A0F06" stroke-width="3.4" stroke-linecap="round"/>
    </g>
    <g class="ry-legs ry-legs-kneel" id="${idPrefix}LegsKneel" style="display:none">
      <path d="M-3 -60 Q-9 -38 -13 -18" stroke="#16202C" stroke-width="17" fill="none" stroke-linecap="round"/>
      <path d="M-13 -14 L-35 -12" stroke="#16202C" stroke-width="15" fill="none" stroke-linecap="round"/>
      <path d="M-48 -22 l11 -5 6.5 9.5 -9 7 q-5.5 3 -8 -2z" fill="#33200F" stroke="#241509" stroke-width="1.2"/>
      <circle cx="-13" cy="-15" r="8.6" fill="#101820" opacity=".85"/>
      <path d="M3 -62 Q17 -52 24 -40" stroke="#243348" stroke-width="17" fill="none" stroke-linecap="round"/>
      <path d="M24 -40 Q25 -28 25 -18" stroke="#243348" stroke-width="16" fill="none" stroke-linecap="round"/>
      <path d="M17 -24 h14 l1.5 8 7.5 4.5 q5 3 -1 5.5 l-20 0 q-4.5 0 -4 -5.5z" fill="#3E2713" stroke="#241509" stroke-width="1.2"/>
      <path d="M14.5 -7 h26" stroke="#1A0F06" stroke-width="3.4" stroke-linecap="round"/>
    </g>
    <g class="ry-legs ry-legs-squat" id="${idPrefix}LegsSquat" style="display:none">
      <path d="M-4 -46 Q6 -38 13 -32 Q13 -22 12 -16" stroke="#16202C" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4 -50 Q19 -42 26 -34 Q27 -24 26 -16" stroke="#243348" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="14" cy="-33" r="7" fill="#101820" opacity=".5"/>
      <path d="M-4 -22 h13 l1.5 7 5 3.5 q4.5 3 -.5 5.5 l-16 0 q-4.5 0 -4 -5.5z" fill="#33200F" stroke="#241509" stroke-width="1.2"/>
      <path d="M-7 -6 h21" stroke="#1A0F06" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M19 -22 h13 l1.5 7 6.5 4 q5 3 -1 5.5 l-18 0 q-4.5 0 -4 -5.5z" fill="#3E2713" stroke="#241509" stroke-width="1.2"/>
      <path d="M16.5 -6 h25" stroke="#1A0F06" stroke-width="3.2" stroke-linecap="round"/>
    </g>

    <g class="ry-upper" id="${idPrefix}Upper">
      <!-- back arm -->
      <g class="ry-arm-b" id="${idPrefix}ArmB" transform="translate(-22,-172)">
        <circle cx="0" cy="4" r="8.5" fill="#1A47B0"/>
        <path d="M0 5 Q4 38 4 66" stroke="#1A47B0" stroke-width="14.5" fill="none" stroke-linecap="round"/>
        <path d="M-3 59 l14 -1.5" stroke="#123577" stroke-width="4"/>
        <circle cx="4" cy="72" r="7" fill="#C2905F" stroke="#A87A50" stroke-width="1.2"/>
      </g>
      <!-- torso: work jacket -->
      <path d="M-24 -176 C-30 -175 -32 -170 -32 -163 L-34 -138 -29 -102 29 -102 34 -138 32 -163 C32 -170 30 -175 24 -176 Z"
            fill="#2563EB" stroke="#1B4ACB" stroke-width="1.6"/>
      <path d="M10 -175 C24 -175 31 -170 31.5 -162 L33 -138 28.5 -103 12 -103 Z" fill="#1B4ACB" opacity=".45"/>
      <path d="M-24 -176 h48 l2.5 9 h-53z" fill="#1B4ACB"/>
      <path d="M-33.5 -134 h67" stroke="#F2B233" stroke-width="5" opacity=".85"/>
      <path d="M0 -167 L1 -102" stroke="#153A96" stroke-width="2.4"/>
      <path d="M-10 -176 l10 9 10 -9" fill="none" stroke="#153A96" stroke-width="2.2"/>
      <rect x="9" y="-158" width="15" height="13" rx="1.5" fill="#1D50BE" stroke="#153A96" stroke-width="1.2"/>
      <path d="M9 -158 h15 l-1 4 h-13z" fill="#153A96"/>
      <rect x="-24" y="-160" width="10" height="15" rx="2" fill="#2C3947"/>
      <path d="M-19 -160 v-6" stroke="#2C3947" stroke-width="2"/>
      <circle cx="-19" cy="-152" r="1.6" fill="#7DD3FC"/>
      <!-- belt -->
      <path d="M-29 -108 h58 v8.5 h-58z" fill="#1B2532"/>
      <rect x="-5" y="-107" width="10" height="6.5" rx="1" fill="#C9A25A"/>
      <path d="M15 -99 h15 v12 q0 4 -4 4 h-7 q-4 0 -4 -4z" fill="#6B4A2B" stroke="#523620" stroke-width="1.2"/>
      <!-- neck + head -->
      <path d="M-6.5 -192 h13 v15 h-13z" fill="#BE8A5E"/>
      <g class="ry-head" id="${idPrefix}Head">
        <path d="M-15 -204 a15 16 0 0 1 30 0 c0 11 -6.5 19 -15 19 s-15 -8 -15 -19z" fill="#D4A47A"/>
        <path d="M7 -206 c2 11 -2 18 -7 21 c9 -1 15 -9 15 -19 a15 16 0 0 0 -5 -13z" fill="#BE8A5E" opacity=".75"/>
        <circle cx="-11.5" cy="-198" r="3.6" fill="#C79268"/>
        <path d="M-16.5 -205 a16.5 14.5 0 0 1 33 0 l.3 3.8 h-33.6z" fill="#22303F"/>
        <path d="M2 -205 h19.5 q5.5 .3 4.7 4 l-.5 1.4 h-24z" fill="#141C26"/>
        <path d="M-16.4 -201.6 h33.2" stroke="#141C26" stroke-width="2"/>
        <circle cx="0" cy="-217" r="1.7" fill="#C77D3B"/>
        <path d="M4 -199.5 h6.5" stroke="#7A5636" stroke-width="1.4" stroke-linecap="round"/>
        <circle cx="8.5" cy="-196.5" r="1.7" fill="#1B2532"/>
        <path d="M13.2 -195 q2.4 2.6 0 4.6" stroke="#B4835A" stroke-width="1.4" fill="none"/>
        <path d="M4 -189 q4 2.6 8 .6" stroke="#A87A50" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      </g>
      <!-- front arm (carries the tool) -->
      <g class="ry-arm-f" id="${idPrefix}ArmF" transform="translate(22,-172)">
        <circle cx="0" cy="4" r="9" fill="#2E6EF0"/>
        <path d="M0 5 Q4 38 2 66" stroke="#2E6EF0" stroke-width="15" fill="none" stroke-linecap="round"/>
        <path d="M-5 59 l14 -1.5" stroke="#1B4ACB" stroke-width="4"/>
        <circle cx="2" cy="72" r="7.5" fill="#D4A47A" stroke="#B4835A" stroke-width="1.2"/>
        <circle cx="7.5" cy="69" r="3" fill="#D4A47A"/>
        <g class="ry-tool" id="${idPrefix}Tool" transform="translate(1,78)"></g>
      </g>
    </g>`;

  // tool shapes, drawn at the wrist (0,0), pointing down-forward
  const TOOL_ART = {
    none: "",
    clipboard: `<g><rect x="-13" y="-4" width="30" height="40" rx="2" fill="#B98A54"/><rect x="-9" y="0" width="22" height="32" fill="#F5F0E4"/><rect x="-4" y="-7" width="12" height="7" rx="2" fill="#4A5568"/><path d="M-6 8h16M-6 15h16M-6 22h10" stroke="#8E9AA8" stroke-width="1.4"/></g>`,
    tablet: `<g><rect x="-16" y="-3" width="34" height="26" rx="3" fill="#2C3947"/><rect x="-13" y="0" width="28" height="20" rx="1" fill="#7DD3FC" opacity=".85"/><path d="M-10 5h20M-10 10h14M-10 15h17" stroke="#1B2532" stroke-width="1.3" opacity=".5"/></g>`,
    test_kit: `<g><rect x="-18" y="0" width="40" height="27" rx="3" fill="#1D50BE"/><rect x="-18" y="-12" width="40" height="13" rx="2" fill="#2563EB"/><rect x="-13" y="4" width="8" height="19" fill="#EBE5D9"/><rect x="-2" y="4" width="8" height="19" fill="#C77D3B"/><rect x="9" y="4" width="8" height="19" fill="#059669"/></g>`,
    strips: `<g><rect x="-3" y="0" width="7" height="34" rx="1" fill="#F5F0E4"/><rect x="-3" y="26" width="7" height="8" fill="#C77D3B"/><rect x="8" y="2" width="14" height="18" rx="2" fill="#2C3947"/><rect x="10" y="5" width="10" height="7" fill="#7DD3FC"/></g>`,
    gauge: `<g><circle cx="0" cy="12" r="14" fill="#EBE5D9" stroke="#4A5568" stroke-width="3"/><path d="M0 12l8-7" stroke="#B91C1C" stroke-width="2.2"/><rect x="-3" y="26" width="6" height="12" fill="#4A5568"/></g>`,
    flashlight: `<g><rect x="-5" y="0" width="11" height="30" rx="3" fill="#2C3947"/><path d="M-8 28h17l-2 8H-6z" fill="#4A5568"/><path d="M-6 36h13l16 46H-20z" fill="#FDF3C8" opacity=".5"/></g>`,
    multimeter: `<g><rect x="-14" y="0" width="30" height="34" rx="3" fill="#C77D3B"/><rect x="-10" y="4" width="22" height="12" rx="1" fill="#1B2532"/><path d="M2 34c9 9 14 15 12 24" stroke="#B91C1C" stroke-width="2" fill="none"/><path d="M-4 34c-8 10-11 16-9 24" stroke="#1B2532" stroke-width="2" fill="none"/></g>`,
    clamp: `<g><rect x="-12" y="6" width="26" height="28" rx="3" fill="#F2B233"/><rect x="-8" y="10" width="18" height="10" fill="#1B2532"/><path d="M-8 6a14 14 0 1 1 20 0" stroke="#1B2532" stroke-width="4" fill="none"/></g>`,
    screwdriver: `<g><rect x="-5" y="0" width="11" height="20" rx="4" fill="#B91C1C"/><rect x="-2" y="18" width="5" height="28" fill="#9AA7B4"/><path d="M-3 44h7v6h-7z" fill="#6B7684"/></g>`,
    wrench: `<g><path d="M-4 0h9v40h-9z" fill="#6B7684"/><path d="M-11 36h23l-4 14h-15z" fill="#9AA7B4"/><circle cx="0" cy="-2" r="8" fill="none" stroke="#6B7684" stroke-width="5"/></g>`,
    pipe_wrench: `<g><path d="M-4 0h10v46H-4z" fill="#B91C1C"/><path d="M-14 0h30v12h-30z" fill="#6B7684"/><path d="M-14 12h13v10h-13z" fill="#9AA7B4"/></g>`,
    crimper: `<g><path d="M-6 0h12l6 22-8 6-10-4z" fill="#C77D3B"/><path d="M-8 26h9l-4 22h-8z" fill="#1B2532"/><path d="M4 28h9l6 20h-9z" fill="#1B2532"/></g>`,
    cutter: `<g><path d="M-5 0h11v18H-5z" fill="#2563EB"/><path d="M-10 16h22l-6 26h-10z" fill="#9AA7B4"/><path d="M-3 40h8v8h-8z" fill="#6B7684"/></g>`,
    filter_wrench: `<g><path d="M-14 4h28v9h-28z" fill="#2C3947"/><path d="M-16 0a16 12 0 1 1 32 0z" fill="none" stroke="#4A5568" stroke-width="5"/><rect x="-3" y="12" width="7" height="30" fill="#4A5568"/></g>`,
    gloves: `<g><path d="M-10 0h20l4 20-6 18h-16l-4-18z" fill="#F5F0E4"/><rect x="12" y="2" width="8" height="44" rx="4" fill="#9AA7B4"/><rect x="13" y="6" width="6" height="34" fill="#7DD3FC" opacity=".7"/></g>`,
    tape: `<g><rect x="-13" y="0" width="27" height="24" rx="4" fill="#F2B233"/><rect x="-9" y="4" width="19" height="12" rx="2" fill="#1B2532"/><path d="M0 24v22h26" stroke="#EBE5D9" stroke-width="4" fill="none"/></g>`,
    bottles: `<g><rect x="-14" y="4" width="12" height="30" rx="2" fill="#DCE7F0" opacity=".9"/><rect x="-14" y="0" width="12" height="6" fill="#B91C1C"/><rect x="2" y="4" width="12" height="30" rx="2" fill="#DCE7F0" opacity=".9"/><rect x="2" y="0" width="12" height="6" fill="#059669"/><rect x="-12" y="14" width="8" height="8" fill="#F5F0E4"/><rect x="4" y="14" width="8" height="8" fill="#F5F0E4"/></g>`,
    bucket: `<g><path d="M-16 6h32l-5 34h-22z" fill="#EBE5D9" stroke="#9AA7B4" stroke-width="2"/><path d="M-16 6a16 10 0 0 1 32 0" fill="none" stroke="#6B7684" stroke-width="3"/><path d="M-16 22h28" stroke="#2563EB" stroke-width="2" opacity=".6"/></g>`,
    phone: `<g><rect x="-9" y="0" width="20" height="34" rx="3" fill="#1B2532"/><rect x="-6" y="3" width="14" height="26" rx="1" fill="#7DD3FC" opacity=".8"/><circle cx="1" cy="-4" r="3" fill="#4A5568"/></g>`,
  };

  const sceneSVG = `
<svg id="bmtScene" class="bmt-svg" viewBox="0 0 1600 900" role="img"
     aria-label="Hand-drawn cutaway of a New Hampshire basement: pressure tank, pump control, water softener, brine tank, filter, UV unit, water heater and laundry sink along the wet wall, with a technician in the foreground.">
  <defs>
    <linearGradient id="bmtWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#DCD3C0"/><stop offset="1" stop-color="#BFB5A0"/>
    </linearGradient>
    <linearGradient id="bmtFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#B2AA97"/><stop offset=".28" stop-color="#C8C1B0"/><stop offset="1" stop-color="#E0DACC"/>
    </linearGradient>
    <radialGradient id="bmtVign" cx="50%" cy="42%" r="75%">
      <stop offset=".55" stop-color="#1B2532" stop-opacity="0"/><stop offset="1" stop-color="#1B2532" stop-opacity=".26"/>
    </radialGradient>
    <linearGradient id="bmtCone" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FFE3A8" stop-opacity=".42"/><stop offset="1" stop-color="#FFE3A8" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="bmtSky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3A5F7A"/><stop offset="1" stop-color="#9FB6C6"/>
    </linearGradient>
    <linearGradient id="bmtBeam" x1="0" y1="0" x2=".5" y2="1">
      <stop offset="0" stop-color="#FFE9BC" stop-opacity=".55"/><stop offset="1" stop-color="#FFE9BC" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="bmtTank" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#1E4C8A"/><stop offset=".35" stop-color="#3A76C4"/><stop offset="1" stop-color="#173C6E"/>
    </linearGradient>
    <linearGradient id="bmtSteel" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#3C4653"/><stop offset=".35" stop-color="#6B7684"/><stop offset="1" stop-color="#39424E"/>
    </linearGradient>
    <linearGradient id="bmtSteel2" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#6E7A88"/><stop offset=".35" stop-color="#AEB9C4"/><stop offset="1" stop-color="#636E7B"/>
    </linearGradient>
    <linearGradient id="bmtHeater" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#8A8E8B"/><stop offset=".35" stop-color="#CFD3CE"/><stop offset="1" stop-color="#838784"/>
    </linearGradient>
    <linearGradient id="bmtDoor" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#121A22"/><stop offset="1" stop-color="#2C3947"/>
    </linearGradient>
    <radialGradient id="bmtGlow" cx="50%" cy="45%" r="60%">
      <stop offset="0" stop-color="#FDF6DF" stop-opacity=".55"/><stop offset="1" stop-color="#FDF6DF" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- ================= SHELL ================= -->
  <g id="bmtShell">
    <rect width="1600" height="900" fill="url(#bmtWall)"/>
    <rect x="0" y="92" width="1600" height="568" fill="url(#bmtWall)"/>
    <g id="bmtStuds">${studs}</g>
    <path d="M0 660H1600V900H0z" fill="url(#bmtFloor)"/>
    <g>${seams}</g>
    <g>${speckle}</g>
    <path d="M0 652h1600v10H0z" fill="#9A9283" opacity=".5"/>

    <!-- ceiling: joists + ductwork -->
    <rect width="1600" height="92" fill="#776F60"/>
    <g>${joists}</g>
    <g id="bmtDuct">
      <rect x="190" y="18" width="1050" height="56" rx="10" fill="url(#bmtSteel)"/>
      <g>${ribs}</g>
      <path d="M1240 26h60l40 20v20h-100z" fill="#4A5568"/>
      <rect x="600" y="74" width="70" height="34" rx="6" fill="#4A5568"/>
      <rect x="606" y="100" width="58" height="9" rx="3" fill="#39414C"/>
    </g>
    <path d="M0 88h1600v8H0z" fill="#6E6A5F" opacity=".5"/>

    <!-- basement window with morning light -->
    <g id="bmtWindow">
      <rect x="612" y="122" width="184" height="112" rx="4" fill="#7C7565"/>
      <rect x="620" y="130" width="168" height="96" fill="url(#bmtSky)"/>
      <path d="M620 196c26-16 52-18 84-8s58 6 84-8v46H620z" fill="#4C6B57" opacity=".55"/>
      <rect x="700" y="130" width="7" height="96" fill="#7C7565"/>
      <rect x="620" y="176" width="168" height="6" fill="#7C7565"/>
      <rect x="612" y="122" width="184" height="112" rx="4" fill="none" stroke="#5F594C" stroke-width="4"/>
    </g>
    <path d="M620 234h172l260 426H366z" fill="url(#bmtBeam)"/>
    <ellipse cx="700" cy="700" rx="230" ry="52" fill="#FFE9BC" opacity=".24"/>

    <!-- hanging work lights -->
    <g id="bmtLamps">
      <g>
        <path d="M300 92v46" stroke="#39424E" stroke-width="4"/>
        <path d="M276 138h48l-8 18h-32z" fill="#39424E"/>
        <circle cx="300" cy="160" r="9" fill="#FFE9B0"/>
        <circle cx="300" cy="160" r="16" fill="#FFE3A8" opacity=".35"/>
        <path d="M283 158 L180 660 H420 L317 158z" fill="url(#bmtCone)"/>
        <ellipse cx="300" cy="668" rx="126" ry="22" fill="#FFE3A8" opacity=".18"/>
      </g>
      <g>
        <path d="M1010 92v42" stroke="#39424E" stroke-width="4"/>
        <path d="M986 134h48l-8 18h-32z" fill="#39424E"/>
        <circle cx="1010" cy="156" r="9" fill="#FFE9B0"/>
        <circle cx="1010" cy="156" r="16" fill="#FFE3A8" opacity=".35"/>
        <path d="M993 154 L880 660 H1140 L1027 154z" fill="url(#bmtCone)"/>
        <ellipse cx="1010" cy="668" rx="136" ry="22" fill="#FFE3A8" opacity=".18"/>
      </g>
    </g>
    <!-- contact shadows for vessels that lack their own -->
    <ellipse cx="862" cy="664" rx="46" ry="12" fill="#8F8877" opacity=".4"/>
    <ellipse cx="1386" cy="674" rx="88" ry="16" fill="#8F8877" opacity=".35"/>

    <!-- doorway to the stairs -->
    <g id="bmtDoorway">
      <rect x="56" y="240" width="152" height="420" fill="url(#bmtDoor)"/>
      <rect x="46" y="228" width="172" height="14" fill="#C77D3B" opacity=".5"/>
      <rect x="46" y="228" width="14" height="432" fill="#C77D3B" opacity=".45"/>
      <rect x="204" y="228" width="14" height="432" fill="#C77D3B" opacity=".45"/>
      <path d="M62 660h140l-14-46H76z" fill="#3E4B5A" opacity=".8"/>
      <path d="M70 560h126v10H70zM76 500h114v10H76zM82 442h102v10H82z" fill="#4A5568" opacity=".7"/>
      <ellipse cx="132" cy="430" rx="76" ry="150" fill="url(#bmtGlow)"/>
    </g>

    <!-- wet wall risers -->
    <g id="bmtPipes">
      <rect x="462" y="96" width="13" height="392" rx="4" fill="#B91C1C" opacity=".85"/>
      <rect x="484" y="96" width="13" height="392" rx="4" fill="#2563EB" opacity=".85"/>
      <path d="M468 488c0 28 14 40 46 40h34" stroke="#B91C1C" stroke-width="13" fill="none" stroke-linecap="round" opacity=".85"/>
      <path d="M490 488c0 44 22 60 66 60h30" stroke="#2563EB" stroke-width="13" fill="none" stroke-linecap="round" opacity=".85"/>
      <path d="M380 300h96" stroke="#2563EB" stroke-width="12" fill="none" opacity=".8"/>
      <path d="M900 300h130l0 34" stroke="#B91C1C" stroke-width="12" fill="none" opacity=".8"/>
      <path d="M660 262h380" stroke="#9AA7B4" stroke-width="10" opacity=".8"/>
      <g fill="#8E9AA8" opacity=".9">
        <rect x="456" y="240" width="25" height="12" rx="3"/><rect x="478" y="240" width="25" height="12" rx="3"/>
        <rect x="456" y="404" width="25" height="12" rx="3"/><rect x="478" y="404" width="25" height="12" rx="3"/>
      </g>
    </g>
  </g>

  <!-- ================= EQUIPMENT ================= -->
  <g id="bmtEquip">

    <!-- pump control box -->
    <g class="bmt-obj" id="obj-pump_control" data-obj="pump_control">
      <rect x="252" y="240" width="118" height="92" rx="6" fill="url(#bmtSteel)"/>
      <rect x="262" y="250" width="98" height="72" rx="4" fill="#39424E"/>
      <rect x="272" y="260" width="56" height="20" rx="2" fill="#7DD3FC" opacity=".55"/>
      <circle cx="344" cy="268" r="7" fill="#B91C1C"/>
      <circle cx="344" cy="292" r="7" fill="#059669"/>
      <path d="M272 296h56M272 306h40" stroke="#8E9AA8" stroke-width="3"/>
      <rect x="300" y="332" width="18" height="70" fill="#6B7684"/>
      <rect x="352" y="332" width="14" height="328" fill="#6B7684"/>
      <text x="311" y="234" class="bmt-tag" text-anchor="middle">PUMP CONTROL</text>
    </g>

    <!-- pressure tank -->
    <g class="bmt-obj" id="obj-pressure_tank" data-obj="pressure_tank">
      <ellipse cx="315" cy="668" rx="72" ry="16" fill="#8F8877" opacity=".45"/>
      <path d="M250 430c0-38 30-64 65-64s65 26 65 64v222c0 6-4 10-10 10H260c-6 0-10-4-10-10z" fill="url(#bmtTank)"/>
      <path d="M262 430c0-30 22-52 46-52-24 8-34 26-34 52v220h-12z" fill="#8FB6E6" opacity=".28"/>
      <rect x="252" y="470" width="126" height="26" fill="#153360" opacity=".5"/>
      <rect x="266" y="520" width="98" height="46" rx="4" fill="#EBE5D9" opacity=".9"/>
      <text x="315" y="551" class="bmt-plate" text-anchor="middle">AMTROL 40 GAL</text>
      <rect x="304" y="344" width="22" height="26" fill="#6B7684"/>
      <path d="M258 372h114" stroke="#4A5568" stroke-width="8"/>
      <g id="bmtGaugeGrp">
        <circle cx="392" cy="352" r="24" fill="#EBE5D9" stroke="#4A5568" stroke-width="5"/>
        <path d="M392 352l14-11" stroke="#B91C1C" stroke-width="3.4"/>
        <circle cx="392" cy="352" r="4" fill="#4A5568"/>
        <path d="M380 376h24v14h-24z" fill="#6B7684"/>
      </g>
      <path d="M372 366h20v10h-20z" fill="#6B7684"/>
      <rect x="240" y="646" width="150" height="16" rx="4" fill="#39424E"/>
      <text x="315" y="700" class="bmt-tag" text-anchor="middle">PRESSURE TANK</text>
    </g>

    <!-- softener: resin tank + control valve -->
    <g class="bmt-obj" id="obj-softener" data-obj="softener">
      <ellipse cx="576" cy="668" rx="66" ry="15" fill="#8F8877" opacity=".45"/>
      <path d="M520 372c0-30 25-46 56-46s56 16 56 46v280c0 6-4 8-10 8h-92c-6 0-10-2-10-8z" fill="url(#bmtSteel)"/>
      <path d="M530 372c0-24 18-38 38-40-18 8-26 20-26 40v288h-12z" fill="#CBD5E1" opacity=".25"/>
      <rect x="524" y="560" width="104" height="52" rx="4" fill="#EBE5D9" opacity=".88"/>
      <text x="576" y="583" class="bmt-plate" text-anchor="middle">1.5 CU FT RESIN</text>
      <text x="576" y="601" class="bmt-plate" text-anchor="middle">INSTALLED 1987</text>
      <text x="576" y="700" class="bmt-tag" text-anchor="middle">SOFTENER</text>
    </g>

    <g class="bmt-obj" id="obj-control_valve" data-obj="control_valve">
      <rect x="514" y="298" width="124" height="56" rx="8" fill="#4A5568"/>
      <rect x="522" y="286" width="108" height="16" rx="5" fill="#39424E"/>
      <rect x="530" y="308" width="52" height="26" rx="3" fill="#7DD3FC" opacity=".62"/>
      <path d="M536 320h40" stroke="#1B2532" stroke-width="3" opacity=".7"/>
      <circle cx="606" cy="314" r="8" fill="#C77D3B"/>
      <circle cx="606" cy="336" r="8" fill="#EBE5D9" opacity=".8"/>
      <path d="M638 322h34" stroke="#6B7684" stroke-width="11"/>
      <path d="M514 322h-26" stroke="#6B7684" stroke-width="11"/>
      <text x="576" y="276" class="bmt-tag" text-anchor="middle">CONTROL VALVE</text>
    </g>

    <!-- brine tank -->
    <g class="bmt-obj" id="obj-brine_tank" data-obj="brine_tank">
      <ellipse cx="706" cy="668" rx="58" ry="14" fill="#8F8877" opacity=".45"/>
      <path d="M654 476h104v176c0 6-4 8-10 8h-84c-6 0-10-2-10-8z" fill="#5E6875"/>
      <path d="M660 476h16v184h-16z" fill="#CBD5E1" opacity=".22"/>
      <ellipse cx="706" cy="476" rx="52" ry="13" fill="#79838F"/>
      <ellipse cx="706" cy="470" rx="40" ry="10" fill="#4A5568"/>
      <path d="M672 596h68l-4 56h-60z" fill="#EBE5D9" opacity=".55"/>
      <path d="M676 604h58" stroke="#F5F0E4" stroke-width="4" opacity=".8"/>
      <path d="M700 470c0-40-14-70-40-96" stroke="#6B7684" stroke-width="7" fill="none"/>
      <text x="706" y="700" class="bmt-tag" text-anchor="middle">BRINE TANK</text>
    </g>

    <!-- UV disinfection unit -->
    <g class="bmt-obj" id="obj-uv" data-obj="uv">
      <rect x="800" y="348" width="168" height="34" rx="17" fill="url(#bmtSteel2)"/>
      <rect x="812" y="356" width="144" height="7" rx="3" fill="#EBE5D9" opacity=".45"/>
      <rect x="960" y="352" width="26" height="26" rx="4" fill="#4A5568"/>
      <circle cx="973" cy="365" r="5" fill="#7DD3FC"/>
      <path d="M973 378c6 26 0 40-22 46" stroke="#1B2532" stroke-width="4" fill="none"/>
      <path d="M800 365h-24M968 340v-14" stroke="#6B7684" stroke-width="9"/>
      <text x="884" y="336" class="bmt-tag" text-anchor="middle">UV STERILIZER</text>
    </g>

    <!-- filter housing -->
    <g class="bmt-obj" id="obj-filter" data-obj="filter">
      <rect x="826" y="410" width="72" height="26" rx="5" fill="#4A5568"/>
      <path d="M834 436h56l-5 116c0 6-4 8-10 8h-26c-6 0-10-2-10-8z" fill="#C9D6DD" opacity=".72"/>
      <path d="M846 448h32l-4 92h-24z" fill="#EBE5D9" opacity=".85"/>
      <path d="M850 452h24M850 470h24M850 488h24M850 506h24" stroke="#C0B79F" stroke-width="2.6"/>
      <path d="M826 422h-22M898 422h22" stroke="#6B7684" stroke-width="10"/>
      <circle cx="862" cy="404" r="7" fill="#C77D3B"/>
      <text x="862" y="590" class="bmt-tag" text-anchor="middle">FILTER</text>
    </g>

    <!-- open install bay -->
    <g class="bmt-obj" id="obj-install_area" data-obj="install_area">
      <path d="M910 660h150" stroke="#9A9283" stroke-width="4" stroke-dasharray="12 10" opacity=".8"/>
      <path d="M912 470v186M1058 470v186" stroke="#9A9283" stroke-width="3" stroke-dasharray="10 12" opacity=".55"/>
      <text x="985" y="700" class="bmt-tag" text-anchor="middle">OPEN BAY</text>
    </g>

    <!-- ghost: proposed new system (softener or 2-tank GAC) -->
    <g id="bmtGhost" class="bmt-ghost" style="display:none">
      <g id="bmtGhostSoft">
        <path d="M916 400c0-26 22-40 48-40s48 14 48 40v256h-96z" fill="none" stroke="#C77D3B" stroke-width="3.5" stroke-dasharray="10 8"/>
        <rect x="912" y="336" width="104" height="46" rx="8" fill="none" stroke="#C77D3B" stroke-width="3.5" stroke-dasharray="10 8"/>
        <text x="964" y="322" class="bmt-ghost-lab" text-anchor="middle">NEW SOFTENER</text>
      </g>
      <g id="bmtGhostGac" style="display:none">
        <path d="M906 400c0-26 20-40 44-40s44 14 44 40v256h-88z" fill="none" stroke="#C77D3B" stroke-width="3.5" stroke-dasharray="10 8"/>
        <path d="M1004 400c0-26 20-40 44-40s44 14 44 40v256h-88z" fill="none" stroke="#C77D3B" stroke-width="3.5" stroke-dasharray="10 8"/>
        <path d="M950 352h98" stroke="#C77D3B" stroke-width="3.5" stroke-dasharray="8 7"/>
        <text x="999" y="330" class="bmt-ghost-lab" text-anchor="middle">2-TANK LEAD-LAG GAC</text>
        <text x="950" y="640" class="bmt-ghost-lab" text-anchor="middle">LEAD</text>
        <text x="1048" y="640" class="bmt-ghost-lab" text-anchor="middle">LAG</text>
      </g>
    </g>

    <!-- water heater -->
    <g class="bmt-obj" id="obj-water_heater" data-obj="water_heater">
      <ellipse cx="1140" cy="668" rx="72" ry="16" fill="#8F8877" opacity=".45"/>
      <rect x="1074" y="330" width="132" height="326" rx="10" fill="url(#bmtHeater)"/>
      <path d="M1082 330h16v326h-16z" fill="#fff" opacity=".3"/>
      <path d="M1074 380h132M1074 432h132M1074 484h132M1074 536h132" stroke="#8A8E8B" stroke-width="3" opacity=".7"/>
      <rect x="1096" y="556" width="88" height="42" rx="4" fill="#EBE5D9" opacity=".9"/>
      <text x="1140" y="576" class="bmt-plate" text-anchor="middle">50 GAL ELECTRIC</text>
      <text x="1140" y="592" class="bmt-plate" text-anchor="middle">MFG 2009</text>
      <rect x="1120" y="300" width="40" height="32" fill="#8A8E8B"/>
      <path d="M1140 300V96" stroke="#9AA7B4" stroke-width="16"/>
      <path d="M1206 400h26l0 40" stroke="#B91C1C" stroke-width="11" fill="none"/>
      <path d="M1074 356h-30" stroke="#2563EB" stroke-width="11"/>
      <path d="M1074 620h-26v40" stroke="#6B7684" stroke-width="9" fill="none"/>
      <text x="1140" y="700" class="bmt-tag" text-anchor="middle">WATER HEATER</text>
    </g>

    <!-- laundry sink -->
    <g class="bmt-obj" id="obj-laundry_sink" data-obj="laundry_sink">
      <rect x="1252" y="330" width="266" height="188" fill="#A79E8B" opacity=".45"/>
      <path d="M1258 500h256l-14 40h-228z" fill="#B9C3CC"/>
      <path d="M1272 540h228l-16 92h-196z" fill="#8E9AA8"/>
      <path d="M1284 552h204l-12 68h-180z" fill="#5E6875"/>
      <path d="M1286 632h14v34h-14zM1472 632h14v34h-14z" fill="#6B7684"/>
      <path d="M1300 646h172v10h-172z" fill="#6B7684" opacity=".7"/>
      <path d="M1386 500v-58h-46" stroke="#9AA7B4" stroke-width="10" fill="none"/>
      <path d="M1340 442c0-16 12-26 26-26" stroke="#9AA7B4" stroke-width="10" fill="none"/>
      <circle cx="1340" cy="430" r="9" fill="#B91C1C"/>
      <path d="M1386 506c-6 24-6 40 4 56" stroke="#7DD3FC" stroke-width="5" fill="none" opacity=".8"/>
      <g id="bmtVials">
        <rect x="1274" y="470" width="18" height="34" rx="3" fill="#DCE7F0" opacity=".9"/>
        <rect x="1274" y="466" width="18" height="8" fill="#B91C1C"/>
        <rect x="1298" y="470" width="18" height="34" rx="3" fill="#DCE7F0" opacity=".9"/>
        <rect x="1298" y="466" width="18" height="8" fill="#059669"/>
        <rect x="1322" y="470" width="18" height="34" rx="3" fill="#DCE7F0" opacity=".9"/>
        <rect x="1322" y="466" width="18" height="8" fill="#2563EB"/>
      </g>
      <text x="1386" y="700" class="bmt-tag" text-anchor="middle">LAUNDRY SINK</text>
    </g>

    <!-- floor drain -->
    <g class="bmt-obj" id="obj-floor_drain" data-obj="floor_drain">
      <ellipse cx="760" cy="800" rx="52" ry="26" fill="#A79E8B"/>
      <ellipse cx="760" cy="800" rx="40" ry="19" fill="#4A5568"/>
      <path d="M730 792h60M730 800h60M730 808h60" stroke="#2C3947" stroke-width="4"/>
      <ellipse cx="760" cy="800" rx="40" ry="19" fill="none" stroke="#6B7684" stroke-width="3"/>
      <text x="760" y="848" class="bmt-tag" text-anchor="middle">FLOOR DRAIN</text>
    </g>

    <!-- kitchen inset (off-scene: upstairs) -->
    <g class="bmt-obj" id="obj-kitchen_faucet_offscene" data-obj="kitchen_faucet_offscene">
      <rect x="1200" y="704" width="222" height="176" rx="8" fill="#F5F0E4" opacity=".93" stroke="#B0A691" stroke-width="2.5"/>
      <text x="1213" y="730" class="bmt-inset-lab">UPSTAIRS · KITCHEN</text>
      <path d="M1215 802h192v13h-192z" fill="#C0B79F"/>
      <path d="M1258 762h104v40h-104z" fill="#DCE7F0"/>
      <path d="M1267 768h86v28h-86z" fill="#B9C3CC"/>
      <path d="M1310 762v-22c0-14 11-21 24-21s24 9 24 23" stroke="#8E9AA8" stroke-width="7" fill="none"/>
      <path d="M1310 770c-4 13-4 21 2 28" stroke="#7DD3FC" stroke-width="4" fill="none"/>
      <rect x="1228" y="818" width="50" height="54" rx="4" fill="#C9D6DD" opacity=".8"/>
      <rect x="1284" y="818" width="25" height="54" rx="4" fill="#C9D6DD" opacity=".8"/>
      <text x="1253" y="850" class="bmt-plate" text-anchor="middle">RO MEMBRANE</text>
      <path d="M1356 822h44v46h-44z" fill="none" stroke="#B0A691" stroke-width="2" stroke-dasharray="6 5"/>
    </g>

    <!-- yard / wellhead vignette -->
    <g class="bmt-obj bmt-vignette" id="obj-yard" data-obj="yard">
      <rect x="1346" y="120" width="238" height="404" rx="10" fill="#EBE5D9" opacity=".95" stroke="#B0A691" stroke-width="2.5"/>
      <text x="1362" y="146" class="bmt-inset-lab">OUTSIDE · THE WELLHEAD</text>
      <path d="M1352 158h226v92h-226z" fill="#9FB6C6" opacity=".55"/>
      <path d="M1352 226c34-14 62-16 96-6s70 8 130-8v38h-226z" fill="#4C6B57" opacity=".6"/>
      <path d="M1352 250h226v268h-226z" fill="#7C6A56" opacity=".55"/>
      <path d="M1352 258h226" stroke="#5C4E3E" stroke-width="4" opacity=".6"/>
      <g id="bmtWellGrp">
        <rect x="1436" y="238" width="60" height="22" rx="6" fill="#4A5568"/>
        <rect x="1442" y="226" width="48" height="16" rx="5" fill="#6B7684"/>
        <circle cx="1466" cy="226" r="6" fill="#39424E"/>
        <rect x="1442" y="258" width="48" height="248" fill="#5E6875"/>
        <rect x="1446" y="258" width="10" height="248" fill="#AEB9C4" opacity=".4"/>
        <rect x="1462" y="268" width="9" height="228" fill="#2C3947" opacity=".8"/>
        <path d="M1466 300h0M1466 340h0" stroke="#7DD3FC"/>
        <rect x="1454" y="440" width="26" height="62" rx="8" fill="#39424E"/>
        <path d="M1458 446h18v50h-18z" fill="#6B7684" opacity=".7"/>
        <text x="1466" y="524" class="bmt-plate" text-anchor="middle">SUBMERSIBLE · 400 FT</text>
      </g>
      <g id="ryanYard" transform="translate(1396,470) scale(.62)">
        ${ryanFigure("y")}
      </g>
    </g>
  </g>

  <!-- ================= RYAN ================= -->
  <g id="ryan" transform="translate(760,706) scale(1.3)">
    <ellipse cx="0" cy="4" rx="60" ry="13" fill="#8F8877" opacity=".4"/>
    ${ryanFigure("r")}
  </g>

  <!-- vignette: sits over the scene, under the UI overlay -->
  <rect width="1600" height="900" fill="url(#bmtVign)" pointer-events="none"/>

  <!-- ================= OVERLAY: RING + CALLOUT ================= -->
  <g id="bmtOverlay" aria-hidden="true">
    <g id="bmtRing" style="display:none">
      <ellipse id="bmtRingHalo" rx="10" ry="10" fill="#C77D3B" opacity=".1"/>
      <ellipse id="bmtRingSpin" class="bmt-ring-spin" rx="10" ry="10" fill="none"
               stroke="#C77D3B" stroke-width="4" stroke-dasharray="26 18" style="transform-origin:0 0"/>
      <ellipse id="bmtRingPulse" class="bmt-ring-pulse" rx="10" ry="10" fill="none"
               stroke="#C77D3B" stroke-width="2" opacity=".55"/>
      <g id="bmtRingTicks" stroke="#C77D3B" stroke-width="4"></g>
    </g>
    <g id="bmtCallout" style="display:none">
      <path id="bmtCalloutLine" stroke="#C77D3B" stroke-width="2.6" fill="none" stroke-dasharray="7 6"/>
      <circle id="bmtCalloutDot" r="5" fill="#C77D3B"/>
      <rect id="bmtCalloutBox" rx="4" fill="#F5F0E4" stroke="#1B2532" stroke-width="2"/>
      <rect id="bmtCalloutEdge" width="5" fill="#C77D3B"/>
      <text id="bmtCalloutStep" class="bmt-callout-step"></text>
      <text id="bmtCalloutText" class="bmt-callout-text"></text>
    </g>
  </g>
</svg>`;

  /* ---------------------------------------------------------
     2 · FOCUS ANCHORS + POSES
     --------------------------------------------------------- */
  const FOCUS = {
    doorway: { x: 132, y: 452, rx: 104, ry: 216, obj: "bmtDoorway", name: "Basement door" },
    kitchen_faucet_offscene: { x: 1311, y: 792, rx: 122, ry: 98, obj: "obj-kitchen_faucet_offscene", name: "Kitchen tap (upstairs)" },
    pressure_tank: { x: 315, y: 512, rx: 96, ry: 158, obj: "obj-pressure_tank", name: "Pressure tank" },
    pump_control: { x: 311, y: 286, rx: 84, ry: 66, obj: "obj-pump_control", name: "Pump control box" },
    wet_wall_pipes: { x: 481, y: 300, rx: 60, ry: 218, obj: "bmtPipes", name: "Wet-wall risers" },
    softener: { x: 576, y: 500, rx: 84, ry: 172, obj: "obj-softener", name: "Water softener" },
    softener_fail: { x: 576, y: 500, rx: 84, ry: 172, obj: "obj-softener", name: "Softener (failing)", alert: true },
    control_valve: { x: 576, y: 322, rx: 88, ry: 52, obj: "obj-control_valve", name: "Control valve" },
    brine_tank: { x: 706, y: 566, rx: 74, ry: 108, obj: "obj-brine_tank", name: "Brine tank" },
    softener_brine: { x: 640, y: 486, rx: 148, ry: 190, obj: "obj-softener", name: "Softener + brine tank" },
    uv: { x: 884, y: 364, rx: 100, ry: 40, obj: "obj-uv", name: "UV sterilizer" },
    filter: { x: 862, y: 486, rx: 60, ry: 96, obj: "obj-filter", name: "Filter housing" },
    install_area: { x: 984, y: 552, rx: 92, ry: 122, obj: "obj-install_area", name: "Open install bay" },
    new_softener: { x: 964, y: 500, rx: 96, ry: 176, obj: "obj-install_area", name: "New softener (going in)", ghost: "soft" },
    new_system: { x: 998, y: 500, rx: 122, ry: 176, obj: "obj-install_area", name: "Proposed GAC system", ghost: "gac" },
    water_heater: { x: 1140, y: 492, rx: 92, ry: 186, obj: "obj-water_heater", name: "Water heater" },
    laundry_sink: { x: 1386, y: 570, rx: 128, ry: 112, obj: "obj-laundry_sink", name: "Laundry sink" },
    sample_vials: { x: 1306, y: 484, rx: 62, ry: 52, obj: "obj-laundry_sink", name: "Sample bottles" },
    floor_drain: { x: 760, y: 800, rx: 74, ry: 42, obj: "obj-floor_drain", name: "Floor drain" },
    wet_wall: { x: 780, y: 470, rx: 620, ry: 250, obj: null, name: "The whole wet wall" },
    tablet: { x: 760, y: 520, rx: 96, ry: 96, obj: null, name: "Job record", follow: true },
    yard: { x: 1465, y: 322, rx: 132, ry: 214, obj: "obj-yard", name: "Wellhead, outside" },
  };

  // pose = { x, y, scale, legs, armF, armB, head, upper }
  const POSES = {
    standing_neutral: { x: 916, y: 800, s: 1.5, legs: "stand", armF: 6, armB: -6, head: 0 },
    at_doorway: { x: 268, y: 726, s: 1.36, legs: "stand", armF: 32, armB: -8, head: 4 },
    at_pressure_tank: { x: 452, y: 734, s: 1.38, legs: "stand", armF: -116, armB: -12, head: -14, flip: -1 },
    at_softener: { x: 680, y: 748, s: 1.4, legs: "kneel", armF: -78, armB: -26, head: -12, flip: -1 },
    at_brine_tank: { x: 818, y: 752, s: 1.4, legs: "squat", armF: -58, armB: 14, head: -8, flip: -1 },
    at_filter: { x: 952, y: 744, s: 1.42, legs: "stand", armF: -150, armB: -18, head: -22, flip: -1 },
    at_sink: { x: 1172, y: 744, s: 1.42, legs: "stand", armF: -56, armB: -18, head: -12 },
    at_pump_control: { x: 462, y: 734, s: 1.38, legs: "stand", armF: -156, armB: -14, head: -24, flip: -1 },
    writing_on_tablet: { x: 900, y: 806, s: 1.5, legs: "stand", armF: -72, armB: 24, head: -18 },
    outside_at_well: { x: 916, y: 800, s: 1.5, legs: "stand", armF: -70, armB: -30, head: -10, yard: true },
  };

  /* ---------------------------------------------------------
     3 · MARKUP
     --------------------------------------------------------- */
  const chips = BASEMENT_ORDER.map(id => {
    const sc = BASEMENT_SCENARIOS[id];
    return `<button type="button" class="bmt-chip" data-sc="${id}" aria-pressed="false">
      <span class="ic" aria-hidden="true">${sc.icon}</span><span class="lb">${esc(sc.short)}</span>
      <span class="dur">${sc.duration >= 120 ? (sc.duration / 60).toFixed(1).replace(".0", "") + " hr" : sc.duration + " min"}</span>
    </button>`;
  }).join("");

  const printList = BASEMENT_ORDER.map(id => {
    const sc = BASEMENT_SCENARIOS[id];
    return `<li><b>${sc.icon} ${esc(sc.label)}</b>
      <span>${sc.duration >= 120 ? (sc.duration / 60).toFixed(1).replace(".0", "") + " hrs" : sc.duration + " min"} · ${sc.crew} · ${esc(sc.revenue)} · ${sc.steps.length} steps</span>
      <em>${esc(sc.blurb)}</em>
      <ol>${sc.steps.map(st => `<li>${esc(st.description)} <i>(${st.duration} min · ${esc((BASEMENT_TOOLS[st.tool] || {}).label || st.tool)})</i></li>`).join("")}</ol></li>`;
  }).join("");

  host.querySelector(".bmt-mount").innerHTML = `
  <div class="bmt-bar" id="bmtBar">
    <p class="bmt-bar-q"><b>In the basement</b><span>What service brought Ryan here today?</span></p>
    <div class="bmt-chips" id="bmtChips" role="group" aria-label="Service scenarios">${chips}</div>
  </div>

  <div class="bmt-stage" id="bmtStage">
    <div class="bmt-scene-wrap" id="bmtSceneWrap">${sceneSVG}</div>
    <p class="bmt-idle" id="bmtIdle">Pick a service call above &rarr; and watch it happen, step by step.</p>
  </div>

  <div class="bmt-controls" id="bmtControls">
    <div class="bmt-step-read">
      <p class="bmt-step-meta"><span id="bmtStepNum">No call selected</span><span id="bmtStepTime"></span></p>
      <p class="bmt-step-desc" id="bmtStepDesc">Ryan is standing in a Durham basement with a test kit in the van and nothing on the schedule yet.</p>
    </div>
    <div class="bmt-btns">
      <button type="button" class="bmt-btn" id="bmtPrev" disabled>&#9664; Previous</button>
      <button type="button" class="bmt-btn primary" id="bmtNext" disabled>Next step &#9654;</button>
      <button type="button" class="bmt-btn" id="bmtPlay" disabled>&#9205; Auto-play</button>
      <button type="button" class="bmt-btn ghost" id="bmtReset">&#8635; Reset</button>
    </div>
    <div class="bmt-tool" id="bmtTool">
      <span class="k">Tool in hand</span>
      <span class="v" id="bmtToolLabel">Empty hands</span>
      <span class="n" id="bmtToolNote">Nothing on the schedule yet</span>
    </div>
  </div>

  <div class="bmt-timeline-wrap">
    <div class="bmt-timeline" id="bmtTimeline" role="group" aria-label="Step timeline"></div>
    <div class="bmt-tl-foot">
      <span id="bmtTlLabel">Elapsed-time strip &mdash; each segment is one step, scaled to its minutes on site</span>
      <span id="bmtTlTotal"></span>
    </div>
    <div class="bmt-progress" id="bmtProgress"><i></i></div>
  </div>

  <div class="bmt-mobile" id="bmtMobile" aria-hidden="true"></div>

  <ol class="bmt-print-list">${printList}</ol>`;

  /* ---------------------------------------------------------
     4 · WIRING
     --------------------------------------------------------- */
  const svg = document.getElementById("bmtScene");
  const el = id => document.getElementById(id);
  const ryan = el("ryan"), ryanYard = el("ryanYard");
  const ring = el("bmtRing"), callout = el("bmtCallout");
  const ghost = el("bmtGhost"), ghostSoft = el("bmtGhostSoft"), ghostGac = el("bmtGhostGac");
  const equipGroups = Array.from(svg.querySelectorAll(".bmt-obj"));
  const timelineEl = el("bmtTimeline"), progressEl = el("bmtProgress");
  const mobileEl = el("bmtMobile");
  const VB = { x: 0, y: 0, w: 1600, h: 900 };

  let current = null, idx = 0, playing = false, timer = null, raf = null;

  const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
  const mins = n => (n >= 120 ? (n / 60).toFixed(1).replace(".0", "") + " hrs" : n + " min");

  function setPose(poseName, tool) {
    const p = POSES[poseName] || POSES.standing_neutral;
    const inYard = !!p.yard;
    ryan.style.display = inYard ? "none" : "";
    ryanYard.style.display = inYard ? "" : "none";
    const prefix = inYard ? "y" : "r";
    const target = inYard ? ryanYard : ryan;
    if (!inYard) {
      target.setAttribute("transform", `translate(${p.x},${p.y}) scale(${(p.flip || 1) * p.s},${p.s})`);
    }
    ["Stand", "Kneel", "Squat"].forEach(v => {
      const g = el(prefix + "Legs" + v);
      if (g) g.style.display = (p.legs === v.toLowerCase()) ? "" : "none";
    });
    const upperY = p.legs === "kneel" ? 44 : p.legs === "squat" ? 58 : 0;
    const upperR = p.legs === "stand" ? 0 : -7;
    const up = el(prefix + "Upper");
    if (up) up.setAttribute("transform", `translate(0,${upperY}) rotate(${upperR},0,-110)`);
    const af = el(prefix + "ArmF"), ab = el(prefix + "ArmB"), hd = el(prefix + "Head");
    if (af) af.setAttribute("transform", `translate(22,-172) rotate(${p.armF})`);
    if (ab) ab.setAttribute("transform", `translate(-22,-172) rotate(${p.armB})`);
    if (hd) hd.setAttribute("transform", `rotate(${p.head || 0},0,-192)`);
    const toolG = el(prefix + "Tool");
    if (toolG) {
      toolG.setAttribute("transform", `translate(1,78) rotate(${-(p.armF || 0)})`);
      toolG.innerHTML = TOOL_ART[tool] || "";
    }
    // the other figure keeps a neutral pose so it never looks broken
    const other = inYard ? "r" : "y";
    const oTool = el(other + "Tool");
    if (oTool) oTool.innerHTML = "";
  }

  function wrap(text, max) {
    const words = String(text).split(/\s+/), lines = [];
    let line = "";
    words.forEach(w => {
      if ((line + " " + w).trim().length > max) { lines.push(line.trim()); line = w; }
      else line += " " + w;
    });
    if (line.trim()) lines.push(line.trim());
    return lines.slice(0, 4);
  }

  function placeRing(f) {
    const rx = f.rx, ry = f.ry;
    const color = f.alert ? "#B91C1C" : "#C77D3B";
    ring.style.display = "";
    ring.setAttribute("transform", `translate(${f.x},${f.y})`);
    ["bmtRingHalo", "bmtRingSpin", "bmtRingPulse"].forEach(id => {
      const e = el(id);
      e.setAttribute("rx", rx); e.setAttribute("ry", ry);
      if (id !== "bmtRingHalo") e.setAttribute("stroke", color);
      else e.setAttribute("fill", color);
    });
    const ticks = el("bmtRingTicks");
    ticks.setAttribute("stroke", color);
    const t = 18;
    ticks.innerHTML = [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy]) =>
      `<path d="M${sx * rx} ${sy * ry - sy * t} V${sy * ry} H${sx * rx - sx * t}" fill="none" stroke-linecap="square"/>`).join("");
  }

  function placeCallout(f, step, n, total) {
    const lines = wrap(step.description, 34);
    const boxW = 358, boxH = 40 + lines.length * 25;
    const rightSide = f.x < 860;
    const bx = rightSide ? Math.min(f.x + f.rx + 54, 1600 - boxW - 20) : Math.max(f.x - f.rx - 54 - boxW, 20);
    const by = Math.max(24, Math.min(f.y - boxH / 2, 900 - boxH - 24));
    const ax = rightSide ? f.x + f.rx : f.x - f.rx;
    const lx = rightSide ? bx : bx + boxW;
    callout.style.display = "";
    el("bmtCalloutBox").setAttribute("x", bx); el("bmtCalloutBox").setAttribute("y", by);
    el("bmtCalloutBox").setAttribute("width", boxW); el("bmtCalloutBox").setAttribute("height", boxH);
    const edge = el("bmtCalloutEdge");
    edge.setAttribute("x", rightSide ? bx : bx + boxW - 5);
    edge.setAttribute("y", by); edge.setAttribute("height", boxH);
    el("bmtCalloutLine").setAttribute("d", `M${ax} ${f.y} L${(ax + lx) / 2} ${f.y} L${lx} ${by + boxH / 2}`);
    el("bmtCalloutDot").setAttribute("cx", ax); el("bmtCalloutDot").setAttribute("cy", f.y);
    const st = el("bmtCalloutStep");
    st.setAttribute("x", bx + 20); st.setAttribute("y", by + 26);
    st.textContent = `STEP ${n} / ${total} · ${step.duration} MIN · ${f.name.toUpperCase()}`;
    const tx = el("bmtCalloutText");
    tx.setAttribute("x", bx + 20); tx.setAttribute("y", by + 26);
    tx.innerHTML = lines.map((l, i) => `<tspan x="${bx + 20}" dy="${i === 0 ? 28 : 25}">${esc(l)}</tspan>`).join("");
  }

  function setViewBox(f) {
    if (!isMobile() || !f) {
      svg.setAttribute("viewBox", "0 0 1600 900");
      return;
    }
    const pad = 1.75;
    let w = Math.max(f.rx * 2 * pad, 620), h = w * (900 / 1600) * 1.15;
    const hh = Math.max(f.ry * 2 * pad, 420);
    if (hh > h) { h = hh; w = h / ((900 / 1600) * 1.15); }
    let x = f.x - w / 2, y = f.y - h / 2;
    x = Math.max(-40, Math.min(x, 1640 - w));
    y = Math.max(-40, Math.min(y, 940 - h));
    svg.setAttribute("viewBox", `${x.toFixed(0)} ${y.toFixed(0)} ${w.toFixed(0)} ${h.toFixed(0)}`);
  }

  function clearHighlights() {
    equipGroups.forEach(g => g.classList.remove("dim", "hot"));
    ring.style.display = "none";
    callout.style.display = "none";
    ghost.style.display = "none";
    svg.classList.remove("bmt-yard-on");
  }

  function renderTimeline(sc, active) {
    if (!sc) { timelineEl.innerHTML = ""; el("bmtTlTotal").textContent = ""; return; }
    const total = sc.steps.reduce((a, b) => a + b.duration, 0);
    timelineEl.innerHTML = sc.steps.map((st, i) =>
      `<button type="button" class="bmt-seg${i === active ? " on" : ""}${i < active ? " done" : ""}"
        style="flex:${st.duration}" data-i="${i}" title="Step ${i + 1} · ${st.duration} min · ${esc(st.description)}"
        aria-label="Step ${i + 1} of ${sc.steps.length}: ${esc(st.description)}"><i></i><span>${i + 1}</span></button>`).join("");
    el("bmtTlTotal").innerHTML = `<b>${mins(total)}</b> on site · ${sc.crew} · ${esc(sc.revenue)}`;
  }

  function renderMobile(sc, active) {
    if (!sc) { mobileEl.innerHTML = ""; return; }
    mobileEl.innerHTML = sc.steps.map((st, i) => {
      const f = FOCUS[st.focus] || {};
      return `<button type="button" class="bmt-mstep${i === active ? " on" : ""}" data-i="${i}">
        <span class="mn">Step ${i + 1} of ${sc.steps.length}</span>
        <span class="mt">${st.duration} min · ${esc(f.name || st.focus)}</span>
        <span class="md">${esc(st.description)}</span>
        <span class="mtool">${esc((BASEMENT_TOOLS[st.tool] || {}).label || "Hands free")}</span>
      </button>`;
    }).join("");
  }

  function showStep(i, opts) {
    const sc = BASEMENT_SCENARIOS[current];
    if (!sc) return;
    idx = Math.max(0, Math.min(i, sc.steps.length - 1));
    const step = sc.steps[idx];
    const f = Object.assign({}, FOCUS[step.focus] || FOCUS.wet_wall);
    const pose = POSES[step.pose] || POSES.standing_neutral;
    if (f.follow) { f.x = pose.x + (pose.flip ? -70 : 70); f.y = pose.y - 190; f.rx = 96; f.ry = 96; }

    clearHighlights();
    equipGroups.forEach(g => {
      if (f.obj && g.id === f.obj) g.classList.add("hot"); else g.classList.add("dim");
    });
    if (f.obj === "obj-yard" || step.pose === "outside_at_well") {
      svg.classList.add("bmt-yard-on");
      const yg = el("obj-yard"); if (yg) { yg.classList.remove("dim"); yg.classList.add("hot"); }
    }
    if (f.ghost) {
      ghost.style.display = "";
      ghostSoft.style.display = f.ghost === "soft" ? "" : "none";
      ghostGac.style.display = f.ghost === "gac" ? "" : "none";
    }
    placeRing(f);
    placeCallout(f, step, idx + 1, sc.steps.length);
    setPose(step.pose, step.tool);
    setViewBox(f);

    const elapsedBefore = sc.steps.slice(0, idx).reduce((a, b) => a + b.duration, 0);
    el("bmtStepNum").innerHTML = `<b>Step ${idx + 1}</b> of ${sc.steps.length} · ${sc.icon} ${esc(sc.label)}`;
    el("bmtStepTime").textContent = `${step.duration} min for this step · ${elapsedBefore} min elapsed`;
    el("bmtStepDesc").textContent = step.description;
    const t = BASEMENT_TOOLS[step.tool] || BASEMENT_TOOLS.none;
    el("bmtToolLabel").textContent = t.label;
    el("bmtToolNote").textContent = t.note;
    el("bmtPrev").disabled = idx === 0;
    el("bmtNext").disabled = false;
    renderTimeline(sc, idx);
    if (!opts || !opts.keepMobile) renderMobile(sc, idx);
    else {
      Array.from(mobileEl.children).forEach((c, i2) => c.classList.toggle("on", i2 === idx));
    }
    el("bmtIdle").style.display = "none";
    host.classList.add("bmt-active");
  }

  function startProgress() {
    if (!progressEl) return;
    const bar = progressEl.firstElementChild;
    progressEl.classList.add("on");
    const t0 = performance.now(), dur = 4000;
    cancelAnimationFrame(raf);
    const tick = now => {
      const p = Math.min(1, (now - t0) / dur);
      bar.style.width = (p * 100).toFixed(1) + "%";
      if (playing && p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }

  function stopPlay() {
    playing = false;
    clearTimeout(timer);
    cancelAnimationFrame(raf);
    progressEl.classList.remove("on");
    progressEl.firstElementChild.style.width = "0%";
    el("bmtPlay").innerHTML = "&#9205; Auto-play";
    el("bmtPlay").classList.remove("on");
  }

  function play() {
    const sc = BASEMENT_SCENARIOS[current];
    if (!sc) return;
    playing = true;
    el("bmtPlay").innerHTML = "&#10074;&#10074; Pause";
    el("bmtPlay").classList.add("on");
    const step = () => {
      if (!playing) return;
      startProgress();
      timer = setTimeout(() => {
        if (!playing) return;
        if (idx >= sc.steps.length - 1) { stopPlay(); return; }
        showStep(idx + 1);
        step();
      }, 4000);
    };
    step();
  }

  function selectScenario(id) {
    stopPlay();
    current = id;
    const sc = BASEMENT_SCENARIOS[id];
    Array.from(el("bmtChips").children).forEach(b => {
      const on = b.dataset.sc === id;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    el("bmtPlay").disabled = false;
    el("bmtTlLabel").innerHTML = `<b>${esc(sc.label)}</b> — ${esc(sc.blurb)}`;
    mobileEl.setAttribute("aria-hidden", "false");
    showStep(0);
  }

  function reset() {
    stopPlay();
    current = null; idx = 0;
    Array.from(el("bmtChips").children).forEach(b => { b.classList.remove("on"); b.setAttribute("aria-pressed", "false"); });
    clearHighlights();
    setPose("standing_neutral", "none");
    setViewBox(null);
    timelineEl.innerHTML = ""; mobileEl.innerHTML = "";
    mobileEl.setAttribute("aria-hidden", "true");
    el("bmtTlTotal").textContent = "";
    el("bmtTlLabel").textContent = "Elapsed-time strip — each segment is one step, scaled to its minutes on site";
    el("bmtStepNum").textContent = "No call selected";
    el("bmtStepTime").textContent = "";
    el("bmtStepDesc").textContent = "Ryan is standing in a Durham basement with a test kit in the van and nothing on the schedule yet.";
    el("bmtToolLabel").textContent = "Empty hands";
    el("bmtToolNote").textContent = "Nothing on the schedule yet";
    el("bmtPrev").disabled = true; el("bmtNext").disabled = true; el("bmtPlay").disabled = true;
    el("bmtIdle").style.display = "";
    host.classList.remove("bmt-active");
  }

  el("bmtChips").addEventListener("click", e => {
    const b = e.target.closest("button[data-sc]"); if (!b) return;
    selectScenario(b.dataset.sc);
  });
  el("bmtNext").addEventListener("click", () => {
    const sc = BASEMENT_SCENARIOS[current]; if (!sc) return;
    stopPlay();
    showStep(idx >= sc.steps.length - 1 ? 0 : idx + 1);
  });
  el("bmtPrev").addEventListener("click", () => { stopPlay(); showStep(idx - 1); });
  el("bmtPlay").addEventListener("click", () => { playing ? stopPlay() : play(); });
  el("bmtReset").addEventListener("click", reset);
  timelineEl.addEventListener("click", e => {
    const b = e.target.closest("button[data-i]"); if (!b) return;
    stopPlay(); showStep(+b.dataset.i);
  });
  mobileEl.addEventListener("click", e => {
    const b = e.target.closest("button[data-i]"); if (!b) return;
    stopPlay(); showStep(+b.dataset.i, { keepMobile: true });
  });
  // clicking equipment in the scene names it
  svg.addEventListener("click", e => {
    const g = e.target.closest(".bmt-obj"); if (!g) return;
    const key = g.dataset.obj;
    const f = FOCUS[key];
    if (!f || current) return;
    clearHighlights();
    equipGroups.forEach(x => { if (x !== g) x.classList.add("dim"); });
    g.classList.add("hot");
    placeRing(f);
    placeCallout(f, { description: `${f.name} — pick a service call above to see what Ryan does here.`, duration: 0 }, 0, 0);
    el("bmtCalloutStep").textContent = f.name.toUpperCase();
  });

  window.addEventListener("resize", () => {
    const sc = BASEMENT_SCENARIOS[current];
    if (!sc) { setViewBox(null); return; }
    const step = sc.steps[idx];
    const f = Object.assign({}, FOCUS[step.focus] || FOCUS.wet_wall);
    const pose = POSES[step.pose] || POSES.standing_neutral;
    if (f.follow) { f.x = pose.x + 70; f.y = pose.y - 190; f.rx = 96; f.ry = 96; }
    setViewBox(f);
  }, { passive: true });

  if (REDUCED) {
    svg.classList.add("bmt-reduced");
    el("bmtPlay").hidden = true;
  }

  setPose("standing_neutral", "none");
  reset();
  // expose for QA
  window.__BASEMENT__ = { focusKeys: Object.keys(FOCUS), poseKeys: Object.keys(POSES), select: selectScenario, step: showStep, play, stop: stopPlay, reset, get idx() { return idx; }, get current() { return current; } };
})();

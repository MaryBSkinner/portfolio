// project.jsx — Mary Skinner Designs / project case studies
// Slug-aware: ?slug=... selects the project

const { useEffect, useRef, useState } = React;

// Canonical display order of projects, matching the homepage work grid.
// The "next project" link at the bottom of each case study uses this to
// always advance to the consecutive project (wrapping at the end).
const WORK_ORDER = [
  'the-office-of-angela-scott',
  'spa-verdant',
  'molly-ann-farms',
  'slaack-social-club',
  'sage-brooklyn',
  'summit-lake',
  'the-room-society',
  'the-embodied-boss',
  'bridge',
  'bic',
  'last-hurrah',
  'flora-farms',
];

function nextSlug(currentSlug) {
  const i = WORK_ORDER.indexOf(currentSlug);
  if (i === -1) return WORK_ORDER[0];
  return WORK_ORDER[(i + 1) % WORK_ORDER.length];
}

// ---------- Project data ----------
const PROJECTS = {
  'flora-farms': {
    eyebrow: 'Print · Illustrated Map',
    titleParts: ['Flora', 'Farms'],
    industry: 'Organic Farm · Restaurant · Community',
    year: '2014',
    scope: 'Custom Placemat · Illustrated Property Map',
    yearLong: '2014 — still in use today',
    intro: 'A custom illustrated <em>placemat-as-map</em> for an organic farm and restaurant in Baja — guiding diners through the fields, kitchens, and cottages that make up the property.',
    body: [
      "Over time, the farm blossomed into a thriving agricultural community — home to Flora's Field Kitchen, the Farm Bar, the Grocery, the Live Work Shops, the Farm Spa, and the Residential Communities. Yet at its heart, Flora Farms has remained true to its roots: a place where food is grown with care, homes are built with craftsmanship, and life follows the pace of nature.",
      "In 2014 we designed a custom placemat for them — an illustrated map of the entire property, highlighting all of its beautiful corners. It's still in use at the restaurant today, more than a decade later.",
    ],
    quote: 'Where food is grown with care, homes are built with craftsmanship, and life follows the <em>pace of nature.</em>',
    quoteAttr: '<strong>Flora Farms</strong> — Baja California Sur',
    hero: 'assets/flora-placemat.jpg',
    heroFit: 'contain',
    gallery: 'flora-farms',
    next: 'the-office-of-angela-scott',
    nextTitle: 'The Office of Angela Scott',
  },
  'the-office-of-angela-scott': {
    eyebrow: 'Logo Design',
    titleParts: ['The Office of', 'Angela Scott'],
    industry: 'Luxury Footwear',
    year: '2009',
    scope: 'Logo Design',
    yearLong: '2009 — still in use today',
    intro: 'Two logo marks, designed in 2009 — and used unchanged across every collection, storefront, and box ever since.',
    body: [
      "The brief was simple: a wordmark and a monogram inspired by Angela's grandfather and the cues of classic menswear tailoring — then reinvented for women. The marks needed to feel hand-made without feeling old, and to scale from the inside of a heel to the front of a Beverly Hills storefront without compromise.",
      "Fifteen years on, both marks are still the brand. You'll find them embossed on the soles, etched on the windows, and stamped on every shoebox — exactly as they were drawn the first time.",
    ],
    quote: 'Fifteen years later, the mark <em>still feels right</em>. We\'ve never had to redraw a single line.',
    quoteAttr: '<strong>Angela Scott</strong> — Founder',
    hero: 'assets/angela-scott-main.webp',
    gallery: 'angela-scott',
    next: 'molly-ann-farms',
    nextTitle: 'Molly Ann Farms',
  },
  'molly-ann-farms': {
    eyebrow: 'Brand Identity',
    titleParts: ['Molly Ann', 'Farms'],
    industry: 'Cannabis Dispensary',
    year: '2023',
    scope: 'Brand Identity · Brand Guidelines · Logo · Packaging',
    yearLong: '2023',
    intro: 'A full brand identity for an urban New Jersey dispensary built on <em>laid-back vibes, family roots, and the simple business of being the sunshine.</em>',
    body: [
      "Molly Ann Farms isn't your typical dispensary — it's the knowledgeable neighbor who always has the good stuff. Family-run, deeply local, and quietly expert. They came to us wanting to honor the organic nature of cannabis and the community their store would bring together: a modern brand that spoke to their core demographic without losing the values underneath.",
      "We built the full system. The mark itself is the top of a barn with the sun rising behind it — a quiet nod to their idea of being the sunshine. We paired it with modern typefaces, playful graphic accents, and a diverse, bold color palette that captures their tagline: open for happy.",
    ],
    quote: 'Smiling is contagious — and we do <em>that</em> too.',
    quoteAttr: '<strong>Molly Ann Farms</strong> — Brand voice',
    hero: 'assets/molly-ann-farms.jpg',
    gallery: 'molly-ann',
    next: 'slaack-social-club',
    nextTitle: 'Slaack Social Club',
  },
  'the-embodied-boss': {
    eyebrow: 'Logo Suite · Logo Guidelines',
    titleParts: ['The Embodied', 'Boss'],
    industry: 'Somatic Coaching · Leadership',
    year: '2025',
    scope: 'Logo Design · Logo Suite · Usage Guidelines',
    yearLong: '2025',
    intro: 'A logo suite and usage guide for a somatic coaching practice helping women lead from <em>presence, not pressure.</em>',
    body: [
      "The Embodied Boss is the work of Cat, a former Executive Producer turned certified somatic coach. After years of being rewarded for output and never taught how to actually lead, she built the leadership support she wished she'd had — rooted in embodiment, nervous-system awareness, and feminine authority.",
      "The brand stands for a different kind of power: groundedness with feeling, structure with intuition, presence over pressure. Leadership that doesn't come at the expense of the nervous system.",
      "The logo was designed to feel bold and still feminine and organic at the same time — a balance we found through a typeface that carries all three qualities in its forms. The monogram logomark is an E embodying a B, a quiet visual play on the name. We delivered the full logo suite alongside a guideline document so the system can grow as Cat's practice does.",
    ],
    quote: 'Leadership doesn\'t have to feel tight, exhausting, or lonely. <em>Power doesn\'t have to come at the expense of your nervous system.</em>',
    quoteAttr: '<strong>Cat</strong> — Founder, The Embodied Boss',
    hero: 'assets/teb-hero.jpg',
    heroFit: 'contain',
    gallery: 'the-embodied-boss',
    next: 'bridge',
    nextTitle: 'Bridge',
  },
  'bic': {
    eyebrow: 'Environmental Graphics · Installation',
    titleParts: ['BiC'],
    industry: 'Corporate Office · Anniversary Campaign',
    year: '2019',
    scope: 'Environmental Graphics · Type-driven Installation · Custom Lettering',
    yearLong: '2019 — Anniversary campaign',
    intro: 'A series of <em>bold, type-driven wall installations</em> for BiC corporate offices — surprising employees, welcoming clients, and turning ordinary vestibules into a celebration of legacy.',
    body: [
      "BiC came to us to transform their corporate office entryways — both vestibules and reception walls — into vibrant, inspirational spaces in celebration of their anniversary. The goal was to surprise and delight employees while creating a welcoming experience for visiting clients.",
      "We designed a series of bold, type-driven installations featuring motivational quotes and custom graphics that brought new energy to otherwise ordinary spaces. The result is a modern, dynamic entry that reflects BiC's legacy while inspiring everyone who walks through the doors.",
    ],
    quote: 'We create things. <em>Real, physical things you hold and use every day.</em>',
    quoteAttr: '<strong>BiC</strong>',
    hero: 'assets/bic-wall-decal.jpg',
    heroPair: ['assets/bic-we-create.jpg', 'assets/bic-watch-next.jpg'],
    gallery: 'bic',
    next: 'the-room-society',
    nextTitle: 'The Room Society',
  },
  'bridge': {
    eyebrow: 'Brand Identity · Logo',
    titleParts: ['Bridge'],
    industry: 'Mobile Physical Therapy',
    year: '2024',
    scope: 'Brand Identity · Logo Design',
    yearLong: '2024',
    intro: 'A logo and identity refresh for a mobile physical therapy company — built around the idea that they are the <em>bridge to care</em> for people who can\'t make it to a physical clinic.',
    body: [
      "Bridge came to us to redesign their branding. The premise of the business is simple: enter your zip code, find a physical therapist in your area, pick one, and they come to your home ready to treat you.",
      "We designed a simple bridge mark out of hands — a nod to the work of physical therapy itself, where the practitioner's hands do the healing and the brand is a helping hand overall. Inside the wordmark, we turned the bottom of the B on its side, which naturally creates a bridge shape — a quiet bit of geometry that doubles as a standalone logomark.",
    ],
    quote: 'The bridge to physical therapy — <em>brought to you.</em>',
    quoteAttr: '<strong>Bridge</strong>',
    hero: 'assets/bridge.jpg',
    gallery: 'bridge',
    next: 'the-room-society',
    nextTitle: 'The Room Society',
  },
  'sage-brooklyn': {
    eyebrow: 'Logo Design · Print Collateral',
    titleParts: ['Sage', 'Brooklyn'],
    industry: 'Restaurant · Modern Thai',
    year: 'Ongoing',
    scope: 'Logo Design · Business Cards',
    yearLong: 'A Williamsburg institution',
    intro: 'A logo and stationery system for a modern Thai restaurant in Williamsburg — built to feel <em>contemporary, rooted, and quietly inevitable.</em>',
    body: [
      "The Sage Brooklyn logo was crafted to reflect the restaurant's modern take on traditional Thai cuisine. The clean, contemporary wordmark is paired with a sage leaf — symbolizing both the herb and the wisdom in its name.",
      "Complementing this is a stylized elephant: a revered symbol in Thai culture representing strength, wisdom, and good fortune. Together, these elements create a visual identity that's fresh, rooted, and now a longstanding Williamsburg institution.",
    ],
    quote: 'The mark has become as much a part of the neighborhood as the restaurant itself.',
    quoteAttr: '<strong>Sage Brooklyn</strong> — Williamsburg, NY',
    hero: 'assets/sage-brooklyn.jpg',
    heroFit: 'contain',
    gallery: 'sage-brooklyn',
    next: 'summit-lake',
    nextTitle: 'Summit Lake',
  },
  'last-hurrah': {
    eyebrow: 'Brand Identity · Logo · Web',
    titleParts: ['Last', 'Hurrah'],
    industry: 'Legacy &amp; End-of-Life',
    year: '2025',
    scope: 'Brand Identity · Logo Design · Web Design &amp; Development',
    yearLong: '2025',
    intro: 'Born from love. Built from loss. A brand for honoring lives the way they were <em>lived</em> — beautifully, fully, and in celebration.',
    body: [
      "The logo is a quiet nod to Día de los Muertos — a tradition where loved ones are honored in beauty rather than in silence. The skull replaces the A in LAST and wears a floral crown in that same spirit. The skull also pulls out cleanly as a standalone logomark. In HURRAH the word was almost perfectly symmetrical to begin with, so flipping the R gave the mark a centered, balanced read. Together, the system feels like it carries many cultures inside it — respectful, celebratory, and human all at once.",
    ],
    quote: 'Every life deserves to be celebrated as <em>beautifully as it was lived.</em>',
    quoteAttr: '<strong>Last Hurrah</strong> — Bringing Life to Death',
    hero: 'assets/last-hurrah-logo.png',
    heroFit: 'contain',
    gallery: 'last-hurrah',
    next: 'the-room-society',
    nextTitle: 'The Room Society',
  },
  'the-room-society': {
    eyebrow: 'Brand Identity · Logo · Web',
    titleParts: ['The Room', 'Society'],
    industry: 'Death Tech · Collective',
    year: '2026',
    scope: 'Naming · Brand Concept · Identity · Logo · Web · Illustration',
    yearLong: '2026',
    intro: 'A logo, identity, and website for a society of practitioners working at the edges of aging, death, and legacy — and the <em>name and concept</em> behind it. A brand with the old-school feel of a social club, where the elephant in the room is finally welcome.',
    body: [
      "The Room Society was founded by two women working in the quietly emerging field of death tech. We wanted a permanent home for the people who do this work: a collective where aging, loss, memory, and legacy could finally be named, and the real work could begin.",
      "The naming and the entire creative concept grew out of one image: an elephant in the room, finally welcomed in. That metaphor became the brand. The mark itself is built like a vintage key — the bow at the top spells out ROOM in a 1920s display face, and the bit at the bottom is a TRS monogram that doubles as a standalone logomark. We paired that with a modern, stylized illustration of an elephant in a wingback chair.",
      "The voice of the brand follows the architecture. The founders are the Porters — the ones who hold the massive door open and prepare the space inside. Members are the Keyholders — the ones with the agency to walk through, bring the elephant with them, and find common ground with uncommon kind.",
    ],
    quote: 'Welcome to The Room Society — where the elephant is not only welcome, <em>but honored.</em>',
    quoteAttr: '<strong>The Porters</strong>',
    hero: 'assets/the-room-society-hero-fixed.png',
    heroFit: 'contain',
    gallery: 'the-room-society',
    next: 'the-office-of-angela-scott',
    nextTitle: 'The Office of Angela Scott',
  },
  'spa-verdant': {
    eyebrow: 'Brand Identity · Logo · Style Guide',
    titleParts: ['Spa', 'Verdant'],
    industry: 'Spa · Hospitality',
    year: '2025',
    scope: 'Logo Design · Brand Identity · Brand Guidelines · Pattern · Style Guide',
    yearLong: '2025 — Racine, WI',
    intro: 'A logo and complete brand identity for the new spa inside Hotel Verdant — a Danish-hygge sanctuary <em>where wellness takes root.</em>',
    body: [
      "Spa Verdant is a modern wellness sanctuary inside Hotel Verdant in Racine, Wisconsin — rooted in the principles of Danish hygge, Nordic bathing traditions, and authentic Midwestern hospitality. They came to us for a logo and the full brand system: a quietly distinctive identity that could live in print, packaging, signage, and digital, alongside the existing hotel brand.",
      "The logotype is hand-drawn and organic, with the V shaped like a leaf — a quiet nod to flora and fauna. We paired it with a hand-drawn pattern language of leaves, flowers, and natural forms that scales from a tiny sticker to a full wall.",
      "The tagline — Where Wellness Takes Root — became the through-line for everything that followed: a brand designed to feel grounded, warm, sociable, and informed, season after season.",
    ],
    quote: 'Where wellness <em>takes root.</em>',
    quoteAttr: '<strong>Spa Verdant</strong> — Racine, WI',
    hero: 'assets/spa-verdant-bag.jpg',
    heroFit: 'contain',
    gallery: 'spa-verdant',
    next: 'the-room-society',
    nextTitle: 'The Room Society',
  },
  'summit-lake': {
    eyebrow: 'Visual Identity · Environmental Graphics',
    titleParts: ['Summit', 'Lake'],
    industry: 'Public Nature Center',
    year: '2023',
    scope: 'Visual Identity · Environmental Graphics · Illustration',
    yearLong: '2023 — Akron, OH',
    intro: 'A vibrant, educational, and interactive nature center identity — built to <em>invite visitors of all ages</em> into the cultural, historical, and ecological story of Summit Lake.',
    body: [
      "Summit Metro Parks approached us to help design a nature center at Summit Lake in Akron, Ohio. The goal of the space was to invite visitors of all ages to explore the cultural, historical, and ecological story of the lake — its people, its past, and its living landscape.",
      "Through original illustrations and thoughtful creative direction, we brought the unique animals, flora, fauna, and human history of the area to life. The result is a space that blends education with engagement — encouraging curiosity, connection, and a deeper appreciation for this vital natural and community resource.",
    ],
    quote: 'A space that turns ecology into a story everyone wants to keep reading.',
    quoteAttr: '<strong>Summit Metro Parks</strong> — Akron, OH',
    hero: 'assets/summit-lake.jpg',
    gallery: 'summit-lake',
    next: 'the-office-of-angela-scott',
    nextTitle: 'The Office of Angela Scott',
  },
  'slaack-social-club': {
    eyebrow: 'Brand Identity · Merchandise',
    titleParts: ['Slaack', 'Social Club'],
    industry: 'Internal Brand · Production',
    year: '2024',
    scope: 'Logo Refresh · Identity System · Merchandise',
    yearLong: '2024',
    intro: 'A varsity-club rebrand of an internal logo — designed to live on swag, build belonging, and make everyone want to <em>wear the patch.</em>',
    body: [
      "Slaack Productions came to us wanting to breathe new life into their internal brand. They had a simple wordmark and an itch to do more with it — to turn the company into something the team actually wanted to rep.",
      "We took the existing name and reimagined it as a social club. A circular embroidered crest with varsity-arc lettering, a winged eagle, a script ribbon, and a pair of mottoes — Work Hard, Be Nice. The palette stays tight: deep navy on a sky-mint pinstripe, cream as the canvas. The whole thing was built to feel like something you'd find on a vintage jacket — not a corporate logo, a club emblem.",
      "From there we extended the system into merch — tote bags, motel-style keychains, embroidered patches, member cards — anything that turned the team into a club, not a company.",
    ],
    quote: 'It stopped feeling like a logo and started feeling like <em>a club anyone wanted in on.</em>',
    quoteAttr: '<strong>Slaack Productions</strong> — Internal team',
    hero: 'assets/slaack-social-club.jpg',
    heroFit: 'contain',
    gallery: 'slaack',
    next: 'molly-ann-farms',
    nextTitle: 'Molly Ann Farms',
  },
};

function getSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get('slug') || 'the-office-of-angela-scott';
}

// Gallery render — varies by project
function Gallery({ which }) {
  if (which === 'angela-scott') {
    return (
      <section className="project-gallery">
        <RevealOnScroll className="shot shot-8">
          <img src="assets/angela-scott-shoes-1.jpg" alt="Angela Scott oxford and embossed sole" />
        </RevealOnScroll>
        <RevealOnScroll className="shot shot-4">
          <img src="assets/angela-scott-sneaker.webp" alt="Angela Scott sneaker" style={{objectFit:'cover'}} />
        </RevealOnScroll>

        <RevealOnScroll className="shot shot-6" style={{background:'#ffffff'}}>
          <img src="assets/angela-scott-shoes-2.jpg" alt="Heel-counter monogram patch" style={{objectFit:'cover', objectPosition:'center', transform:'scale(0.8)'}} />
        </RevealOnScroll>
        <RevealOnScroll className="shot shot-6" style={{background:'#ffffff'}}>
          <img src="assets/angela-scott-sole.jpg" alt="Embossed sole detail" style={{objectFit:'contain', padding:'8%'}} />
        </RevealOnScroll>

        <RevealOnScroll className="shot shot-12" style={{aspectRatio:'21/9', background:'#1a1a1a'}}>
          <img src="assets/angela-scott-storefront.webp" alt="Angela Scott storefront window decal" style={{objectFit:'cover', opacity:0.94}} />
        </RevealOnScroll>

        <RevealOnScroll className="shot shot-12" style={{aspectRatio:'16/9'}}>
          <img src="assets/angela-scott-packaging.jpg" alt="Stamped kraft packaging" />
        </RevealOnScroll>
      </section>
    );
  }

  if (which === 'molly-ann') {
    return (
      <section className="project-gallery">
        {/* Row 1 — cover */}
        <RevealOnScroll className="shot shot-12" style={{aspectRatio:'16/9'}}>
          <img src="assets/molly-gd-cover.png" alt="Molly Ann Farms — brand guidelines cover" style={{objectFit:'cover'}} />
        </RevealOnScroll>

        {/* Row 2 — primary logo spread */}
        <RevealOnScroll className="shot shot-12" style={{aspectRatio:'16/9'}}>
          <img src="assets/molly-gd-logo-primary.png" alt="Primary logo — barn-and-sunrise mark" style={{objectFit:'cover'}} />
        </RevealOnScroll>

        {/* Row 3 — color palette + fonts */}
        <RevealOnScroll className="shot shot-6" style={{aspectRatio:'16/9'}}>
          <img src="assets/molly-gd-palette.png" alt="Color palette — nine swatches" style={{objectFit:'cover'}} />
        </RevealOnScroll>
        <RevealOnScroll className="shot shot-6" style={{aspectRatio:'16/9'}}>
          <img src="assets/molly-gd-fonts.png" alt="Type system — Garage Gothic, Gasoek One, Poppins" style={{objectFit:'cover'}} />
        </RevealOnScroll>

        {/* Row 4 — icons + Molly High Club sub-brand */}
        <RevealOnScroll className="shot shot-6" style={{aspectRatio:'16/9'}}>
          <img src="assets/molly-gd-icons.png" alt="Brand icon set — product categories" style={{objectFit:'cover'}} />
        </RevealOnScroll>
        <RevealOnScroll className="shot shot-6" style={{aspectRatio:'16/9'}}>
          <img src="assets/molly-gd-molly-high.png" alt="Molly High Club — loyalty sub-brand" style={{objectFit:'cover'}} />
        </RevealOnScroll>

        {/* Row 5 — social applications */}
        <RevealOnScroll className="shot shot-12" style={{aspectRatio:'16/9'}}>
          <img src="assets/molly-gd-social.png" alt="Brand applied — social posts, stories, profile" style={{objectFit:'cover'}} />
        </RevealOnScroll>
      </section>
    );
  }

  if (which === 'flora-farms') {
    return null; // hero shows the placemat full; no additional gallery
  }

  if (which === 'the-embodied-boss') {
    return (
      <section className="project-gallery">
        {/* Website laptop mock — Be the calmest power in the room */}
        <RevealOnScroll className="shot shot-12" style={{aspectRatio:'16/10', background:'#FBF8F2'}}>
          <img src="assets/teb-laptop.jpg" alt="The Embodied Boss — website hero, 'Be the calmest power in the room'" style={{objectFit:'contain', objectPosition:'center', padding:'2%'}} />
        </RevealOnScroll>

        {/* Brand sheet — wordmark with three logomark variants */}
        <RevealOnScroll className="shot shot-12" style={{aspectRatio:'4/3'}}>
          <img src="assets/teb-brandsheet.jpg" alt="The Embodied Boss — wordmark and three logomark variants" style={{objectFit:'cover', objectPosition:'center'}} />
        </RevealOnScroll>
      </section>
    );
  }

  if (which === 'bic') {
    return (
      <section className="project-gallery">
        {/* Full-scale wall decal */}
        <RevealOnScroll className="shot shot-12" style={{aspectRatio:'auto', background:'#FBF8F2'}}>
          <img src="assets/bic-wall-decal.jpg" alt="BiC reception wall — 'We Create Things' anniversary installation" style={{display:'block', width:'100%', height:'auto', objectFit:'unset'}} />
        </RevealOnScroll>
      </section>
    );
  }

  if (which === 'bridge') {
    return (
      <section className="project-gallery">
        {/* Brand applied — van + uniform */}
        <RevealOnScroll className="shot shot-12" style={{aspectRatio:'16/9', background:'#FBF8F2'}}>
          <img src="assets/bridge-applied.jpg" alt="Bridge — identity applied to van decal and uniform polo" style={{objectFit:'contain', objectPosition:'center'}} />
        </RevealOnScroll>

        {/* B-mark alone + primary lockup */}
        <RevealOnScroll className="shot shot-6" style={{aspectRatio:'4/3'}}>
          <img src="assets/bridge-mark.jpg" alt="Bridge — B logomark with bridge cutout" style={{objectFit:'cover', objectPosition:'center'}} />
        </RevealOnScroll>
        <RevealOnScroll className="shot shot-6" style={{aspectRatio:'4/3'}}>
          <img src="assets/bridge-lockup.jpg" alt="Bridge — primary lockup with tagline arc" style={{objectFit:'cover', objectPosition:'center'}} />
        </RevealOnScroll>
      </section>
    );
  }

  if (which === 'sage-brooklyn') {
    return (
      <section className="project-gallery">
        {/* Row 1 — moody monogram on table tent, full width */}
        <RevealOnScroll className="shot shot-12" style={{aspectRatio:'21/9'}}>
          <img src="assets/sage-bulb.jpg" alt="Sage Brooklyn — monogram on table tent under Edison bulb" style={{objectFit:'cover', objectPosition:'center'}} />
        </RevealOnScroll>

        {/* Row 2 — logo over plated dish + b&w storefront, paired */}
        <RevealOnScroll className="shot shot-6" style={{aspectRatio:'1/1'}}>
          <img src="assets/sage-logo-plate.jpg" alt="Sage Brooklyn — primary logo over signature pad thai" style={{objectFit:'cover', objectPosition:'center'}} />
        </RevealOnScroll>
        <RevealOnScroll className="shot shot-6" style={{aspectRatio:'1/1'}}>
          <img src="assets/sage-storefront.png" alt="Sage Brooklyn storefront — awning &amp; front display" style={{objectFit:'cover', objectPosition:'center'}} />
        </RevealOnScroll>

        {/* Row 3 — tuk-tuk, full width */}
        <RevealOnScroll className="shot shot-12" style={{aspectRatio:'16/9'}}>
          <img src="assets/sage-tuktuk.jpg" alt="Sage Brooklyn — tuk-tuk and monogrammed patio entrance" style={{objectFit:'cover', objectPosition:'center'}} />
        </RevealOnScroll>
      </section>
    );
  }

  if (which === 'last-hurrah') {
    return (
      <section className="project-gallery">
        {/* Website laptop mock */}
        <RevealOnScroll className="shot shot-12" style={{aspectRatio:'16/10', background:'#FBF8F2'}}>
          <img src="assets/last-hurrah-laptop.jpg" alt="Last Hurrah — website hero, 'Bringing Life to Death'" style={{objectFit:'contain', objectPosition:'center', padding:'2%'}} />
        </RevealOnScroll>
      </section>
    );
  }

  if (which === 'the-room-society') {
    return (
      <section className="project-gallery">
        {/* Full-bleed laptop mock of the website hero */}
        <RevealOnScroll className="shot shot-12" style={{aspectRatio:'16/10', background:'#FBF8F2'}}>
          <img src="assets/trs-laptop-hero.jpg" alt="The Room Society — website hero, 'Opening The Door For The Elephant'" style={{objectFit:'contain', objectPosition:'center', padding:'4%'}} />
        </RevealOnScroll>

        {/* Paired marks — full lockup on cream + TRS monogram on forest */}
        <RevealOnScroll className="shot shot-6" style={{aspectRatio:'1/1'}}>
          <img src="assets/trs-wordmark.png" alt="The Room Society — full lockup with elephant in wingback and 'where the elephant is welcome' tagline" style={{objectFit:'cover', objectPosition:'center'}} />
        </RevealOnScroll>
        <RevealOnScroll className="shot shot-6" style={{aspectRatio:'1/1', background:'#1F2C1B'}}>
          <img src="assets/trs-monogram.png" alt="The Room Society — TRS monogram logomark" style={{objectFit:'contain', objectPosition:'center', padding:'4%'}} />
        </RevealOnScroll>
      </section>
    );
  }

  if (which === 'spa-verdant') {
    return (
      <section className="project-gallery">
        {/* Row 1 — primary logotype */}
        <RevealOnScroll className="shot shot-12" style={{aspectRatio:'16/9'}}>
          <img src="assets/spa-logo-primary.png" alt="Spa Verdant — primary logotype, leaf-inspired V" style={{objectFit:'cover'}} />
        </RevealOnScroll>

        {/* Row 2 — color palette + typography */}
        <RevealOnScroll className="shot shot-6" style={{aspectRatio:'16/9'}}>
          <img src="assets/spa-palette.png" alt="Spa Verdant — color palette: Forest Green, Verdant Green, Cavern Clay, Cloud" style={{objectFit:'cover'}} />
        </RevealOnScroll>
        <RevealOnScroll className="shot shot-6" style={{aspectRatio:'16/9'}}>
          <img src="assets/spa-typography.png" alt="Spa Verdant — type system: Bone Quixote and Coco Gothic Pro" style={{objectFit:'cover'}} />
        </RevealOnScroll>

        {/* Row 3 — logo mark variants + graphic pattern */}
        <RevealOnScroll className="shot shot-6" style={{aspectRatio:'16/9'}}>
          <img src="assets/spa-logo-mark.png" alt="Spa Verdant — logomark variants" style={{objectFit:'cover'}} />
        </RevealOnScroll>
        <RevealOnScroll className="shot shot-6" style={{aspectRatio:'16/9'}}>
          <img src="assets/spa-patterns.png" alt="Spa Verdant — hand-drawn leaf and flower pattern" style={{objectFit:'cover'}} />
        </RevealOnScroll>

        {/* Row 4 — full type hierarchy 'Where Wellness Takes Root' */}
        <RevealOnScroll className="shot shot-12" style={{aspectRatio:'16/9'}}>
          <img src="assets/spa-type-hierarchy.png" alt="Spa Verdant — typographic hierarchy with the tagline 'Where Wellness Takes Root'" style={{objectFit:'cover'}} />
        </RevealOnScroll>

        {/* Row 5 — patterns applied at scale */}
        <RevealOnScroll className="shot shot-12" style={{aspectRatio:'16/9'}}>
          <img src="assets/spa-patterns-scale.png" alt="Spa Verdant — pattern applied at scale, wallpaper effect" style={{objectFit:'cover'}} />
        </RevealOnScroll>
      </section>
    );
  }

  if (which === 'summit-lake') {
    return (
      <section className="project-gallery">
        {/* Row 1 — first install: Catch of the Day + canoe overhead */}
        <RevealOnScroll className="shot shot-12" style={{aspectRatio:'16/9'}}>
          <img src="assets/summit-install-1.jpg" alt="Summit Lake Nature Center — Catch of the Day exhibit wall" style={{objectFit:'cover', objectPosition:'center'}} />
        </RevealOnScroll>

        {/* Row 2 — paired illustrations: fish + kingfisher */}
        <RevealOnScroll className="shot shot-6" style={{aspectRatio:'1/1'}}>
          <img src="assets/summit-fish.jpg" alt="Summit Lake — illustrated darter fish" style={{objectFit:'cover', objectPosition:'center'}} />
        </RevealOnScroll>
        <RevealOnScroll className="shot shot-6" style={{aspectRatio:'1/1'}}>
          <img src="assets/summit-kingfisher.jpg" alt="Summit Lake — illustrated belted kingfisher" style={{objectFit:'cover', objectPosition:'center'}} />
        </RevealOnScroll>

        {/* Row 3 — paired illustrations: osprey + turtle */}
        <RevealOnScroll className="shot shot-6" style={{aspectRatio:'1/1'}}>
          <img src="assets/summit-osprey.jpg" alt="Summit Lake — illustrated osprey" style={{objectFit:'cover', objectPosition:'center'}} />
        </RevealOnScroll>
        <RevealOnScroll className="shot shot-6" style={{aspectRatio:'1/1'}}>
          <img src="assets/summit-turtle.jpg" alt="Summit Lake — illustrated painted turtle" style={{objectFit:'cover', objectPosition:'center'}} />
        </RevealOnScroll>

        {/* Row 4 — third install: Urban Biodiversity aquarium + log stools */}
        <RevealOnScroll className="shot shot-12" style={{aspectRatio:'16/9'}}>
          <img src="assets/summit-install-3.jpeg" alt="Summit Lake Nature Center — Urban Biodiversity exhibit and gathering circle" style={{objectFit:'cover', objectPosition:'center'}} />
        </RevealOnScroll>
      </section>
    );
  }

  if (which === 'slaack') {
    return (
      <section className="project-gallery">
        {/* Row 1 — alternate wordmark, full width */}
        <RevealOnScroll className="shot shot-12" style={{aspectRatio:'16/9', background:'#a8d9dd'}}>
          <img src="assets/slaack-wordmark-alt.jpg" alt="Slaack Social Club — alternate wordmark, navy on sky" style={{objectFit:'contain', objectPosition:'center'}} />
        </RevealOnScroll>

        {/* Row 2 — tote + keychain */}
        <RevealOnScroll className="shot shot-6">
          <img src="assets/slaack-tote.jpg" alt="Slaack Social Club canvas tote" style={{objectFit:'cover', objectPosition:'center'}} />
        </RevealOnScroll>
        <RevealOnScroll className="shot shot-6">
          <img src="assets/slaack-keychain.jpg" alt="Slaack Social Club motel-style keychain" style={{objectFit:'cover', objectPosition:'center'}} />
        </RevealOnScroll>
      </section>
    );
  }

  return null;
}

// ---------- Project page ----------
function ProjectPage() {
  const [slug, setSlug] = useState(getSlug);
  const p = PROJECTS[slug] || PROJECTS['the-office-of-angela-scott'];

  useEffect(() => {
    const onPop = () => setSlug(getSlug());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <>
      <CursorFollower />
      <Header darkPage={false} />

      <main className="project-page">
        <div className="project-meta-bar">
          <a href="index.html#work" className="project-back">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13 7H1M1 7L7 1M1 7L7 13" stroke="currentColor" strokeWidth="1.4"/>
            </svg>
            Back to work
          </a>
          <span>Project · {p.year}</span>
        </div>

        {/* Title block */}
        <section className="project-hero">
          <RevealOnScroll className="project-hero-title reveal" stagger>
            <div>
              <div className="project-eyebrow">
                <span className="rule"></span>
                {p.eyebrow}
              </div>
              <h1 className="project-title">
                {p.titleParts[0]}<br/>
                <em>{p.titleParts[1]}</em>
              </h1>
            </div>
            <div className="project-tag-cluster">
              <span><strong>Industry</strong> — {p.industry}</span>
              <span><strong>Year</strong> — {p.year}</span>
              <span><strong>Scope</strong> — {p.scope}</span>
            </div>
          </RevealOnScroll>

          {p.heroPair ? (
            <div className="project-hero-image project-hero-pair reveal in">
              <img src={p.heroPair[0]} alt="" />
              <img src={p.heroPair[1]} alt="" />
            </div>
          ) : (
            <div className={`project-hero-image reveal in ${p.heroFit === 'contain' ? 'project-hero-image--contain' : ''}`}>
              <img src={p.hero} alt={p.titleParts.join(' ')} />
            </div>
          )}
        </section>

        {/* Intro / meta */}
        <section className="project-intro">
          <RevealOnScroll className="project-intro-meta reveal" stagger>
            <div className="meta-block">
              <div className="label">Client</div>
              <div className="value">{p.titleParts[0]} <em>{p.titleParts[1]}</em></div>
            </div>
            <div className="meta-block">
              <div className="label">Year</div>
              <div className="value">{p.yearLong}</div>
            </div>
            <div className="meta-block">
              <div className="label">Scope</div>
              <div className="meta-services">
                {p.scope.split('·').map((s) => <span key={s}>{s.trim()}</span>)}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="project-intro-body reveal" stagger>
            <p dangerouslySetInnerHTML={{ __html: p.intro.replace(/<em>/g, '<em>').replace(/<\/em>/g, '</em>') }} />
            <div className="body">
              {p.body.map((para, i) => (
                <p key={i} style={i < p.body.length - 1 ? {marginBottom:18} : {}}>{para}</p>
              ))}
            </div>
          </RevealOnScroll>
        </section>

        {/* Gallery */}
        <Gallery which={p.gallery} />

        {/* Quote band */}
        <section className="project-band">
          <RevealOnScroll className="reveal">
            <blockquote dangerouslySetInnerHTML={{ __html: `"${p.quote}"` }} />
            <cite dangerouslySetInnerHTML={{ __html: p.quoteAttr }} />
          </RevealOnScroll>
        </section>

        {/* Next */}
        <section className="next-project">
          {(() => {
            const nextS = nextSlug(slug);
            const np = PROJECTS[nextS];
            if (!np) return null;
            const nextTitle = (np.titleParts || []).join(' ');
            return (
              <a href={`project.html?slug=${nextS}`} className="next-project-tile" data-cursor-tile data-cursor-label="Open →">
                <div>
                  <div className="label">Next project</div>
                  <h3><em>{np.titleParts[0]}</em>{np.titleParts[1] ? ' ' + np.titleParts[1] : ''}</h3>
                </div>
                <div className="arrow">→</div>
              </a>
            );
          })()}
        </section>
      </main>

      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ProjectPage />);

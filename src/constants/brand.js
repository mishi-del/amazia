/** AMAZIA brand tokens — aligned with master.docx / template.docx */

export const TAGLINE = 'Restore. Strengthen. Reveal.'

export const BRAND_NAME = 'AMAZIA'

export const DOMAIN = 'amaziagrid.com'

export const POSITIONING = 'Barrier-support skincare. Formulated for Pakistani skin.'

/** Conversion layer: Problem → Aspiration → Promise */
export const HERO_PROBLEM =
  'Dealing with persistent dryness, redness, and barrier stress?'

export const HERO_ASPIRATION = 'Skin that feels calm, resilient, and truly healthy.'

export const HERO_HEADLINE =
  'Your skin barrier deserves the truth about what is inside.'

export const HERO_SUBHEADLINE =
  'Barrier-support skincare. Formulated for Pakistani skin. Ectoin 0.5%. Ceramide NP 2.5%.'

export const PRODUCT_BENEFITS = [
  {
    title: 'Strengthens the barrier',
    desc: 'Ceramide NP 2.5% strengthens the lipid matrix your skin needs to hold moisture in.',
  },
  {
    title: 'Calms stressed skin',
    desc: 'Ectoin 0.5% shields cells under heat, pollution, and over-treatment.',
  },
  {
    title: 'Radical transparency',
    desc: 'CoA-verified percentages on every batch — no hidden actives.',
  },
  {
    title: 'Fragrance-free comfort',
    desc: 'pH 5.2–5.5. Zero perfume. Zero essential-oil masking.',
  },
]

export const PRODUCT_TEXTURE = {
  headline: 'How it feels',
  points: [
    'Lightweight, non-sticky formula — absorbs in under 30 seconds',
    'No white cast — suitable for all Pakistani skin tones',
    'Leaves a calm, satin finish under moisturiser',
    'Layers cleanly with SPF in the morning',
  ],
}

export const HOW_TO_USE = {
  morning: [
    'Cleanse face with a gentle cleanser',
    'Apply 2–3 drops of Barrier Support Serum',
    'Follow with SPF moisturiser',
  ],
  evening: [
    'Double cleanse to remove SPF and impurities',
    'Apply Barrier Support Serum on damp skin',
    'Layer with night moisturiser or facial oil',
  ],
}

export const RELATED_PRODUCTS = [
  { name: 'Barrier Cream', price: 'Rs. 3,200', note: 'Lock in serum benefits', href: '#bundles' },
  { name: 'Amino Acid Cleanser', price: 'Rs. 1,800', note: 'Gentle pH-balanced cleanse', href: '#bundles' },
  { name: '3-Step Routine Kit', price: 'Rs. 9,800', note: 'Best value bundle', href: '#bundles', tag: 'Best value' },
]

export const ENTITY_PAGES = [
  {
    slug: 'what-is-skin-barrier',
    title: 'What Is the Skin Barrier? Pakistan Guide',
    description:
      'Learn what the skin barrier does, how it gets damaged in Pakistani climate, and how to strengthen it with evidence-backed care.',
    keyword: 'what is skin barrier',
  },
  {
    slug: 'barrier-care-serum-guide',
    title: 'Barrier Care Serum Guide — Pakistan',
    description:
      'How to choose a barrier serum in Pakistan: ectoin, ceramides, CoA transparency, and COD-friendly routines.',
    keyword: 'barrier serum pakistan',
  },
  {
    slug: 'ceramide-benefits-skin-barrier',
    title: 'Ceramide Benefits for Your Skin Barrier',
    description:
      'Why ceramide NP matters for barrier support, dry climate, and sensitive skin in Pakistan.',
    keyword: 'ceramide benefits skincare',
  },
  {
    slug: 'sensitive-skin-products-pakistan',
    title: 'Sensitive Skin Products in Pakistan',
    description:
      'Fragrance-free, pH-balanced barrier care for reactive skin — what to look for and what to avoid.',
    keyword: 'sensitive skin products pakistan',
  },
  {
    slug: 'fragrance-free-skincare-pakistan',
    title: 'Fragrance-Free Skincare Pakistan',
    description:
      'Why fragrance-free matters for barrier health and which AMAZIA formulas are certified clean.',
    keyword: 'fragrance free skincare pakistan',
  },
  {
    slug: 'ectoin-skincare-benefits',
    title: 'Ectoin Skincare Benefits — Why It Matters',
    description:
      'Ectoin explained: hydration shield, stress protection, and why Pakistani barrier care needs it.',
    keyword: 'ectoin skincare benefits',
  },
  {
    slug: 'humid-climate-skincare-pakistan',
    title: 'Skincare in Humid Pakistani Climate',
    description:
      'How heat and humidity stress your barrier — lightweight, fragrance-free routines that work in Karachi, Lahore, and beyond.',
    keyword: 'humid climate skincare pakistan',
  },
  {
    slug: 'sulfate-free-skincare-pakistan',
    title: 'Sulfate-Free Skincare Pakistan',
    description:
      'Why harsh sulfates strip the barrier and what to use instead for calm, balanced skin.',
    keyword: 'sulfate free skincare pakistan',
  },
  {
    slug: 'ph-balanced-skincare-pakistan',
    title: 'pH-Balanced Skincare for Pakistani Skin',
    description:
      'Why pH 5.2–5.5 matters for barrier health and how to build a gentle AM/PM routine.',
    keyword: 'ph balanced skincare pakistan',
  },
  {
    slug: 'over-exfoliation-damaged-barrier',
    title: 'Over-Exfoliation & Damaged Barrier Recovery',
    description:
      'Signs you have over-exfoliated, how to pause actives, and strengthen your barrier again safely.',
    keyword: 'damaged skin barrier recovery',
  },
]

export const ANNOUNCEMENT_ITEMS = [
  'Restore. Strengthen. Reveal.',
  'CoA-verified on every batch',
  'Cash on delivery nationwide',
  'Free shipping above Rs. 4,500',
  'GMP · ISO 9001 · Halal certified',
]

export const TRUST_BADGES = [
  { id: 'gmp', label: 'GMP Certified', sub: 'Good Manufacturing Practice' },
  { id: 'iso', label: 'ISO 9001:2015', sub: 'Quality management system' },
  { id: 'halal', label: 'Halal Certified', sub: 'PNAC-accredited halal body' },
  { id: 'coa', label: 'CoA on Every Batch', sub: 'Ingredient percentages verified' },
]

export const FLOATING_INGREDIENTS = [
  { text: 'Ectoin 0.5%', top: '10%', left: '-6%' },
  { text: 'Ceramide NP 2.5%', bottom: '20%', right: '-6%' },
  { text: 'Centella 1.5%', bottom: '0', left: '10%' },
]

export const PROBLEM_COPY = {
  headline: 'Your skin has been trying to tell you something.',
  body: `When moisturiser stings. When products that worked last year suddenly don't. When your skin never quite settles — that is not bad skin. That is a damaged barrier.`,
  callout:
    'AMAZIA was built to strengthen the barrier, not just mask the symptoms. Every ingredient chosen for evidence. Every percentage on the label.',
}

export const PRODUCT = {
  name: 'Barrier Support Serum',
  size: '30ml',
  price: 'Rs. 3,800',
  ph: '5.2–5.5',
  badges: ['CoA-Verified', 'Fragrance-Free', 'pH 5.2–5.5'],
  science: [
    { name: 'Ectoin', pct: '0.5%', desc: 'Cellular protectant — hydration shield under stress.' },
    { name: 'Ceramide NP', pct: '2.5%', desc: 'Strengthens the lipid barrier matrix.' },
    { name: 'Centella Asiatica', pct: '1.5%', desc: 'Soothes redness and supports calm tone.' },
    { name: 'Panthenol', pct: '1%', desc: 'Draws moisture in for immediate comfort.' },
  ],
  howToUse: [
    'Cleanse with a gentle, pH-balanced cleanser.',
    'Apply 3–4 drops on damp skin. Press into face and neck.',
    'Follow with moisturiser. Use AM and PM. SPF in the morning.',
  ],
}

export const KEY_INGREDIENTS = [
  {
    name: 'Ectoin',
    pct: '0.5%',
    function: 'Stress protection & deep hydration',
    what: 'A cellular protectant from extremophile microorganisms.',
    does: 'Forms a hydration shield — reduces water loss under stress.',
    why: 'Calms over-treated skin without weight or residue.',
  },
  {
    name: 'Ceramide NP',
    pct: '2.5%',
    function: 'Barrier lipid restoration',
    what: 'Lipids identical to those in a healthy skin barrier.',
    does: 'Seals gaps in compromised barriers, reducing TEWL and irritation.',
    why: 'The foundation of every barrier-strengthening formula we make.',
  },
  {
    name: 'Centella Asiatica',
    pct: '1.5%',
    function: 'Calm & even tone',
    what: 'A botanical used in dermatology for decades.',
    does: 'Helps skin appear calmer and supports a more even-looking tone.',
    why: 'Essential for redness-prone skin in humid climates.',
  },
  {
    name: 'Panthenol',
    pct: '1%',
    function: 'Immediate comfort',
    what: 'Pro-Vitamin B5 — a proven humectant and skin conditioner.',
    does: 'Draws moisture in while supporting the appearance of calmer skin.',
    why: 'Immediate comfort while deeper actives take effect.',
  },
]

export const FULL_INCI = `Aqua, Ectoin, Glycerin, Ceramide NP, Centella Asiatica Extract, Panthenol, Sodium Hyaluronate, Allantoin, Tocopherol, Caprylyl Glycol, Phenoxyethanol, Citric Acid, Sodium Citrate.`

export const COA_SECTION = {
  headline: 'Certificate of Analysis — on every batch',
  body: 'No Pakistani skincare brand publishes verified ingredient percentages like this. Every AMAZIA batch is tested and documented — so you know exactly what is on your skin.',
  points: [
    'Ingredient percentages verified by independent lab',
    'Batch number traceable on every bottle',
    'GMP + ISO 9001:2015 manufacturing at Nubra Inc. International',
    'Download available for each product batch when live',
  ],
  certs: [
    { label: 'GMP', value: 'ISO 22716:2007 · AMER500187' },
    { label: 'ISO', value: '9001:2015 · SSM-GMPNI-878' },
    { label: 'Halal', value: 'PS:5319-2014 · HC-26/HMNL-528' },
  ],
}

export const ROUTINE_STEPS = [
  {
    num: '01',
    title: 'Cleanse + apply',
    desc: '2–3 pumps on damp skin after cleansing. Press gently into face and neck.',
  },
  {
    num: '02',
    title: 'Strengthen — day 7',
    desc: 'Ceramides and Ectoin reinforce your barrier. Redness and tightness ease.',
  },
  {
    num: '03',
    title: 'Reveal — week 4+',
    desc: 'Consistent use leaves skin resilient, balanced, and ready for actives again.',
  },
]

export const BARRIER_SCIENCE = [
  {
    title: 'What is the barrier?',
    desc: 'The outermost layer that holds moisture in and irritants out. When it weakens, everything stings.',
  },
  {
    title: 'Why ectoin + ceramides?',
    desc: 'Ectoin shields stressed cells. Ceramide NP strengthens the lipid matrix — the duo modern barrier care is built on.',
  },
  {
    title: 'Why CoA transparency?',
    desc: 'We publish verified percentages on every batch. No hidden actives. No marketing-only labels.',
  },
]

export const BUNDLES = [
  {
    name: 'Serum only',
    price: 'Rs. 3,800',
    note: 'Barrier Support Serum · 30ml',
    tag: null,
    cta: 'Shop serum',
  },
  {
    name: 'Serum + cream',
    price: 'Rs. 6,900',
    note: 'Save Rs. 700 · Full AM/PM routine',
    tag: 'Best value',
    cta: 'Shop duo',
  },
  {
    name: 'Full routine kit',
    price: 'Rs. 9,800',
    note: 'Save Rs. 1,600 · Serum, cream & cleanser',
    tag: null,
    cta: 'Shop kit',
  },
]

export const BEFORE_AFTER_STORIES = [
  {
    name: 'Sana M.',
    skinType: 'Sensitive · Combination',
    city: 'Lahore',
    days: 21,
    quote: 'Redness around my nose calmed within two weeks. Skin feels less reactive.',
  },
  {
    name: 'Ayesha K.',
    skinType: 'Dry · Stressed barrier',
    city: 'Karachi',
    days: 14,
    quote: 'The tight feeling after washing finally went away.',
  },
  {
    name: 'Fatima R.',
    skinType: 'Oily · Acne-prone',
    city: 'Islamabad',
    days: 28,
    quote: 'One serum did more for my irritation than five others combined.',
  },
]

export const TESTIMONIALS = [
  {
    quote: 'Finally a serum that does not sting. My routine starts here now.',
    name: 'Hira A.',
    meta: 'Sensitive · Lahore',
    rating: 5,
  },
  {
    quote: 'The texture, the calm, the results — I was skeptical until week two.',
    name: 'Zainab T.',
    meta: 'Combination · Karachi',
    rating: 5,
  },
  {
    quote: 'Fragrance-free actually means fragrance-free. My skin finally relaxed.',
    name: 'Maryam S.',
    meta: 'Rosacea-prone · Rawalpindi',
    rating: 5,
  },
  {
    quote: 'COD made it easy to try. Now on my third bottle.',
    name: 'Nadia H.',
    meta: 'Dry · Islamabad',
    rating: 5,
  },
]

export const FAQS = [
  {
    q: 'Is this safe for sensitive skin?',
    a: 'Yes — fragrance-free, pH-balanced (5.2–5.5), and free of common irritants. Patch test behind the ear for 24 hours if highly reactive.',
  },
  {
    q: 'Is it truly fragrance-free?',
    a: 'Completely fragrance-free — no synthetic perfume and no essential oils used to mask scent.',
  },
  {
    q: 'How long until I see results?',
    a: 'Many notice less tightness within 7–14 days. A stronger, calmer barrier typically takes 4–6 weeks of twice-daily use.',
  },
  {
    q: 'Who should use this serum?',
    a: 'Anyone with a stressed, dehydrated, or easily irritated barrier — redness, sensitivity, or post-treatment discomfort.',
  },
  {
    q: 'Do you offer cash on delivery?',
    a: 'Yes. COD is available nationwide. No advance payment required. Pay when your order arrives.',
  },
  {
    q: 'What is your return policy?',
    a: '7-day returns on unopened or lightly tested products. Contact us on WhatsApp with your order details.',
  },
  {
    q: 'Where does AMAZIA ship?',
    a: 'We ship across Pakistan. Delivery in 3–5 business days. Free shipping on orders above Rs. 4,500.',
  },
  {
    q: 'Where in my routine should I use it?',
    a: 'After cleansing, before moisturiser — AM and PM. Use SPF in the morning.',
  },
  {
    q: 'Is it pregnancy-safe?',
    a: 'Our formula is fragrance-free and gentle, but always consult your physician before introducing new skincare during pregnancy or nursing.',
  },
  {
    q: 'Can I use it with acids or retinol?',
    a: 'Yes — once your barrier feels calmer (usually after 2–3 weeks). Introduce actives slowly and always use SPF.',
  },
  {
    q: 'What is a Certificate of Analysis (CoA)?',
    a: 'A lab document verifying the exact percentage of each active ingredient in your batch. AMAZIA publishes CoA data for every batch — rare in Pakistan.',
  },
  {
    q: 'Is AMAZIA halal certified?',
    a: 'Yes. Halal certified under PS:5319-2014 (HC-26/HMNL-528) at our GMP manufacturing facility.',
  },
  {
    q: 'Who reviews your formulas?',
    a: 'Dr. Majid Ali (Homeopathic Physician, PMDC-registered) and Dr. Iqra Sikander (Pharm D) review formulation safety and ingredient compatibility — not medical diagnosis.',
  },
]

export const FOUNDERS = {
  founder: {
    name: 'Abiha Eman Hashmi',
    role: 'Founder & Developer',
    bio: 'Built AMAZIA because she could not find a serum that told the truth about what was inside — then engineered the brand experience herself.',
  },
  reviewers: [
    {
      name: 'Dr. Majid Ali',
      role: 'Homeopathic Physician, PMDC-registered',
      note: 'Formulation safety & ingredient compatibility review',
    },
    {
      name: 'Dr. Iqra Sikander',
      role: 'Pharm D, Pharmacy Council-registered',
      note: 'Formulation safety & ingredient compatibility review',
    },
  ],
  disclaimer:
    'AMAZIA does not treat, cure, or diagnose any medical condition. For skin diseases, consult a registered medical dermatologist.',
}

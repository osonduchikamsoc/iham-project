/* =========================================================
   IHAM — PROPERTY DATA (design stage)
   Single source for the listings grid and the details page.
   When the backend lands, replace this file with a fetch()
   that returns the same shape and nothing else has to change.

   track: "property" | "land"   — the two separate offerings
   ========================================================= */

window.IHAM_PROPERTIES = [
  {
    id: "duplex-gwarinpa",
    track: "property",
    type: "Residential",
    title: "Luxury 4 Bedroom Detached Duplex",
    status: "Available",
    parking: 4,
    year: 2024,
    title_doc: "Certificate of Occupancy (C of O)",
    featured: true,
    images: [
      "assets/img/residential-property.jpg",
      "assets/img/housing-administration.jpg",
      "assets/img/property-management.jpg",
      "assets/img/management.jpg"
    ],
    summary:
      "A finished 4 bedroom detached duplex in one of Gwarinpa's most settled closes, sitting on 480 square metres with a full boys' quarters and space for four cars.",
    description:
      "This home was built for a family that wants room to breathe without leaving the city. The ground floor opens into a double-volume living area that runs through to a fitted kitchen with a separate pantry and a guest toilet tucked away from the sitting room. All four bedrooms upstairs are en-suite, and the master takes the full rear width of the house with its own lounge area and walk-in closet.\n\nThe compound is fully walled and gated with an interlocked driveway, a borehole with treatment, and a dedicated generator house. Power, water and security are all in place — the house is move-in ready today.",
    features: [
      "All rooms en-suite",
      "Fitted kitchen with pantry",
      "Boys' quarters",
      "Borehole + treatment plant",
      "Interlocked compound",
      "24/7 estate security",
      "Generator house",
      "Solar-ready wiring"
    ],
    docs: ["Certificate of Occupancy", "Registered Survey", "Deed of Assignment", "Building Approval"],
    map: "Gwarinpa Estate, Abuja, Nigeria"
  },
  {
    id: "land-kuje",
    track: "land",
    type: "Residential Land",
    title: "Premium Residential Plots — Ridgeview Estate",
    status: "Selling Fast",
    // units_left: 42,
    // payment_plan: "Up to 12 months",
    roi: "Projected 35% in 24 months",
    title_doc: "Registered Survey + Deed of Assignment",
    featured: true,
    images: [
      "assets/img/land-property.jpg",
      "assets/img/national-engagement.jpg",
      "assets/img/housing-administration-2.jpg"
    ],
    summary:
      "Dry, fenced and surveyed residential plots on the Kuje corridor — the fastest-appreciating stretch of the Abuja expansion, with a 12-month payment plan.",
    description:
      "Ridgeview sits directly along the corridor that government expansion is already moving into, which is what makes the entry price and the growth curve interesting at the same time. Every plot is dry land — no reclamation, no flood history — and the estate perimeter is already fenced with the internal road network graded.\n\nAllocation happens immediately on completion of payment, and you can take a plot on a 12-month spread without any interest loaded on top. Title is clean and transferable: registered survey and deed of assignment issued in your name.",
    features: [
      "100% dry, buildable land",
      "Perimeter already fenced",
      "Graded internal road network",
      "Immediate allocation on payment",
      "0% interest 12-month plan",
      "Free deed of assignment",
      "Estate gatehouse",
      "Drainage system in place"
    ],
    docs: ["Registered Survey Plan", "Deed of Assignment", "Estate Layout Approval", "Excision in Progress"],
    map: "Kuje, Abuja, Nigeria"
  },
  {
    id: "commercial-wuse",
    track: "property",
    type: "Commercial",
    title: "Modern Commercial Complex",
    status: "Available",
    parking: 18,
    year: 2023,
    floors: 3,
    title_doc: "Certificate of Occupancy (C of O)",
    featured: true,
    images: [
      "assets/img/commercial-property.jpg",
      "assets/img/management.jpg",
      "assets/img/property-management.jpg"
    ],
    summary:
      "A three-floor commercial building on a main Wuse 2 road with 18 parking bays, lift access and an existing tenant mix already in place.",
    description:
      "The building occupies a corner position with frontage on a main road, which is the part that cannot be replicated later. Three floors of lettable space are currently split between office suites and ground-floor retail, and the existing tenancy schedule transfers with the sale.\n\nInfrastructure is commercial-grade throughout: a passenger lift, three-phase public supply backed by a 100KVA generator, a dedicated water treatment system, and fire detection on every floor. Service charge structure and tenancy documentation are available for review on request.",
    features: [
      "Main road frontage",
      "3 lettable floors",
      "Passenger lift",
      "100KVA standby generator",
      "18 parking bays",
      "Fire detection system",
      "CCTV coverage",
      "Existing tenancy in place"
    ],
    docs: ["Certificate of Occupancy", "Registered Survey", "Building Approval", "Tenancy Schedule"],
    map: "Wuse 2, Abuja, Nigeria"
  },
  {
    id: "terrace-lekki",
    track: "property",
    type: "Residential",
    title: "3 Bedroom Terrace with BQ",
    status: "Available",
    parking: 2,
    year: 2025,
    title_doc: "Governor's Consent",
    featured: false,
    images: [
      "assets/img/3 Bedroom Terrace with BQ.jpeg",
      "assets/img/housing-administration.jpg",
      "assets/img/residential-property.jpg"
      
     

    ],
    summary:
      "A newly completed 3 bedroom terrace in a serviced Lekki Phase 1 close, with a boys' quarters and estate-managed power and security.",
    description:
      "Newly completed and never lived in. The terrace runs three bedrooms across two floors with a separate boys' quarters at the rear, and the finishing is a step above the usual estate spec — porcelain throughout the ground floor, solid doors, and a fully fitted kitchen with built-in oven and hob.\n\nThe close is serviced, so power, water, waste and security run on a managed monthly service charge rather than falling to you individually. Governor's Consent is in place and transferable.",
    features: [
      "Newly completed",
      "Boys' quarters",
      "Fitted kitchen with appliances",
      "Serviced estate",
      "Estate power supply",
      "Gated with 24/7 security",
      "Porcelain floor finish",
      "Treated water supply"
    ],
    docs: ["Governor's Consent", "Registered Survey", "Deed of Assignment", "Building Approval"],
    map: "Lekki Phase 1, Lagos, Nigeria"
  },
  {
    id: "land-epe",
    track: "land",
    type: "Investment Land",
    title: "Harvest Gardens Investment Plots",
    status: "Selling Fast",
    // units_left: 0,
    // payment_plan: "Up to 18 months",
    roi: "Projected 45% in 24 months",
    title_doc: "Registered Survey + Deed of Assignment",
    featured: true,
    images: [
      "assets/img/Harvest Gardens Investment Plots.jpeg",
      "assets/img/national-engagement.jpg",
      "assets/img/land-property.jpg"
      
      
    ],
    summary:
      "Entry-level investment plots on the Epe corridor, within reach of the Lekki Free Trade Zone and the new airport — an 18-month plan with the lowest entry price we carry.",
    description:
      "Epe is where the Lagos growth story is currently being written. Harvest Gardens sits within the catchment of the Lekki Free Trade Zone, the Dangote Refinery and the proposed international airport, which is what drives the appreciation projection rather than anything speculative on our part.\n\nThis is our lowest entry point, deliberately — it is structured so a first-time investor can start with one plot on an 18-month spread and add more as they go. Land is dry and gently sloping, with survey and deed issued per plot on completion.",
    features: [
      "Lowest entry price",
      "18-month payment spread",
      "Dry, gently sloping terrain",
      "Near Lekki Free Trade Zone",
      "Survey + deed per plot",
      "Estate layout approved",
      "Buy-back option available",
      "Free site inspection"
    ],
    docs: ["Registered Survey Plan", "Deed of Assignment", "Estate Layout Approval"],
    map: "Epe, Lagos, Nigeria"
  },
  {
    id: "bungalow-kubwa",
    track: "property",
    type: "Residential",
    title: "3 Bedroom Semi-Detached Bungalow",
    status: "Under Offer",
    parking: 2,
    year: 2022,
    title_doc: "Certificate of Occupancy (C of O)",
    featured: false,
    images: [
      "assets/img/3 Bedroom Semi-Detached Bungalow.jpeg",
      "assets/img/housing-administration.jpg",
      "assets/img/residential-property.jpg"
    ],
    summary:
      "A well-kept 3 bedroom semi-detached bungalow in Kubwa on 320 square metres, priced for a first-time buyer or a rental investor.",
    description:
      "A sensible first home. Three bedrooms on a single level with the master en-suite, a shared family bathroom, and an open living and dining area that takes good light from the front. The kitchen is fitted with a small store attached.\n\nThe property has been owner-occupied and maintained since completion, so there is no renovation work waiting for you. The compound takes two cars comfortably with a small garden to the rear. C of O is in place. Currently under offer — register your interest and we will notify you if it returns to market.",
    features: [
      "Master en-suite",
      "Fitted kitchen with store",
      "Rear garden",
      "Owner-occupied, well maintained",
      "Walled and gated compound",
      "Borehole",
      "Tarred access road",
      "C of O in place"
    ],
    docs: ["Certificate of Occupancy", "Registered Survey", "Deed of Assignment"],
    map: "Kubwa, Abuja, Nigeria"
  }
];

/* --- Training programmes (drives training.html + the apply form) --- */
window.IHAM_PROGRAMS = [
  {
    id: "housing-mgmt",
    title: "Housing Management & Practice",
    fee: 450000,
    duration: "12 weeks",
    mode: "Online",
    intake: "15 October 2026",
    summary:
      "The core certification. Estate operations, tenant administration, rent management and the statutory framework a practising housing manager works inside.",
    outline: [
      "Principles of housing administration",
      "Tenant selection and management",
      "Rent assessment and collection",
      "Estate maintenance planning",
      "Housing law and statutory duties",
      "Practical case work and assessment"
    ]
  },
  {
    id: "facility-safety",
    title: "Facility & Safety Compliance",
    fee: 600000,
    duration: "10 weeks",
    mode: "Hybrid",
    intake: "1 November 2026",
    summary:
      "Technical training on regulatory building safety standards, asset maintenance regimes and the compliance reporting facility managers are held to.",
    outline: [
      "Building safety regulation",
      "Fire safety and emergency planning",
      "Planned preventive maintenance",
      "Asset lifecycle and costing",
      "Contractor management",
      "Compliance audit and reporting"
    ]
  },
  {
    id: "real-estate-finance",
    title: "Real Estate Financial Leadership",
    fee: 850000,
    duration: "8 weeks",
    mode: "Physical",
    intake: "20 November 2026",
    summary:
      "An executive course on valuation, development budgeting, investment appraisal and risk mitigation — built for people who sign off on the numbers.",
    outline: [
      "Property valuation methods",
      "Development appraisal and feasibility",
      "Investment analysis and yields",
      "Development finance structures",
      "Portfolio risk management",
      "Board-level reporting"
    ]
  }
];
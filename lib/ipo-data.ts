import { fetchLiveIpos, type LiveIpo } from "./live-ipo"

export type IpoItem = {
  slug: string
  name: string
  category: "Mainboard" | "SME Board"
  status: "ongoing" | "upcoming" | "recent"
  priceBand: string
  lotSize: number
  minInvestment: string
  issueSize: string
  freshIssue: string
  ofs: string
  openDate: string
  closeDate: string
  allotmentDate: string
  listingDate: string
  subscription: {
    qib: string
    nii: string
    retail: string
    total: string
  }
  listingGains?: string
  listingPrice?: string
  verdict: {
    coreBusiness: string
    theFlex: string
    theRedFlags: string
  }
  financials: Array<{
    year: string
    revenue: string
    pat: string
    margin: string
  }>
  registrarName: string
  registrarUrl: string
  drhpUrl: string
}

export const REAL_IPO_REGISTRY: IpoItem[] = [
  // --- REAL ONGOING ISSUES (SEP 2026) ---
  {
    slug: "prasol-chemicals",
    name: "Prasol Chemicals Limited",
    category: "Mainboard",
    status: "ongoing",
    priceBand: "₹643 - ₹676",
    lotSize: 22,
    minInvestment: "₹14,872",
    issueSize: "₹800.00 Cr",
    freshIssue: "₹500.00 Cr",
    ofs: "₹300.00 Cr",
    openDate: "08 Sep, 2026",
    closeDate: "10 Sep, 2026",
    allotmentDate: "11 Sep, 2026",
    listingDate: "15 Sep, 2026",
    subscription: {
      qib: "Awaiting",
      nii: "Awaiting",
      retail: "0.17x",
      total: "0.17x",
    },
    verdict: {
      coreBusiness:
        "One of India's leading manufacturers of specialty chemicals, phosphorus derivatives, and acetone derivatives used in agrochemicals, lubricants, and pharmaceuticals.",
      theFlex:
        "Global supplier base across North America and Europe. High import substitution tailwinds under Make In India and high barriers to entry in complex organophosphorus chemistry.",
      theRedFlags:
        "High customer concentration: top 10 clients drive ~54% of revenue. Vulnerable to raw material acetone and phosphorus price volatility.",
    },
    financials: [
      { year: "FY24", revenue: "₹801 Cr", pat: "₹66 Cr", margin: "8.2%" },
      { year: "FY25", revenue: "₹912 Cr", pat: "₹84 Cr", margin: "9.2%" },
      { year: "FY26 (H1)", revenue: "₹510 Cr", pat: "₹53 Cr", margin: "10.4%" },
    ],
    registrarName: "Link Intime India Pvt Ltd",
    registrarUrl: "https://linkintime.co.in/initial_offer/public-issues.html",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues",
  },
  {
    slug: "glass-wall-systems",
    name: "Glass Wall Systems (India) Limited",
    category: "Mainboard",
    status: "ongoing",
    priceBand: "₹172 - ₹182",
    lotSize: 82,
    minInvestment: "₹14,924",
    issueSize: "₹427.89 Cr",
    freshIssue: "₹300.00 Cr",
    ofs: "₹127.89 Cr",
    openDate: "08 Sep, 2026",
    closeDate: "10 Sep, 2026",
    allotmentDate: "11 Sep, 2026",
    listingDate: "15 Sep, 2026",
    subscription: {
      qib: "Awaiting",
      nii: "Awaiting",
      retail: "0.95x",
      total: "0.95x",
    },
    verdict: {
      coreBusiness:
        "Pioneer in architectural glass facades, curtain walls, and exterior fenestration systems for commercial skyscrapers and airport infrastructure across India.",
      theFlex:
        "Market leader in Indian facade engineering with marquee clients including DLF, Reliance, and Brookfield. Massive commercial real estate boom provides multi-year execution visibility.",
      theRedFlags:
        "Working capital heavy EPC operations. Project execution delays or real estate slowdowns could stretch debtor days beyond 120 days.",
    },
    financials: [
      { year: "FY24", revenue: "₹495 Cr", pat: "₹38 Cr", margin: "7.7%" },
      { year: "FY25", revenue: "₹612 Cr", pat: "₹51 Cr", margin: "8.3%" },
      { year: "FY26 (H1)", revenue: "₹340 Cr", pat: "₹31 Cr", margin: "9.1%" },
    ],
    registrarName: "KFin Technologies Limited",
    registrarUrl: "https://kprism.kfintech.com/ipostatus/",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues",
  },
  {
    slug: "kanohar-electricals",
    name: "Kanohar Electricals Limited",
    category: "Mainboard",
    status: "ongoing",
    priceBand: "₹601 - ₹632",
    lotSize: 23,
    minInvestment: "₹14,536",
    issueSize: "₹1,055.74 Cr",
    freshIssue: "₹750.00 Cr",
    ofs: "₹305.74 Cr",
    openDate: "08 Sep, 2026",
    closeDate: "10 Sep, 2026",
    allotmentDate: "11 Sep, 2026",
    listingDate: "15 Sep, 2026",
    subscription: {
      qib: "Awaiting",
      nii: "Awaiting",
      retail: "1.11x",
      total: "1.11x",
    },
    verdict: {
      coreBusiness:
        "High-voltage transformer and electrical grid equipment manufacturer serving State Electricity Boards, Power Grid Corporation of India, and renewable energy substations.",
      theFlex:
        "Riding the mega capex wave of India's power grid modernisation and renewable solar/wind integration. Order book stands at over ₹2,400 Cr.",
      theRedFlags:
        "High exposure to government power utilities and tender-based pricing pressure. Copper and cold-rolled steel price spikes could compress gross margins.",
    },
    financials: [
      { year: "FY24", revenue: "₹720 Cr", pat: "₹62 Cr", margin: "8.6%" },
      { year: "FY25", revenue: "₹895 Cr", pat: "₹88 Cr", margin: "9.8%" },
      { year: "FY26 (H1)", revenue: "₹520 Cr", pat: "₹59 Cr", margin: "11.3%" },
    ],
    registrarName: "Link Intime India Pvt Ltd",
    registrarUrl: "https://linkintime.co.in/initial_offer/public-issues.html",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues",
  },
  {
    slug: "pranav-constructions",
    name: "Pranav Constructions Limited",
    category: "Mainboard",
    status: "ongoing",
    priceBand: "₹118 - ₹124",
    lotSize: 120,
    minInvestment: "₹14,880",
    issueSize: "₹351.03 Cr",
    freshIssue: "₹250.00 Cr",
    ofs: "₹101.03 Cr",
    openDate: "07 Sep, 2026",
    closeDate: "09 Sep, 2026",
    allotmentDate: "10 Sep, 2026",
    listingDate: "14 Sep, 2026",
    subscription: {
      qib: "0.10x",
      nii: "4.34x",
      retail: "3.05x",
      total: "2.67x",
    },
    verdict: {
      coreBusiness:
        "Specialized redevelopment and civil infrastructure developer in the Mumbai Metropolitan Region (MMR), focusing on society redevelopments and slum rehabilitation.",
      theFlex:
        "Asset-light joint development model with zero land acquisition debt. Rapid turnaround cycle in prime western suburban micro-markets.",
      theRedFlags:
        "Heavy geographical concentration restricted entirely to Mumbai. Regulatory approvals and tenant litigation can stall project handover timelines.",
    },
    financials: [
      { year: "FY24", revenue: "₹290 Cr", pat: "₹34 Cr", margin: "11.7%" },
      { year: "FY25", revenue: "₹385 Cr", pat: "₹49 Cr", margin: "12.7%" },
      { year: "FY26 (H1)", revenue: "₹220 Cr", pat: "₹30 Cr", margin: "13.6%" },
    ],
    registrarName: "Bigshare Services Pvt Ltd",
    registrarUrl: "https://www.bigshareonline.com/ipo_Allotment.html",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues",
  },

  // --- REAL UPCOMING ISSUES (OPENING SEP 09 - 11, 2026) ---
  {
    slug: "asset-reconstruction-company",
    name: "Asset Reconstruction Company India Ltd (ARCIL)",
    category: "Mainboard",
    status: "upcoming",
    priceBand: "₹132 - ₹139",
    lotSize: 107,
    minInvestment: "₹14,873",
    issueSize: "₹732.97 Cr",
    freshIssue: "₹500.00 Cr",
    ofs: "₹232.97 Cr",
    openDate: "09 Sep, 2026",
    closeDate: "11 Sep, 2026",
    allotmentDate: "14 Sep, 2026",
    listingDate: "17 Sep, 2026",
    subscription: {
      qib: "Awaiting",
      nii: "Awaiting",
      retail: "Awaiting",
      total: "Opening Tomorrow",
    },
    verdict: {
      coreBusiness:
        "India's oldest asset reconstruction company (ARC), sponsored by marquee PSU and private banks (SBI, IDBI, ICICI, PNB) to resolve stressed corporate assets.",
      theFlex:
        "Pioneer institutional backing, seasoned resolution track record with over ₹30,000 Cr in resolved NPAs, and direct beneficiary of IBC insolvency reforms.",
      theRedFlags:
        "Complex resolution timelines and legal court stays under NCLT. Stiff competition from National Asset Reconstruction Company (NARCL / Bad Bank).",
    },
    financials: [
      { year: "FY24", revenue: "₹415 Cr", pat: "₹92 Cr", margin: "22.1%" },
      { year: "FY25", revenue: "₹520 Cr", pat: "₹124 Cr", margin: "23.8%" },
      { year: "FY26 (Est)", revenue: "₹610 Cr", pat: "₹155 Cr", margin: "25.4%" },
    ],
    registrarName: "Link Intime India Pvt Ltd",
    registrarUrl: "https://linkintime.co.in/initial_offer/public-issues.html",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues",
  },
  {
    slug: "karamtara-engineering",
    name: "Karamtara Engineering Limited",
    category: "Mainboard",
    status: "upcoming",
    priceBand: "₹241 - ₹254",
    lotSize: 59,
    minInvestment: "₹14,986",
    issueSize: "₹875.00 Cr",
    freshIssue: "₹600.00 Cr",
    ofs: "₹275.00 Cr",
    openDate: "09 Sep, 2026",
    closeDate: "11 Sep, 2026",
    allotmentDate: "14 Sep, 2026",
    listingDate: "17 Sep, 2026",
    subscription: {
      qib: "Awaiting",
      nii: "Awaiting",
      retail: "Awaiting",
      total: "Opening Tomorrow",
    },
    verdict: {
      coreBusiness:
        "Integrated manufacturer of transmission line towers, structural steel profiles, fasteners, and OPGW solar mounting hardware.",
      theFlex:
        "Global footprint spanning 45+ countries. Direct beneficiary of global green energy transmission grids and interstate power corridor upgrades.",
      theRedFlags:
        "High raw material sensitivity to domestic steel and zinc prices. Export geopolitical friction and currency exchange rate volatility.",
    },
    financials: [
      { year: "FY24", revenue: "₹1,850 Cr", pat: "₹102 Cr", margin: "5.5%" },
      { year: "FY25", revenue: "₹2,210 Cr", pat: "₹138 Cr", margin: "6.2%" },
      { year: "FY26 (Est)", revenue: "₹2,580 Cr", pat: "₹172 Cr", margin: "6.7%" },
    ],
    registrarName: "Bigshare Services Pvt Ltd",
    registrarUrl: "https://www.bigshareonline.com/ipo_Allotment.html",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues",
  },
  {
    slug: "lcc-projects",
    name: "Lcc Projects Limited",
    category: "Mainboard",
    status: "upcoming",
    priceBand: "₹139 - ₹146",
    lotSize: 102,
    minInvestment: "₹14,892",
    issueSize: "₹427.14 Cr",
    freshIssue: "₹320.00 Cr",
    ofs: "₹107.14 Cr",
    openDate: "09 Sep, 2026",
    closeDate: "11 Sep, 2026",
    allotmentDate: "14 Sep, 2026",
    listingDate: "17 Sep, 2026",
    subscription: {
      qib: "Awaiting",
      nii: "Awaiting",
      retail: "Awaiting",
      total: "Opening Tomorrow",
    },
    verdict: {
      coreBusiness:
        "EPC contractor undertaking irrigation canals, water treatment plants, urban wastewater piping, and highway civil infrastructure across Western India.",
      theFlex:
        "High qualification thresholds in government state tenders (Gujarat, Rajasthan). Order book of ₹3,100 Cr gives 3.5x revenue coverage.",
      theRedFlags:
        "Client concentration on state government urban bodies with potential delays in milestone payment releases.",
    },
    financials: [
      { year: "FY24", revenue: "₹760 Cr", pat: "₹58 Cr", margin: "7.6%" },
      { year: "FY25", revenue: "₹910 Cr", pat: "₹74 Cr", margin: "8.1%" },
      { year: "FY26 (Est)", revenue: "₹1,090 Cr", pat: "₹96 Cr", margin: "8.8%" },
    ],
    registrarName: "KFin Technologies Limited",
    registrarUrl: "https://kprism.kfintech.com/ipostatus/",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues",
  },

  // --- REAL RECENT LISTINGS (DEBUTED TODAY SEP 08, 2026) ---
  {
    slug: "deepa-jewellers",
    name: "Deepa Jewellers Limited",
    category: "Mainboard",
    status: "recent",
    priceBand: "₹177",
    lotSize: 84,
    minInvestment: "₹14,868",
    issueSize: "₹459.72 Cr",
    freshIssue: "₹350.00 Cr",
    ofs: "₹109.72 Cr",
    openDate: "01 Sep, 2026",
    closeDate: "03 Sep, 2026",
    allotmentDate: "04 Sep, 2026",
    listingDate: "08 Sep, 2026 (Today)",
    subscription: {
      qib: "52.40x",
      nii: "68.10x",
      retail: "28.30x",
      total: "42.61x",
    },
    listingGains: "+14.8% Pop",
    listingPrice: "₹203.25",
    verdict: {
      coreBusiness:
        "Regional retail gold, diamond, and bridal jewelry chain operating across Tier-2/3 cities with strong brand loyalty and expanding showroom network.",
      theFlex:
        "Shift from unorganized jewelers to hallmarked, trusted retail brands. Festive and wedding season tailwinds driving Q3/Q4 volume surge.",
      theRedFlags:
        "High inventory carrying costs and gold price volatility. Working capital limits closely linked to bank gold metal loan (GML) rates.",
    },
    financials: [
      { year: "FY24", revenue: "₹1,120 Cr", pat: "₹64 Cr", margin: "5.7%" },
      { year: "FY25", revenue: "₹1,380 Cr", pat: "₹88 Cr", margin: "6.4%" },
      { year: "FY26 (H1)", revenue: "₹810 Cr", pat: "₹56 Cr", margin: "6.9%" },
    ],
    registrarName: "Bigshare Services Pvt Ltd",
    registrarUrl: "https://www.bigshareonline.com/ipo_Allotment.html",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues",
  },
  {
    slug: "rays-of-belief",
    name: "Rays of Belief Limited",
    category: "Mainboard",
    status: "recent",
    priceBand: "₹239",
    lotSize: 62,
    minInvestment: "₹14,818",
    issueSize: "₹125.00 Cr",
    freshIssue: "₹125.00 Cr",
    ofs: "₹0.00 Cr",
    openDate: "01 Sep, 2026",
    closeDate: "03 Sep, 2026",
    allotmentDate: "04 Sep, 2026",
    listingDate: "08 Sep, 2026 (Today)",
    subscription: {
      qib: "112.50x",
      nii: "148.20x",
      retail: "78.40x",
      total: "107.71x",
    },
    listingGains: "-3.6% Dip",
    listingPrice: "₹230.50",
    verdict: {
      coreBusiness:
        "Fast-growing B2B renewable rooftop solar engineering and distributed clean energy solutions provider.",
      theFlex:
        "Massive corporate decarbonisation mandates and high return on equity (ROE > 22%). Record 107.7x retail and institutional subscription demand.",
      theRedFlags:
        "Subdued debut listing price discovery (-3.6%) despite high subscription hype. Solar module import tariffs affect project margin execution.",
    },
    financials: [
      { year: "FY24", revenue: "₹240 Cr", pat: "₹26 Cr", margin: "10.8%" },
      { year: "FY25", revenue: "₹360 Cr", pat: "₹44 Cr", margin: "12.2%" },
    ],
    registrarName: "KFin Technologies Limited",
    registrarUrl: "https://kprism.kfintech.com/ipostatus/",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues",
  },
  {
    slug: "farm-peace",
    name: "Farm Peace Limited",
    category: "SME Board",
    status: "recent",
    priceBand: "₹59",
    lotSize: 2000,
    minInvestment: "₹1,18,000",
    issueSize: "₹18.50 Cr",
    freshIssue: "₹18.50 Cr",
    ofs: "₹0.00 Cr",
    openDate: "02 Sep, 2026",
    closeDate: "04 Sep, 2026",
    allotmentDate: "05 Sep, 2026",
    listingDate: "08 Sep, 2026 (Today)",
    subscription: {
      qib: "Awaiting",
      nii: "1.25x",
      retail: "1.10x",
      total: "1.15x",
    },
    listingGains: "+5.2% Pop",
    listingPrice: "₹62.00",
    verdict: {
      coreBusiness:
        "Organic agro-processing and direct farm-to-warehouse cold supply chain enterprise specializing in pulses and organic grains.",
      theFlex:
        "Direct procurement from 12,000+ certified farmers. Rising consumer adoption of organic certified staple foods.",
      theRedFlags:
        "SME board listing with lower liquidity and 2,000-share minimum trading lots. Monsoon rainfall risk and commodity price fluctuations.",
    },
    financials: [
      { year: "FY24", revenue: "₹72 Cr", pat: "₹6.8 Cr", margin: "9.4%" },
      { year: "FY25", revenue: "₹94 Cr", pat: "₹9.2 Cr", margin: "9.8%" },
    ],
    registrarName: "Bigshare Services Pvt Ltd",
    registrarUrl: "https://www.bigshareonline.com/ipo_Allotment.html",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues",
  },
]

export function getAllIpos(): IpoItem[] {
  return REAL_IPO_REGISTRY
}

export function getIpoBySlug(slug: string): IpoItem | undefined {
  return REAL_IPO_REGISTRY.find((item) => item.slug === slug)
}

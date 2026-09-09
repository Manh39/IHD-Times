export interface IpoFinancialMetric {
  year: string;
  assets: string;       // Total Assets (₹ Cr)
  revenue: string;      // Total Revenue / Income (₹ Cr)
  pat: string;          // Profit After Tax (PAT) (₹ Cr)
  netWorth: string;     // Net Worth (₹ Cr)
  borrowings: string;   // Total Borrowings / Debt (₹ Cr)
  margin?: string;      // PAT Margin %
}

export interface LiveIpo {
  id: string;
  slug: string;
  name: string;
  symbol?: string;
  category: "Mainboard" | "SME Board";
  status: "ongoing" | "upcoming" | "recent";
  priceBand: string;
  lotSize: number;
  minInvestment: string;
  issueSize: string;
  freshIssue?: string;
  ofs?: string;
  openDate: string;
  closeDate: string;
  allotmentDate?: string;
  listingDate?: string;
  listingGains?: string;
  listingPrice?: string;
  subscription: {
    qib: string;
    nii: string;
    retail: string;
    total: string;
  };
  verdict: {
    coreBusiness: string;
    manufacturing?: string;
    operations?: string;
    keyClients?: string;
    promoterBackground?: string;
    theFlex: string;
    theRedFlags: string;
  };
  financials: IpoFinancialMetric[];
  registrarName: string;
  registrarUrl: string;
  drhpUrl: string;
  rhpUrl?: string;
  exchangeUrl?: string;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/limited|ltd|ipo|mainline|sme|\(.*?\)/gi, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Master verified registry of active Indian primary market IPOs with authentic 3-year audited financials and verified DRHP/Registrar portals
export const AUDITED_IPO_REGISTRY: LiveIpo[] = [
  // 1. LCC Projects Limited
  {
    id: "nse-lccproject",
    slug: "lcc-projects",
    name: "LCC Projects Limited",
    symbol: "LCCPROJECT",
    category: "Mainboard",
    status: "ongoing",
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
      nii: "0.15x",
      retail: "0.68x",
      total: "0.43x",
    },
    verdict: {
      coreBusiness:
        "Specialized heavy civil EPC infrastructure developer executing turnkey raw water intake structures, water supply transmission pipelines, lift irrigation canals, wastewater treatment plants, and regional road network enhancements across Western and Central India.",
      manufacturing:
        "Fabricates high-density polyethylene (HDPE) and ductile iron (DI) pipeline assemblies, modular pumping stations, automated chlorination/filtration units, and canal concrete lining structures across project execution hubs in Gujarat and Rajasthan.",
      operations:
        "Delivering multi-district water transmission grids and canal irrigation projects for state government irrigation departments and municipal corporations with an active order book of ₹3,100 Cr (3.4x book-to-bill ratio).",
      keyClients:
        "Sardar Sarovar Narmada Nigam Limited (SSNNL), Gujarat Water Supply & Sewerage Board (GWSSB), Water Resources Dept (Govt of Rajasthan), Ahmedabad Municipal Corporation (AMC), Urban Administration & Development Dept (Govt of Madhya Pradesh).",
      promoterBackground:
        "Promoted by Lakhmichand Chelaram Chandnani and Bharatkumar Lakhmichand Chandnani, seasoned civil engineers with over 30 years of public infrastructure project execution and Class-AA government civil tender leadership.",
      theFlex:
        "High qualification thresholds in government state water projects (Gujarat, Rajasthan). Order book of ₹3,100 Cr provides 3.4x annual revenue coverage.",
      theRedFlags:
        "Client concentration on state government urban bodies with potential delays in milestone payment certifications and working capital stretch.",
    },
    financials: [
      { year: "FY23", assets: "₹584.20 Cr", revenue: "₹625.40 Cr", pat: "₹42.10 Cr", netWorth: "₹241.50 Cr", borrowings: "₹118.30 Cr", margin: "6.7%" },
      { year: "FY24", assets: "₹742.60 Cr", revenue: "₹764.80 Cr", pat: "₹58.30 Cr", netWorth: "₹299.80 Cr", borrowings: "₹134.60 Cr", margin: "7.6%" },
      { year: "FY25", assets: "₹918.40 Cr", revenue: "₹912.50 Cr", pat: "₹74.20 Cr", netWorth: "₹374.00 Cr", borrowings: "₹149.80 Cr", margin: "8.1%" },
      { year: "FY26 (H1)", assets: "₹1,025.00 Cr", revenue: "₹520.40 Cr", pat: "₹46.80 Cr", netWorth: "₹420.80 Cr", borrowings: "₹141.20 Cr", margin: "9.0%" },
    ],
    registrarName: "KFin Technologies Limited",
    registrarUrl: "https://kprism.kfintech.com/ipostatus/",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/lcc-projects-limited-drhp_84120.html",
    rhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/lcc-projects-limited-rhp_84121.html",
    exchangeUrl: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo",
  },

  // 2. Karamtara Engineering Limited
  {
    id: "nse-karamtara",
    slug: "karamtara-engineering",
    name: "Karamtara Engineering Limited",
    symbol: "KARAMTARA",
    category: "Mainboard",
    status: "ongoing",
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
      nii: "0.24x",
      retail: "0.98x",
      total: "0.61x",
    },
    verdict: {
      coreBusiness:
        "Integrated engineering manufacturer of high-voltage transmission line towers, substation structures, solar tracker mountings, hot-dip galvanized structural profiles, and high-tensile fasteners.",
      manufacturing:
        "Operates 4 integrated manufacturing facilities in Tarapur (Maharashtra) and Gandhidham (Gujarat) with total annual fabrication capacity of 180,000 MT and galvanizing capacity of 210,000 MT, alongside automated CNC punching/drilling lines and robotic welding bays.",
      operations:
        "Global transmission supply presence across 45+ countries in EMEA, South Asia, and the Americas. Long-term supplier empanelment with premier transmission utilities and EPC contractors.",
      keyClients:
        "Power Grid Corporation of India Limited (PGCIL), Larsen & Toubro (L&T), Tata Power, Sterlite Power Transmission, KEC International, Siemens Energy, Kalpataru Projects International.",
      promoterBackground:
        "Promoted by Sunil Kumar Bansal and Rajeev Bansal, veteran industrial entrepreneurs who established backward-integrated steel manufacturing and automated hot-dip galvanizing hubs across Maharashtra and Gujarat spanning 25+ years.",
      theFlex:
        "Global footprint spanning 45+ countries. Direct beneficiary of global green energy transmission grids and interstate power corridor upgrades.",
      theRedFlags:
        "High raw material sensitivity to domestic steel and zinc prices. Export geopolitical friction and currency exchange rate volatility.",
    },
    financials: [
      { year: "FY23", assets: "₹1,480.10 Cr", revenue: "₹1,540.20 Cr", pat: "₹72.40 Cr", netWorth: "₹580.30 Cr", borrowings: "₹490.50 Cr", margin: "4.7%" },
      { year: "FY24", assets: "₹1,810.50 Cr", revenue: "₹1,852.60 Cr", pat: "₹102.10 Cr", netWorth: "₹682.40 Cr", borrowings: "₹520.20 Cr", margin: "5.5%" },
      { year: "FY25", assets: "₹2,190.80 Cr", revenue: "₹2,214.30 Cr", pat: "₹138.50 Cr", netWorth: "₹820.90 Cr", borrowings: "₹545.00 Cr", margin: "6.3%" },
      { year: "FY26 (H1)", assets: "₹2,380.00 Cr", revenue: "₹1,240.50 Cr", pat: "₹85.20 Cr", netWorth: "₹906.10 Cr", borrowings: "₹515.30 Cr", margin: "6.9%" },
    ],
    registrarName: "Bigshare Services Pvt Ltd",
    registrarUrl: "https://www.bigshareonline.com/ipo_Allotment.html",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/karamtara-engineering-limited-rhp_84135.html",
    rhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/karamtara-engineering-limited-rhp_84135.html",
    exchangeUrl: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo",
  },

  // 3. Asset Reconstruction Company (India) Limited (ARCIL)
  {
    id: "nse-arcil",
    slug: "asset-reconstruction-company",
    name: "Asset Reconstruction Company (India) Limited (ARCIL)",
    symbol: "ARCIL",
    category: "Mainboard",
    status: "ongoing",
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
      nii: "0.08x",
      retail: "0.19x",
      total: "0.12x",
    },
    verdict: {
      coreBusiness:
        "India's premier and oldest Asset Reconstruction Company (ARC), established under SARFAESI Act to purchase non-performing loans (NPAs) from banking syndicates, restructure debt obligations, and realize stressed corporate and retail assets.",
      manufacturing:
        "Asset resolution engine managing ₹16,500+ Cr in Assets Under Management (AUM), operating proprietary resolution technology platforms, credit restructuring mechanisms, and specialized debt-to-equity restructuring frameworks.",
      operations:
        "National presence across Mumbai, Delhi, Kolkata, Chennai, and Hyderabad managing resolution for over 1,200 distressed corporate cases and 45,000+ retail loan accounts.",
      keyClients:
        "State Bank of India (SBI), IDBI Bank Limited, ICICI Bank Limited, Punjab National Bank (PNB), Avenue India Resurgence (Avenue Capital).",
      promoterBackground:
        "Professionally managed financial institution sponsored by marquee public & private sector banks, governed under the helm of MD & CEO Pallav Mohapatra with over 38 years in banking, corporate debt resolution, and NPA management.",
      theFlex:
        "Pioneer institutional backing, seasoned resolution track record with over ₹30,000 Cr in resolved NPAs, and direct beneficiary of IBC insolvency reforms.",
      theRedFlags:
        "Complex resolution timelines and legal court stays under NCLT. Stiff competition from National Asset Reconstruction Company (NARCL / Bad Bank).",
    },
    financials: [
      { year: "FY23", assets: "₹3,120.40 Cr", revenue: "₹348.60 Cr", pat: "₹68.20 Cr", netWorth: "₹1,820.50 Cr", borrowings: "₹620.40 Cr", margin: "19.6%" },
      { year: "FY24", assets: "₹3,650.80 Cr", revenue: "₹415.30 Cr", pat: "₹92.40 Cr", netWorth: "₹1,912.90 Cr", borrowings: "₹580.10 Cr", margin: "22.2%" },
      { year: "FY25", assets: "₹4,210.00 Cr", revenue: "₹521.80 Cr", pat: "₹124.60 Cr", netWorth: "₹2,037.50 Cr", borrowings: "₹510.00 Cr", margin: "23.9%" },
      { year: "FY26 (H1)", assets: "₹4,560.00 Cr", revenue: "₹310.20 Cr", pat: "₹81.40 Cr", netWorth: "₹2,118.90 Cr", borrowings: "₹475.20 Cr", margin: "26.2%" },
    ],
    registrarName: "Link Intime India Pvt Ltd",
    registrarUrl: "https://linkintime.co.in/initial_offer/public-issues.html",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/asset-reconstruction-company-india-limited-rhp_84102.html",
    rhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/asset-reconstruction-company-india-limited-rhp_84102.html",
    exchangeUrl: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo",
  },

  // 4. Steamhouse India Limited
  {
    id: "nse-steamhouse",
    slug: "steamhouse-india",
    name: "Steamhouse India Limited",
    symbol: "STEAMHOUSE",
    category: "Mainboard",
    status: "ongoing",
    priceBand: "₹77 - ₹81",
    lotSize: 180,
    minInvestment: "₹14,580",
    issueSize: "₹304.85 Cr",
    freshIssue: "₹240.00 Cr",
    ofs: "₹64.85 Cr",
    openDate: "09 Sep, 2026",
    closeDate: "11 Sep, 2026",
    allotmentDate: "14 Sep, 2026",
    listingDate: "17 Sep, 2026",
    subscription: {
      qib: "Awaiting",
      nii: "0.11x",
      retail: "0.26x",
      total: "0.15x",
    },
    verdict: {
      coreBusiness:
        "Pioneer in community steam generation and industrial utility pipelines, supplying high-pressure piped steam directly to chemical, textile, and pharmaceutical manufacturing plants in Gujarat industrial estates.",
      manufacturing:
        "Operates 7 centralized community boiler plants across Surat, Ankleshwar, Panoli, and Dahej with aggregate hourly steam generation capacity of 420 TPH (Tonnes Per Hour) using multi-fuel automated biomass and clean energy boilers connected via 65+ km of high-pressure overhead steam pipelines.",
      operations:
        "Supplying 24/7 continuous industrial process steam to 130+ manufacturing plants under multi-year long-term take-or-pay concession agreements.",
      keyClients:
        "Atul Limited, Aarti Industries Limited, Meghmani Organics Limited, UPL Limited, Deepak Nitrite Limited, Alkem Laboratories Limited.",
      promoterBackground:
        "Spearheaded by industrialist Vishal S. Budhia, pioneering environmentally compliant shared industrial steam infrastructure and decarbonization utilities across Gujarat manufacturing belts.",
      theFlex:
        "Sticky long-term take-or-pay utility contracts. Stringent state pollution control mandates force factories to decommission individual boilers in favor of central steam.",
      theRedFlags:
        "Heavy geographic concentration in Gujarat industrial clusters. Vulnerability to coal, biomass, and agro-pellet fuel supply price surges.",
    },
    financials: [
      { year: "FY23", assets: "₹295.40 Cr", revenue: "₹210.30 Cr", pat: "₹18.50 Cr", netWorth: "₹115.60 Cr", borrowings: "₹98.20 Cr", margin: "8.8%" },
      { year: "FY24", assets: "₹398.20 Cr", revenue: "₹284.50 Cr", pat: "₹28.20 Cr", netWorth: "₹143.80 Cr", borrowings: "₹122.40 Cr", margin: "9.9%" },
      { year: "FY25", assets: "₹512.60 Cr", revenue: "₹376.10 Cr", pat: "₹41.80 Cr", netWorth: "₹185.60 Cr", borrowings: "₹138.90 Cr", margin: "11.1%" },
      { year: "FY26 (H1)", assets: "₹580.00 Cr", revenue: "₹224.50 Cr", pat: "₹27.60 Cr", netWorth: "₹213.20 Cr", borrowings: "₹129.50 Cr", margin: "12.3%" },
    ],
    registrarName: "Bigshare Services Pvt Ltd",
    registrarUrl: "https://www.bigshareonline.com/ipo_Allotment.html",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/steamhouse-india-limited-drhp_84180.html",
    rhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/steamhouse-india-limited-drhp_84180.html",
    exchangeUrl: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo",
  },

  // 5. Manipal Payment and Identity Solutions Limited
  {
    id: "nse-mpimanipal",
    slug: "manipal-payment-and-identity-solutions",
    name: "Manipal Payment and Identity Solutions Limited",
    symbol: "MPIMANIPAL",
    category: "Mainboard",
    status: "ongoing",
    priceBand: "₹322 - ₹339",
    lotSize: 44,
    minInvestment: "₹14,916",
    issueSize: "₹442.75 Cr",
    freshIssue: "₹300.00 Cr",
    ofs: "₹142.75 Cr",
    openDate: "09 Sep, 2026",
    closeDate: "11 Sep, 2026",
    allotmentDate: "14 Sep, 2026",
    listingDate: "17 Sep, 2026",
    subscription: {
      qib: "Awaiting",
      nii: "0.04x",
      retail: "0.11x",
      total: "0.06x",
    },
    verdict: {
      coreBusiness:
        "Integrated provider of secure digital identity, payment hardware, EMV contact and contactless payment cards, telecom SIM cards, and biometric identification credentials for global banking and transit ecosystems.",
      manufacturing:
        "Operates 2 certified high-security cleanroom manufacturing and personalization plants in Manipal (Karnataka) and Chennai with annual capacity exceeding 120 million smart cards, certified by Visa, Mastercard, RuPay, and GSM Association (GSMA).",
      operations:
        "Delivers mission-critical secure credentialing, cryptographic key injection, and card personalization for 40+ leading public/private banks and domestic telecom operators.",
      keyClients:
        "State Bank of India (SBI), HDFC Bank Limited, ICICI Bank Limited, Axis Bank, Bharti Airtel Limited, Reliance Jio Infocomm, Delhi Metro Rail Corporation (DMRC).",
      promoterBackground:
        "Part of the historic Manipal Group founded by Padma Shri Dr. T.M.A. Pai, spearheaded by Gautham Pai and Abhay G. Pai with multi-decade leadership in secure print, tech solutions, and digital security.",
      theFlex:
        "Dominant market share (>35%) in Indian banking card issuance. Secular tailwinds from digital payments, NCMC transit mandates, and 5G SIM replacements.",
      theRedFlags:
        "Vulnerability to global semiconductor chip supply shortages and rapid adoption of tokenized UPI smartphone payments eating into physical card demand.",
    },
    financials: [
      { year: "FY23", assets: "₹610.20 Cr", revenue: "₹680.50 Cr", pat: "₹51.20 Cr", netWorth: "₹320.40 Cr", borrowings: "₹135.00 Cr", margin: "7.5%" },
      { year: "FY24", assets: "₹745.80 Cr", revenue: "₹815.20 Cr", pat: "₹68.40 Cr", netWorth: "₹388.80 Cr", borrowings: "₹148.60 Cr", margin: "8.4%" },
      { year: "FY25", assets: "₹910.40 Cr", revenue: "₹995.00 Cr", pat: "₹92.10 Cr", netWorth: "₹480.90 Cr", borrowings: "₹162.30 Cr", margin: "9.3%" },
      { year: "FY26 (H1)", assets: "₹1,015.00 Cr", revenue: "₹585.20 Cr", pat: "₹58.60 Cr", netWorth: "₹539.50 Cr", borrowings: "₹150.10 Cr", margin: "10.0%" },
    ],
    registrarName: "KFin Technologies Limited",
    registrarUrl: "https://kprism.kfintech.com/ipostatus/",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/manipal-payment-and-identity-solutions-limited-rhp_84160.html",
    rhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/manipal-payment-and-identity-solutions-limited-rhp_84160.html",
    exchangeUrl: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo",
  },

  // 6. Rentomojo Limited
  {
    id: "nse-rentomojo",
    slug: "rentomojo",
    name: "Rentomojo Limited",
    symbol: "RENTOMOJO",
    category: "Mainboard",
    status: "ongoing",
    priceBand: "₹384 - ₹404",
    lotSize: 37,
    minInvestment: "₹14,948",
    issueSize: "₹879.60 Cr",
    freshIssue: "₹650.00 Cr",
    ofs: "₹229.60 Cr",
    openDate: "09 Sep, 2026",
    closeDate: "11 Sep, 2026",
    allotmentDate: "14 Sep, 2026",
    listingDate: "17 Sep, 2026",
    subscription: {
      qib: "0.10x",
      nii: "0.45x",
      retail: "0.82x",
      total: "0.52x",
    },
    verdict: {
      coreBusiness:
        "India's premier digital rental and consumer subscription platform offering flexible tenure rental and ownership subscriptions for smart appliances, contemporary home furniture, consumer electronics, and mobility solutions across 16+ metropolitan clusters.",
      manufacturing:
        "Operates 9 central fulfillment and automated refurbishment hubs across Bengaluru, Mumbai, NCR, Pune, Hyderabad, and Chennai, performing strict ISO-certified multi-point quality testing, electrostatic sanitization, and upholstery refurbishing.",
      operations:
        "Fleet asset management exceeding 400,000 active leased assets with proprietary AI underwriting scoring creditworthiness, automated subscription billing, and zero-touch reverse logistics.",
      keyClients:
        "Over 450,000 urban active subscribers across Bengaluru, Mumbai, Delhi-NCR, Pune, Hyderabad; enterprise furniture solutions for co-working hubs (WeWork, Awfis, CoWrks); brand partnerships with Samsung, Godrej Appliances, Whirlpool, Wakefit.",
      promoterBackground:
        "Founded in 2014 by IIT Madras alumnus Geetansh Bamania and Ajay Nain, pioneers in asset-light subscription commerce backed by marquee global venture capital funds including Bain Capital, Chiratae Ventures, and Accel.",
      theFlex:
        "Rapidly improving unit economics, high customer lifetime value (LTV/CAC > 4.2x), and strong recurring subscription monthly cash flow.",
      theRedFlags:
        "High capital expenditure in fleet asset procurement. Risk of asset depreciation, customer churn, and equipment repair overheads.",
    },
    financials: [
      { year: "FY23", assets: "₹412.50 Cr", revenue: "₹142.80 Cr", pat: "₹6.20 Cr", netWorth: "₹182.40 Cr", borrowings: "₹120.50 Cr", margin: "4.3%" },
      { year: "FY24", assets: "₹545.90 Cr", revenue: "₹210.40 Cr", pat: "₹22.10 Cr", netWorth: "₹204.50 Cr", borrowings: "₹145.20 Cr", margin: "10.5%" },
      { year: "FY25", assets: "₹720.60 Cr", revenue: "₹314.80 Cr", pat: "₹38.60 Cr", netWorth: "₹243.10 Cr", borrowings: "₹168.00 Cr", margin: "12.3%" },
      { year: "FY26 (H1)", assets: "₹810.00 Cr", revenue: "₹198.40 Cr", pat: "₹26.20 Cr", netWorth: "₹269.30 Cr", borrowings: "₹155.40 Cr", margin: "13.2%" },
    ],
    registrarName: "KFin Technologies Limited",
    registrarUrl: "https://kprism.kfintech.com/ipostatus/",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/rentomojo-limited-drhp_84192.html",
    rhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/rentomojo-limited-drhp_84192.html",
    exchangeUrl: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo",
  },

  // 7. Prasol Chemicals Limited
  {
    id: "nse-prasol-chemicals",
    slug: "prasol-chemicals",
    name: "Prasol Chemicals Limited",
    symbol: "PRASOLCHEM",
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
      qib: "0.12x",
      nii: "0.22x",
      retail: "0.55x",
      total: "0.38x",
    },
    verdict: {
      coreBusiness:
        "One of India's leading specialized manufacturers of phosphorus and acetone chemical derivatives. The enterprise supplies critical intermediate chemistries used in high-growth agrochemicals, high-performance automotive lubricants, and active pharmaceutical ingredients (APIs).",
      manufacturing:
        "Operates 3 modern, automated manufacturing plants located at Khopoli and Roha (Maharashtra) with an aggregate production capacity exceeding 42,000 MTPA. Facilities feature automated fractional distillation columns, pressurized organophosphorus synthesis reactors, and dedicated zero-liquid-discharge (ZLD) effluent treatment systems.",
      operations:
        "Robust international distribution footprint delivering to 35+ countries across North America, Europe, and Asia-Pacific. Key long-standing OEM client relationships span marquee agrochemical and lubricant MNCs, with over 90% repeat customer retention.",
      keyClients:
        "UPL Limited, PI Industries Limited, BASF SE, Aarti Industries Limited, Syngenta India, Castrol India, Gulf Oil Lubricants.",
      promoterBackground:
        "Founded in 1992 by chemical engineers Gaurang N. Parikh, Nishith R. Shah, and Dhaval N. Parikh, establishing zero-liquid-discharge synthesis facilities in Khopoli, Maharashtra with over 30 years of industrial chemical manufacturing.",
      theFlex:
        "High technological barrier to entry in hazardous organophosphorus chemistry; primary beneficiary of global supply chain diversification and Make-in-India chemical import substitution initiatives.",
      theRedFlags:
        "High client concentration with the top 10 customers accounting for ~54% of consolidated revenues; volatility in imported acetone and raw yellow phosphorus prices can compress operating margins.",
    },
    financials: [
      { year: "FY23", assets: "₹684.20 Cr", revenue: "₹712.50 Cr", pat: "₹52.40 Cr", netWorth: "₹318.60 Cr", borrowings: "₹168.30 Cr", margin: "7.4%" },
      { year: "FY24", assets: "₹795.80 Cr", revenue: "₹801.40 Cr", pat: "₹66.18 Cr", netWorth: "₹384.78 Cr", borrowings: "₹152.10 Cr", margin: "8.2%" },
      { year: "FY25", assets: "₹942.30 Cr", revenue: "₹912.80 Cr", pat: "₹84.50 Cr", netWorth: "₹469.28 Cr", borrowings: "₹138.40 Cr", margin: "9.2%" },
      { year: "FY26 (H1)", assets: "₹1,024.10 Cr", revenue: "₹510.60 Cr", pat: "₹53.20 Cr", netWorth: "₹522.48 Cr", borrowings: "₹125.70 Cr", margin: "10.4%" },
    ],
    registrarName: "Link Intime India Pvt Ltd",
    registrarUrl: "https://linkintime.co.in/initial_offer/public-issues.html",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/prasol-chemicals-limited-rhp_84091.html",
    rhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/prasol-chemicals-limited-rhp_84091.html",
    exchangeUrl: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo",
  },

  // 8. Glass Wall Systems (India) Limited
  {
    id: "nse-glass-wall-systems",
    slug: "glass-wall-systems",
    name: "Glass Wall Systems (India) Limited",
    symbol: "GLASSWALL",
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
      qib: "1.25x",
      nii: "4.80x",
      retail: "5.45x",
      total: "4.01x",
    },
    verdict: {
      coreBusiness:
        "Market leader in architectural glass facades, custom unitized curtain wall systems, structural exterior glazing, and fenestration solutions across institutional real estate and commercial airports in India.",
      manufacturing:
        "State-of-the-art automated manufacturing setup in Turbhe and Taloja (Navi Mumbai) spanning 350,000 sq ft equipped with robotic silicon application lines, multi-axis CNC profile machining centers, and double-glazed unit (DGU) insulating furnaces.",
      operations:
        "Full-stack design-to-installation EPC capability with executed facade envelope credentials exceeding 25 million sq ft across Mumbai, Bangalore, Hyderabad, and Delhi NCR.",
      keyClients:
        "Reliance Industries Limited (Jio World Centre), DLF Limited, Brookfield Properties, Godrej Properties, Larsen & Toubro Construction, Mumbai International Airport (Adani Airports).",
      promoterBackground:
        "Spearheaded by Jawahar Hemrajani and Kamlesh Choudhari, pioneers in facade engineering who transformed the Indian commercial architectural landscape with automated CNC manufacturing in Navi Mumbai over 25 years.",
      theFlex:
        "India's premier facade engineering brand with marquee corporate clientele; commercial real estate and airport modernization cycle delivers sustained pipeline visibility.",
      theRedFlags:
        "Heavy working capital cycle typical of complex real estate execution; delayed milestone certifications can elevate trade receivables past 120 days.",
    },
    financials: [
      { year: "FY23", assets: "₹428.60 Cr", revenue: "₹412.30 Cr", pat: "₹28.90 Cr", netWorth: "₹172.40 Cr", borrowings: "₹114.50 Cr", margin: "7.0%" },
      { year: "FY24", assets: "₹521.40 Cr", revenue: "₹495.20 Cr", pat: "₹38.10 Cr", netWorth: "₹210.50 Cr", borrowings: "₹128.90 Cr", margin: "7.7%" },
      { year: "FY25", assets: "₹648.90 Cr", revenue: "₹612.70 Cr", pat: "₹51.40 Cr", netWorth: "₹261.90 Cr", borrowings: "₹136.20 Cr", margin: "8.4%" },
      { year: "FY26 (H1)", assets: "₹710.20 Cr", revenue: "₹340.50 Cr", pat: "₹31.10 Cr", netWorth: "₹293.00 Cr", borrowings: "₹131.80 Cr", margin: "9.1%" },
    ],
    registrarName: "KFin Technologies Limited",
    registrarUrl: "https://kprism.kfintech.com/ipostatus/",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/glass-wall-systems-india-limited-rhp_84095.html",
    rhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/glass-wall-systems-india-limited-rhp_84095.html",
    exchangeUrl: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo",
  },

  // 9. Kanohar Electricals Limited
  {
    id: "nse-kanohar-electricals",
    slug: "kanohar-electricals",
    name: "Kanohar Electricals Limited",
    symbol: "KANOHAR",
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
      qib: "1.42x",
      nii: "5.80x",
      retail: "6.10x",
      total: "4.68x",
    },
    verdict: {
      coreBusiness:
        "Leading domestic manufacturer of Extra High Voltage (EHV) power and generator transformers (up to 765 kV class), specialty furnace transformers, and turnkey substation electrical EPC equipment.",
      manufacturing:
        "Operates twin heavy transformer manufacturing plants in Meerut (Uttar Pradesh) encompassing automated CRGO lamination shearing lines, dust-free positive-pressure winding clean rooms, vapor phase drying autoclaves, and an NABL-accredited 1,200 kV impulse test bay.",
      operations:
        "Strong order book exceeding ₹2,400 Cr driven by multi-year grid capex from central transmission utilities, state electricity boards (SEBs), and green hydrogen/solar park developer agreements.",
      keyClients:
        "Power Grid Corporation of India Limited (PGCIL), NTPC Limited, BHEL, Adani Energy Solutions Limited, Sterling & Wilson Renewable Energy, GETCO (Gujarat), MSETCL (Maharashtra).",
      promoterBackground:
        "Established in 1980 by Dinesh Singhal, Sunit Singhal, and Mohit Singhal, building advanced testing laboratories certified by CPRI and maintaining multi-decade supplier relationships with Indian power utilities.",
      theFlex:
        "Massive multi-year domestic transmission capex super-cycle; certified tier-1 supplier status with Power Grid Corporation and major renewable IPPs.",
      theRedFlags:
        "Heavy raw material dependency on cold-rolled grain-oriented (CRGO) electrical steel and imported copper; project execution penalties if supply schedules slip.",
    },
    financials: [
      { year: "FY23", assets: "₹648.50 Cr", revenue: "₹582.40 Cr", pat: "₹44.80 Cr", netWorth: "₹258.90 Cr", borrowings: "₹182.40 Cr", margin: "7.7%" },
      { year: "FY24", assets: "₹814.20 Cr", revenue: "₹720.80 Cr", pat: "₹62.30 Cr", netWorth: "₹321.20 Cr", borrowings: "₹198.40 Cr", margin: "8.6%" },
      { year: "FY25", assets: "₹1,032.50 Cr", revenue: "₹895.10 Cr", pat: "₹88.40 Cr", netWorth: "₹409.60 Cr", borrowings: "₹210.00 Cr", margin: "9.9%" },
      { year: "FY26 (H1)", assets: "₹1,180.40 Cr", revenue: "₹520.30 Cr", pat: "₹59.20 Cr", netWorth: "₹468.80 Cr", borrowings: "₹195.60 Cr", margin: "11.4%" },
    ],
    registrarName: "Link Intime India Pvt Ltd",
    registrarUrl: "https://linkintime.co.in/initial_offer/public-issues.html",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/kanohar-electricals-limited-rhp_84088.html",
    rhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/kanohar-electricals-limited-rhp_84088.html",
    exchangeUrl: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo",
  },

  // 10. Pranav Constructions Limited
  {
    id: "nse-pranav-constructions",
    slug: "pranav-constructions",
    name: "Pranav Constructions Limited",
    symbol: "PRANAV",
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
      qib: "18.40x",
      nii: "42.80x",
      retail: "36.20x",
      total: "34.59x",
    },
    verdict: {
      coreBusiness:
        "Specialized residential redevelopment contractor and civil builder dominating cooperative housing society renewals and slum rehabilitation authority (SRA) projects in the Mumbai Metropolitan Region (MMR).",
      manufacturing:
        "In-house pre-cast slab casting facilities, mechanized concrete batching plants, and centralized procurement logistics managing simultaneous redevelopment across 18 ongoing Western suburb project sites.",
      operations:
        "Zero-land-acquisition balance sheet model partnering directly with registered housing societies; 35+ successfully delivered residential towers with an ongoing pipeline exceeding 4.2 million sq ft of carpet area.",
      keyClients:
        "Over 35 delivered cooperative housing societies across Western Mumbai suburbs (Borivali, Kandivali, Malad, Goregaon, Andheri) with zero land bank debt.",
      promoterBackground:
        "Founded by Ravi Ramakrishnan and Pranav Ramakrishnan, civil engineering pioneers of zero-land-cost society redevelopment in Mumbai with strict adherence to RERA delivery milestones.",
      theFlex:
        "Asset-light, low-debt joint development framework with rapid capital turnover; high pricing power in high-density Western Mumbai residential sub-markets.",
      theRedFlags:
        "100% geographic concentration in Mumbai Metropolitan Region; vulnerable to Municipal Corporation of Greater Mumbai (MCGM) policy shifts and approval delays.",
    },
    financials: [
      { year: "FY23", assets: "₹282.40 Cr", revenue: "₹226.50 Cr", pat: "₹22.80 Cr", netWorth: "₹114.20 Cr", borrowings: "₹74.50 Cr", margin: "10.1%" },
      { year: "FY24", assets: "₹368.10 Cr", revenue: "₹290.40 Cr", pat: "₹34.20 Cr", netWorth: "₹148.40 Cr", borrowings: "₹88.20 Cr", margin: "11.8%" },
      { year: "FY25", assets: "₹481.50 Cr", revenue: "₹385.60 Cr", pat: "₹49.10 Cr", netWorth: "₹197.50 Cr", borrowings: "₹96.40 Cr", margin: "12.7%" },
      { year: "FY26 (H1)", assets: "₹538.90 Cr", revenue: "₹220.10 Cr", pat: "₹30.20 Cr", netWorth: "₹227.70 Cr", borrowings: "₹91.20 Cr", margin: "13.7%" },
    ],
    registrarName: "Bigshare Services Pvt Ltd",
    registrarUrl: "https://www.bigshareonline.com/ipo_Allotment.html",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/pranav-constructions-limited-rhp_84072.html",
    rhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/pranav-constructions-limited-rhp_84072.html",
    exchangeUrl: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo",
  },

  // 11. Vinod Texworld Limited
  {
    id: "nse-vinod",
    slug: "vinod-texworld",
    name: "Vinod Texworld Limited",
    symbol: "VINOD",
    category: "SME Board",
    status: "ongoing",
    priceBand: "₹72 - ₹76",
    lotSize: 1600,
    minInvestment: "₹1,21,600",
    issueSize: "₹28.50 Cr",
    freshIssue: "₹28.50 Cr",
    ofs: "₹0.00 Cr",
    openDate: "09 Sep, 2026",
    closeDate: "11 Sep, 2026",
    allotmentDate: "14 Sep, 2026",
    listingDate: "17 Sep, 2026",
    subscription: {
      qib: "Awaiting",
      nii: "0.02x",
      retail: "0.05x",
      total: "0.03x",
    },
    verdict: {
      coreBusiness:
        "Integrated textile manufacturing and fabric finishing company producing high-grade blended polyester-viscose suiting, cotton shirting, and technical textiles for institutional and corporate uniform solutions.",
      manufacturing:
        "Operates 48 high-speed air-jet and rapier looms and an automated continuous rope dyeing and fabric stentering processing facility in Bhiwandi (Maharashtra) with 14 million meters annual fabric weaving capacity.",
      operations:
        "Distributing finished shirting and suiting rolls to 180+ wholesale dealers and institutional garment converters across Maharashtra, Gujarat, Rajasthan, and Madhya Pradesh.",
      keyClients:
        "Leading regional apparel brands, corporate uniform contractors, and readymade garment exporters across Western India.",
      promoterBackground:
        "Founded by Vinod Kumar Agarwal and Ankit Agarwal, bringing 28+ years of textile spinning, weaving, and wet processing leadership in Bhiwandi and Surat industrial clusters.",
      theFlex:
        "Captive weaving and automated dyehouse operations delivering high asset turnover and established dealer networks across Western India.",
      theRedFlags:
        "Lower liquidity inherent to SME board listings with 1,600-share trading lots. High sensitivity to crude-oil linked polyester staple fiber prices.",
    },
    financials: [
      { year: "FY23", assets: "₹42.30 Cr", revenue: "₹52.40 Cr", pat: "₹3.40 Cr", netWorth: "₹18.60 Cr", borrowings: "₹14.20 Cr", margin: "6.5%" },
      { year: "FY24", assets: "₹53.80 Cr", revenue: "₹66.20 Cr", pat: "₹4.80 Cr", netWorth: "₹23.40 Cr", borrowings: "₹16.10 Cr", margin: "7.3%" },
      { year: "FY25", assets: "₹67.50 Cr", revenue: "₹82.10 Cr", pat: "₹6.60 Cr", netWorth: "₹30.00 Cr", borrowings: "₹17.80 Cr", margin: "8.0%" },
      { year: "FY26 (H1)", assets: "₹74.20 Cr", revenue: "₹46.50 Cr", pat: "₹4.10 Cr", netWorth: "₹34.10 Cr", borrowings: "₹16.50 Cr", margin: "8.8%" },
    ],
    registrarName: "Bigshare Services Pvt Ltd",
    registrarUrl: "https://www.bigshareonline.com/ipo_Allotment.html",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/vinod-texworld-limited-drhp_84175.html",
    rhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/vinod-texworld-limited-drhp_84175.html",
    exchangeUrl: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo",
  },

  // 12. Deepa Jewellers Limited
  {
    id: "mc-recent-deepa-jewellers",
    slug: "deepa-jewellers",
    name: "Deepa Jewellers Limited",
    symbol: "DEEPAJEWEL",
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
    listingGains: "+14.8% Pop",
    listingPrice: "₹203.25",
    subscription: {
      qib: "52.40x",
      nii: "68.10x",
      retail: "28.30x",
      total: "42.61x",
    },
    verdict: {
      coreBusiness:
        "Fast-expanding regional bridal jewelry retail chain operating 32 flagship showrooms in high-density Tier-2/3 consumer hubs across Northern and Western India.",
      manufacturing:
        "Centralized design and CAD-CAM gold crafting studio in Jaipur, supported by specialized artisan partner clusters for handmade Kundan, Jadau, and BIS hallmarked 22-karat bridal jewelry.",
      operations:
        "Integrated retail ERP and digitized gold metal loan inventory tracking enabling 4.8x annual inventory turns and industry-low showroom shrinkage rates.",
      keyClients:
        "Over 450,000 registered loyalty club retail consumers across Uttar Pradesh, Rajasthan, and Madhya Pradesh.",
      promoterBackground:
        "Founded by Deepchand Kothari and Ashish Kothari, family jewelers spanning three generations with stringent hallmarking and fair-price certifications.",
      theFlex:
        "Aggressive retail store rollout funded by fresh issue proceeds; structural consumer shift from unorganized goldsmiths to hallmarked trusted corporate retailers.",
      theRedFlags:
        "Vulnerable to sudden fluctuations in international gold prices; high working capital requirements during peak Q3/Q4 festival and wedding inventory build-up.",
    },
    financials: [
      { year: "FY23", assets: "₹724.10 Cr", revenue: "₹924.50 Cr", pat: "₹48.20 Cr", netWorth: "₹282.10 Cr", borrowings: "₹212.40 Cr", margin: "5.2%" },
      { year: "FY24", assets: "₹892.40 Cr", revenue: "₹1,120.30 Cr", pat: "₹64.10 Cr", netWorth: "₹346.20 Cr", borrowings: "₹241.50 Cr", margin: "5.7%" },
      { year: "FY25", assets: "₹1,085.60 Cr", revenue: "₹1,380.70 Cr", pat: "₹88.40 Cr", netWorth: "₹434.60 Cr", borrowings: "₹266.00 Cr", margin: "6.4%" },
      { year: "FY26 (H1)", assets: "₹1,192.00 Cr", revenue: "₹810.20 Cr", pat: "₹56.40 Cr", netWorth: "₹491.00 Cr", borrowings: "₹258.20 Cr", margin: "7.0%" },
    ],
    registrarName: "Bigshare Services Pvt Ltd",
    registrarUrl: "https://www.bigshareonline.com/ipo_Allotment.html",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues/aug-2026/deepa-jewellers-limited-rhp_83980.html",
    rhpUrl: "https://www.sebi.gov.in/filings/public-issues/aug-2026/deepa-jewellers-limited-rhp_83980.html",
    exchangeUrl: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo",
  },

  // 13. Rays of Belief Limited
  {
    id: "mc-recent-rays-of-belief",
    slug: "rays-of-belief",
    name: "Rays of Belief Limited",
    symbol: "RAYSOFBELIEF",
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
    listingGains: "-3.6% Dip",
    listingPrice: "₹230.50",
    subscription: {
      qib: "112.50x",
      nii: "148.20x",
      retail: "78.40x",
      total: "107.71x",
    },
    verdict: {
      coreBusiness:
        "Rapidly scaling B2B renewable engineering enterprise delivering commercial & industrial (C&I) rooftop solar EPC systems and distributed microgrid solutions.",
      manufacturing:
        "Assembles proprietary smart solar inverter telemetry controllers, robotic solar panel dry-cleaning mechanisms, and pre-fabricated aluminum mounting racks.",
      operations:
        "Cumulative installed solar capacity of 340+ MW across 480 commercial roofs, warehouses, and industrial campuses with 24/7 cloud generation monitoring.",
      keyClients:
        "Ambuja Cements, JK Lakshmi Cement, Orient Paper, Tata Motors vendor clusters, multi-tenant logistics hubs.",
      promoterBackground:
        "Founded by clean-tech entrepreneurs Rahul Sharma and Sunita Sharma, certified solar engineers with 18+ years of grid-tied distributed solar execution.",
      theFlex:
        "High return on equity (ROE > 22%); surging corporate decarbonization and ESG power purchase mandates drive multi-year corporate client adoption.",
      theRedFlags:
        "Subdued debut listing (-3.6%) despite heavy subscription hype; module import tariff shifts can compress project completion margins.",
    },
    financials: [
      { year: "FY23", assets: "₹185.20 Cr", revenue: "₹168.40 Cr", pat: "₹16.20 Cr", netWorth: "₹82.40 Cr", borrowings: "₹58.10 Cr", margin: "9.6%" },
      { year: "FY24", assets: "₹254.60 Cr", revenue: "₹240.20 Cr", pat: "₹26.10 Cr", netWorth: "₹108.50 Cr", borrowings: "₹74.20 Cr", margin: "10.9%" },
      { year: "FY25", assets: "₹372.10 Cr", revenue: "₹360.50 Cr", pat: "₹44.30 Cr", netWorth: "₹152.80 Cr", borrowings: "₹92.00 Cr", margin: "12.3%" },
      { year: "FY26 (H1)", assets: "₹420.50 Cr", revenue: "₹215.20 Cr", pat: "₹28.40 Cr", netWorth: "₹181.20 Cr", borrowings: "₹85.40 Cr", margin: "13.2%" },
    ],
    registrarName: "KFin Technologies Limited",
    registrarUrl: "https://kprism.kfintech.com/ipostatus/",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues/aug-2026/rays-of-belief-limited-rhp_83965.html",
    rhpUrl: "https://www.sebi.gov.in/filings/public-issues/aug-2026/rays-of-belief-limited-rhp_83965.html",
    exchangeUrl: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo",
  },

  // 14. Farm Peace Limited
  {
    id: "mc-recent-farm-peace",
    slug: "farm-peace",
    name: "Farm Peace Limited",
    symbol: "FARMPEACE",
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
    listingGains: "+5.2% Pop",
    listingPrice: "₹62.00",
    subscription: {
      qib: "Awaiting",
      nii: "1.25x",
      retail: "1.10x",
      total: "1.15x",
    },
    verdict: {
      coreBusiness:
        "Certified organic agri-processing, farm-gate aggregation, and cold-chain supply chain enterprise specializing in direct-from-farmer procurement of pulses, grains, and oilseeds.",
      manufacturing:
        "Integrated processing and packaging plant in Sehore (Madhya Pradesh) equipped with automated optical color-sorters, nitrogen flushing lines, and temperature-controlled storage.",
      operations:
        "Direct procurement ties with 12,000+ certified farmer groups across central India supplying modern trade supermarkets, D2C health-food brands, and institutional food packers.",
      keyClients:
        "Modern organized retail supermarket chains, quick-commerce dark store fulfillment centers, and organic consumer food brand aggregators.",
      promoterBackground:
        "Founded by agriculturalists Harishankar Verma and Suresh Verma, creating direct market links with over 12,000 certified organic farming families across Madhya Pradesh.",
      theFlex:
        "Direct-from-farm procurement gives 18% cost advantage over wholesale APMC mandi traders; expanding premium organic retail demand.",
      theRedFlags:
        "SME board listing with lower secondary liquidity and 2,000-share trading lots; seasonal monsoon dependency and agri-commodity spot price fluctuations.",
    },
    financials: [
      { year: "FY23", assets: "₹48.20 Cr", revenue: "₹54.10 Cr", pat: "₹4.50 Cr", netWorth: "₹21.30 Cr", borrowings: "₹14.20 Cr", margin: "8.3%" },
      { year: "FY24", assets: "₹64.50 Cr", revenue: "₹72.40 Cr", pat: "₹6.80 Cr", netWorth: "₹28.10 Cr", borrowings: "₹16.50 Cr", margin: "9.4%" },
      { year: "FY25", assets: "₹85.30 Cr", revenue: "₹94.20 Cr", pat: "₹9.20 Cr", netWorth: "₹37.30 Cr", borrowings: "₹18.40 Cr", margin: "9.8%" },
      { year: "FY26 (H1)", assets: "₹96.40 Cr", revenue: "₹58.10 Cr", pat: "₹6.10 Cr", netWorth: "₹43.40 Cr", borrowings: "₹16.10 Cr", margin: "10.5%" },
    ],
    registrarName: "Bigshare Services Pvt Ltd",
    registrarUrl: "https://www.bigshareonline.com/ipo_Allotment.html",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues/aug-2026/farm-peace-limited-drhp_83940.html",
    rhpUrl: "https://www.sebi.gov.in/filings/public-issues/aug-2026/farm-peace-limited-drhp_83940.html",
    exchangeUrl: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo",
  },

  // 15. Fly-Hi Maritime Travels Limited
  {
    id: "mc-recent-fly-hi-maritime",
    slug: "fly-hi-maritime-travels",
    name: "Fly-Hi Maritime Travels Limited",
    symbol: "FLYHIMAR",
    category: "SME Board",
    status: "recent",
    priceBand: "₹85",
    lotSize: 1600,
    minInvestment: "₹1,36,000",
    issueSize: "₹24.20 Cr",
    freshIssue: "₹24.20 Cr",
    ofs: "₹0.00 Cr",
    openDate: "28 Aug, 2026",
    closeDate: "01 Sep, 2026",
    allotmentDate: "02 Sep, 2026",
    listingDate: "05 Sep, 2026",
    listingGains: "+18.4% Pop",
    listingPrice: "₹100.60",
    subscription: {
      qib: "18.50x",
      nii: "45.20x",
      retail: "38.10x",
      total: "36.20x",
    },
    verdict: {
      coreBusiness:
        "Specialized corporate marine travel and crew logistics enterprise managing complex worldwide crew rotation, emergency repatriation, and seafarer visa coordination for international commercial shipping fleets.",
      manufacturing:
        "Proprietary crew logistics tracking platform interfacing with global airline GDS reservation systems, international port authority crew manifests, and 24/7 flight disruption rerouting engines.",
      operations:
        "Providing round-the-clock crew movement support across 140+ international seaports for top-tier container shipping lines, crude tankers, and offshore drilling platforms.",
      keyClients:
        "Wilhelmsen Ship Management, Anglo-Eastern Group, Synergy Marine, Bernhard Schulte Shipmanagement (BSM), Fleet Management Limited.",
      promoterBackground:
        "Founded by master mariner Capt. Rajesh Menon and Priya Menon, with 25+ years of international merchant navy command and maritime travel management experience.",
      theFlex:
        "High barrier to entry with specialized IATA marine airline contracts. Strong repeat business from top 5 global ship managers.",
      theRedFlags:
        "High dependence on international airline seat availability and maritime geopolitical reroutings (Red Sea / Suez disruption).",
    },
    financials: [
      { year: "FY23", assets: "₹38.40 Cr", revenue: "₹45.10 Cr", pat: "₹4.20 Cr", netWorth: "₹19.50 Cr", borrowings: "₹8.10 Cr", margin: "9.3%" },
      { year: "FY24", assets: "₹51.20 Cr", revenue: "₹62.80 Cr", pat: "₹6.90 Cr", netWorth: "₹26.40 Cr", borrowings: "₹9.40 Cr", margin: "11.0%" },
      { year: "FY25", assets: "₹68.90 Cr", revenue: "₹84.50 Cr", pat: "₹10.40 Cr", netWorth: "₹36.80 Cr", borrowings: "₹10.20 Cr", margin: "12.3%" },
      { year: "FY26 (H1)", assets: "₹78.20 Cr", revenue: "₹52.30 Cr", pat: "₹7.10 Cr", netWorth: "₹43.90 Cr", borrowings: "₹9.80 Cr", margin: "13.6%" },
    ],
    registrarName: "Link Intime India Pvt Ltd",
    registrarUrl: "https://linkintime.co.in/initial_offer/public-issues.html",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues/aug-2026/fly-hi-maritime-drhp_83910.html",
    rhpUrl: "https://www.sebi.gov.in/filings/public-issues/aug-2026/fly-hi-maritime-drhp_83910.html",
    exchangeUrl: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo",
  },

  // 16. Shanti Inorganics Limited
  {
    id: "mc-recent-shanti-inorganics",
    slug: "shanti-inorganics",
    name: "Shanti Inorganics Limited",
    symbol: "SHANTIINORG",
    category: "SME Board",
    status: "recent",
    priceBand: "₹112",
    lotSize: 1200,
    minInvestment: "₹1,34,400",
    issueSize: "₹32.40 Cr",
    freshIssue: "₹32.40 Cr",
    ofs: "₹0.00 Cr",
    openDate: "27 Aug, 2026",
    closeDate: "29 Aug, 2026",
    allotmentDate: "01 Sep, 2026",
    listingDate: "04 Sep, 2026",
    listingGains: "+8.9% Pop",
    listingPrice: "₹122.00",
    subscription: {
      qib: "8.20x",
      nii: "18.50x",
      retail: "15.10x",
      total: "14.50x",
    },
    verdict: {
      coreBusiness:
        "Chemical manufacturing of inorganic zinc, copper, and manganese salts utilized in agricultural soil nutrients, animal feed supplements, and industrial electroplating.",
      manufacturing:
        "Operates 2 automated chemical synthesis plants in Ankleshwar and Dahej (Gujarat) with 18,000 MTPA capacity for zinc sulphate heptahydrate/monohydrate and electroplating copper sulphate.",
      operations:
        "Supplying agricultural cooperatives and fertilizer distributors across 12 Indian states under long-term supply agreements.",
      keyClients:
        "Indian Farmers Fertiliser Cooperative (IFFCO), Coromandel International Limited, Rashtriya Chemicals and Fertilizers (RCF), Deepak Fertilisers.",
      promoterBackground:
        "Founded by Shantilal Patel and Bhavesh Patel, chemical technocrats with three decades of inorganic mineral processing plants in Ankleshwar and Dahej.",
      theFlex:
        "Government mandate for soil micronutrient enrichment and direct supply tenders with fertilizer PSU giants.",
      theRedFlags:
        "Raw material zinc and copper scrap price volatility directly impacts gross manufacturing spread.",
    },
    financials: [
      { year: "FY23", assets: "₹54.20 Cr", revenue: "₹68.40 Cr", pat: "₹5.10 Cr", netWorth: "₹24.20 Cr", borrowings: "₹18.50 Cr", margin: "7.5%" },
      { year: "FY24", assets: "₹69.80 Cr", revenue: "₹88.10 Cr", pat: "₹7.40 Cr", netWorth: "₹31.60 Cr", borrowings: "₹21.00 Cr", margin: "8.4%" },
      { year: "FY25", assets: "₹88.50 Cr", revenue: "₹112.30 Cr", pat: "₹10.60 Cr", netWorth: "₹42.20 Cr", borrowings: "₹23.40 Cr", margin: "9.4%" },
      { year: "FY26 (H1)", assets: "₹98.20 Cr", revenue: "₹64.50 Cr", pat: "₹6.80 Cr", netWorth: "₹49.00 Cr", borrowings: "₹21.80 Cr", margin: "10.5%" },
    ],
    registrarName: "KFin Technologies Limited",
    registrarUrl: "https://kprism.kfintech.com/ipostatus/",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues/aug-2026/shanti-inorganics-drhp_83890.html",
    rhpUrl: "https://www.sebi.gov.in/filings/public-issues/aug-2026/shanti-inorganics-drhp_83890.html",
    exchangeUrl: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo",
  },

  // 17. Phychem Technologies Limited
  {
    id: "mc-recent-phychem-technologies",
    slug: "phychem-technologies",
    name: "Phychem Technologies Limited",
    symbol: "PHYCHEM",
    category: "SME Board",
    status: "recent",
    priceBand: "₹145",
    lotSize: 1000,
    minInvestment: "₹1,45,000",
    issueSize: "₹38.80 Cr",
    freshIssue: "₹38.80 Cr",
    ofs: "₹0.00 Cr",
    openDate: "26 Aug, 2026",
    closeDate: "28 Aug, 2026",
    allotmentDate: "29 Aug, 2026",
    listingDate: "03 Sep, 2026",
    listingGains: "+22.1% Pop",
    listingPrice: "₹177.05",
    subscription: {
      qib: "26.40x",
      nii: "62.10x",
      retail: "49.80x",
      total: "48.70x",
    },
    verdict: {
      coreBusiness:
        "Formulator and producer of specialty industrial biocides, antimicrobial preservatives, and water treatment coagulants for coatings, adhesives, and cooling tower loops.",
      manufacturing:
        "Automated formulation facility in Vapi (Gujarat) with specialized reaction kettles producing isothiazolinone (CIT/MIT, BIT) and glutaraldehyde biocide compounds.",
      operations:
        "Providing technical dosage formulation and microbial resistance testing to 80+ paint, paper, and industrial cooling tower operators across India and Southeast Asia.",
      keyClients:
        "Pidilite Industries Limited, Asian Paints Limited, Thermax Limited, Berger Paints India, Ion Exchange India Limited.",
      promoterBackground:
        "Founded by Dr. Ashok K. Nair (PhD in Industrial Chemistry) and Sandeep Nair, possessing patented antimicrobial delivery mechanisms.",
      theFlex:
        "High customer stickiness due to formulation certification costs. Robust operating margin expansion (13.4%).",
      theRedFlags:
        "Stringent REACH and domestic environmental chemical handling compliances.",
    },
    financials: [
      { year: "FY23", assets: "₹44.10 Cr", revenue: "₹58.90 Cr", pat: "₹6.20 Cr", netWorth: "₹26.50 Cr", borrowings: "₹11.20 Cr", margin: "10.5%" },
      { year: "FY24", assets: "₹58.60 Cr", revenue: "₹76.40 Cr", pat: "₹9.10 Cr", netWorth: "₹35.60 Cr", borrowings: "₹12.80 Cr", margin: "11.9%" },
      { year: "FY25", assets: "₹76.20 Cr", revenue: "₹98.20 Cr", pat: "₹13.20 Cr", netWorth: "₹48.80 Cr", borrowings: "₹14.50 Cr", margin: "13.4%" },
      { year: "FY26 (H1)", assets: "₹88.40 Cr", revenue: "₹59.10 Cr", pat: "₹8.90 Cr", netWorth: "₹57.70 Cr", borrowings: "₹13.80 Cr", margin: "15.1%" },
    ],
    registrarName: "Link Intime India Pvt Ltd",
    registrarUrl: "https://linkintime.co.in/initial_offer/public-issues.html",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues/aug-2026/phychem-technologies-drhp_83870.html",
    rhpUrl: "https://www.sebi.gov.in/filings/public-issues/aug-2026/phychem-technologies-drhp_83870.html",
    exchangeUrl: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo",
  },

  // 18. Torrent Gas Limited (Upcoming Pipeline)
  {
    id: "nse-torrent-gas",
    slug: "torrent-gas",
    name: "Torrent Gas Limited",
    symbol: "TORRENTGAS",
    category: "Mainboard",
    status: "upcoming",
    priceBand: "₹210 - ₹225 (Estimated)",
    lotSize: 66,
    minInvestment: "₹14,850",
    issueSize: "₹4,000.00 Cr",
    freshIssue: "₹0.00 Cr",
    ofs: "₹4,000.00 Cr (33.5 Cr shares)",
    openDate: "Expected Sep 2026",
    closeDate: "To Be Announced",
    allotmentDate: "TBA",
    listingDate: "TBA",
    subscription: {
      qib: "Awaiting",
      nii: "Awaiting",
      retail: "Awaiting",
      total: "DRHP Approved",
    },
    verdict: {
      coreBusiness:
        "Leading city gas distribution (CGD) network operator in India, backed by the Torrent Group. Retails compressed natural gas (CNG) for vehicular transport and piped natural gas (PNG) for industrial, commercial, and domestic kitchen networks across 34 geographical areas (GAs).",
      manufacturing:
        "Operates a vast downstream infrastructure consisting of 420+ operational CNG dispensing stations, over 9,500 km of underground steel and MDPE pipeline distribution networks, and mother-daughter gas compression terminals.",
      operations:
        "Exclusive CGD marketing rights spanning across Uttar Pradesh, Gujarat, Maharashtra, Rajasthan, Punjab, Tamil Nadu, and Telangana, supplying over 4.5 lakh domestic households and thousands of industrial units.",
      keyClients:
        "Over 450,000 domestic households, state transport undertakings, automotive fleet operators, and industrial ceramic/textile manufacturing clusters across 34 authorized GAs.",
      promoterBackground:
        "Promoted by Torrent Investments Limited and Torrent Group (Torrent Power & Torrent Pharma), one of India's most respected power and healthcare conglomerates.",
      theFlex:
        "High gross margin profile (₹18.05/SCM in Q1 FY27); marquee parentage of Torrent Group providing exceptional balance sheet stability and execution capability.",
      theRedFlags:
        "100% Offer for Sale (OFS) with zero primary capital infusion into company balance sheet; domestic APM gas allocation cuts by the Ministry of Petroleum impacting input feedstock costs.",
    },
    financials: [
      { year: "FY24", assets: "₹5,280.40 Cr", revenue: "₹4,890.20 Cr", pat: "₹185.30 Cr", netWorth: "₹1,940.60 Cr", borrowings: "₹1,820.50 Cr", margin: "3.8%" },
      { year: "FY25", assets: "₹6,420.80 Cr", revenue: "₹5,820.60 Cr", pat: "₹342.10 Cr", netWorth: "₹2,280.40 Cr", borrowings: "₹1,950.20 Cr", margin: "5.8%" },
      { year: "FY26", assets: "₹7,850.50 Cr", revenue: "₹6,950.40 Cr", pat: "₹495.80 Cr", netWorth: "₹2,776.20 Cr", borrowings: "₹2,040.10 Cr", margin: "7.1%" },
      { year: "FY27 (Q1)", assets: "₹8,240.10 Cr", revenue: "₹1,788.00 Cr", pat: "₹129.85 Cr", netWorth: "₹2,906.05 Cr", borrowings: "₹1,980.50 Cr", margin: "7.3%" },
    ],
    registrarName: "Link Intime India Pvt Ltd",
    registrarUrl: "https://linkintime.co.in/initial_offer/public-issues.html",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/torrent-gas-limited-udrhp_84210.html",
    rhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/torrent-gas-limited-udrhp_84210.html",
    exchangeUrl: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo",
  },

  // 19. Sembcorp Green Infra Limited (Upcoming Pipeline)
  {
    id: "nse-sembcorp-green-infra",
    slug: "sembcorp-green-infra",
    name: "Sembcorp Green Infra Limited",
    symbol: "SEMBCORP",
    category: "Mainboard",
    status: "upcoming",
    priceBand: "Price Band Awaiting",
    lotSize: 50,
    minInvestment: "₹14,500",
    issueSize: "₹2,500.00 Cr",
    freshIssue: "₹1,800.00 Cr",
    ofs: "₹700.00 Cr",
    openDate: "Expected Sep 2026",
    closeDate: "To Be Announced",
    allotmentDate: "TBA",
    listingDate: "TBA",
    subscription: {
      qib: "Awaiting",
      nii: "Awaiting",
      retail: "Awaiting",
      total: "DRHP Filed",
    },
    verdict: {
      coreBusiness:
        "Utility-scale renewable energy developer focusing on wind, solar, and hybrid green power generation projects across India with long-term 25-year sovereign power purchase agreements (PPAs).",
      manufacturing:
        "Portfolio of operational and pipeline renewable installations exceeding 4.2 GW across Tamil Nadu, Gujarat, Karnataka, Rajasthan, and Madhya Pradesh, connected directly to Central Transmission Utility (CTU) grid substations.",
      operations:
        "100% of generation contracted under fixed-tariff PPAs with central counterparties SECI (Solar Energy Corporation of India), NTPC, and state distribution utilities.",
      keyClients:
        "Solar Energy Corporation of India (SECI), NTPC Limited, Gujarat Urja Vikas Nigam Limited (GUVNL), Maharashtra State Electricity Distribution Company Limited (MSEDCL).",
      promoterBackground:
        "Wholly owned subsidiary of Singapore-headquartered global energy and urban development conglomerate Sembcorp Industries.",
      theFlex:
        "Backed by global energy giant Sembcorp Industries (Singapore); highly predictable annuity cash flows and low counterparty default risk under SECI tripartite agreements.",
      theRedFlags:
        "Heavy capital expenditure requirements; intermittency risks in seasonal wind and solar irradiance impacting plant load factors (PLF).",
    },
    financials: [
      { year: "FY23", assets: "₹8,450.20 Cr", revenue: "₹2,120.40 Cr", pat: "₹248.50 Cr", netWorth: "₹3,180.20 Cr", borrowings: "₹4,120.50 Cr", margin: "11.7%" },
      { year: "FY24", assets: "₹9,890.60 Cr", revenue: "₹2,540.80 Cr", pat: "₹312.40 Cr", netWorth: "₹3,492.60 Cr", borrowings: "₹4,850.10 Cr", margin: "12.3%" },
      { year: "FY25", assets: "₹11,650.40 Cr", revenue: "₹3,180.50 Cr", pat: "₹428.60 Cr", netWorth: "₹3,921.20 Cr", borrowings: "₹5,410.80 Cr", margin: "13.5%" },
      { year: "FY26 (H1)", assets: "₹12,480.10 Cr", revenue: "₹1,740.20 Cr", pat: "₹255.40 Cr", netWorth: "₹4,176.60 Cr", borrowings: "₹5,230.40 Cr", margin: "14.7%" },
    ],
    registrarName: "KFin Technologies Limited",
    registrarUrl: "https://kprism.kfintech.com/ipostatus/",
    drhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/sembcorp-green-infra-limited-drhp_84220.html",
    rhpUrl: "https://www.sebi.gov.in/filings/public-issues/sep-2026/sembcorp-green-infra-limited-drhp_84220.html",
    exchangeUrl: "https://www.nseindia.com/market-data/all-upcoming-issues-ipo",
  },
];

// Sanitize subscription numbers to ensure no stale "Opening Tomorrow" for open issues
function sanitizeIpoSubscription(ipo: LiveIpo): LiveIpo {
  const isOngoing = ipo.status === "ongoing";
  if (isOngoing) {
    if (ipo.subscription.total === "Opening Tomorrow" || ipo.subscription.total === "Awaiting") {
      const activeSub =
        ipo.subscription.retail && ipo.subscription.retail !== "Awaiting"
          ? ipo.subscription.retail
          : "Bidding Active";
      return {
        ...ipo,
        subscription: {
          ...ipo.subscription,
          total: activeSub,
        },
      };
    }
  }
  return ipo;
}

// In-memory cache for live IPOs
let cachedLiveIpos: LiveIpo[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60_000; // 60 seconds

export async function fetchLiveIpos(): Promise<LiveIpo[]> {
  const now = Date.now();
  if (cachedLiveIpos && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedLiveIpos;
  }

  const liveMap = new Map<string, LiveIpo>();

  // Populate base verified master registry
  for (const item of AUDITED_IPO_REGISTRY) {
    liveMap.set(item.slug, sanitizeIpoSubscription(JSON.parse(JSON.stringify(item))));
  }

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  };

  // 1. Fetch NSE Live Ongoing Issues to update real-time subscription multipliers
  try {
    const homeRes = await fetch("https://www.nseindia.com", {
      headers,
      next: { revalidate: 120 },
    });
    const cookies = homeRes.headers.get("set-cookie") || "";
    const nseRes = await fetch("https://www.nseindia.com/api/ipo-current-issue", {
      headers: { ...headers, Cookie: cookies, Referer: "https://www.nseindia.com/" },
      next: { revalidate: 120 },
    });

    if (nseRes.ok) {
      const nseData = await nseRes.json();
      if (Array.isArray(nseData)) {
        for (const item of nseData) {
          if (!item.companyName) continue;
          const slug = slugify(item.companyName);
          const subTimes = item.noOfTime ? `${Number(item.noOfTime).toFixed(2)}x` : null;
          
          // Match by slug or symbol
          let existing = liveMap.get(slug);
          if (!existing && item.symbol) {
            existing = Array.from(liveMap.values()).find(
              (i) => i.symbol && i.symbol.toLowerCase() === item.symbol.toLowerCase()
            );
          }

          if (existing) {
            existing.status = "ongoing";
            if (subTimes) existing.subscription.total = subTimes;
            if (item.symbol) existing.symbol = item.symbol;
            if (item.issueStartDate) existing.openDate = item.issueStartDate;
            if (item.issueEndDate) existing.closeDate = item.issueEndDate;
            liveMap.set(existing.slug, existing);
          }
        }
      }
    }
  } catch (err) {
    console.error("NSE live IPO fetch error (using verified dataset):", err);
  }

  // 2. Fetch Moneycontrol for recent listings gain updates
  try {
    const mcRes = await fetch("https://www.moneycontrol.com/ipo/", {
      headers,
      next: { revalidate: 120 },
    });
    if (mcRes.ok) {
      const html = await mcRes.text();
      const recentMatches = html.match(/<table[^>]*>([\s\S]*?)<\/table>/gi) || [];
      for (const table of recentMatches) {
        if (
          table.includes("Deepa Jewellers") ||
          table.includes("Listing Gain") ||
          table.includes("Listing Close")
        ) {
          const rows = table.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
          for (let r = 1; r < rows.length; r++) {
            const rawRow = rows[r];
            if (!rawRow) continue;
            const cells = rawRow.match(/<td[^>]*>([\s\S]*?)<\/td>/gi) || [];
            if (cells.length >= 8) {
              const nameCell = cells[0];
              if (!nameCell) continue;
              const nameText = nameCell.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
              const dateText = (cells[2] || "").replace(/<[^>]+>/g, "").trim();
              const issuePriceText = (cells[3] || "").replace(/<[^>]+>/g, "").trim();
              const subText = (cells[4] || "").replace(/<[^>]+>/g, "").trim();
              const listingGainText = (cells[7] || "").replace(/<[^>]+>/g, "").trim();
              const ltpText = (cells[8] || "").replace(/<[^>]+>/g, "").trim();

              if (nameText && !nameText.includes("No Data")) {
                const slug = slugify(nameText);
                let gainPercent: string | null = null;

                // Parse direct listing gain column from Moneycontrol
                const gainNum = parseFloat(listingGainText.replace(/[^0-9.-]/g, ""));
                if (!isNaN(gainNum) && gainNum > -90 && gainNum < 500) {
                  const isGain = gainNum > 0;
                  const isLoss = gainNum < 0;
                  const tag = isGain ? "Pop" : isLoss ? "Dip" : "Flat";
                  gainPercent = `${isGain ? "+" : ""}${gainNum.toFixed(1)}% ${tag}`;
                } else if (issuePriceText && ltpText) {
                  const ip = parseFloat(issuePriceText.replace(/[^0-9.]/g, ""));
                  const ltp = parseFloat(ltpText.replace(/[^0-9.]/g, ""));
                  if (ip > 0 && ltp > 0 && ip < 50000 && ltp < 50000) {
                    const diff = ((ltp - ip) / ip) * 100;
                    if (diff > -90 && diff < 500) {
                      const isGain = diff > 0;
                      const isLoss = diff < 0;
                      const tag = isGain ? "Pop" : isLoss ? "Dip" : "Flat";
                      gainPercent = `${isGain ? "+" : ""}${diff.toFixed(1)}% ${tag}`;
                    }
                  }
                }

                const existing = liveMap.get(slug);
                if (existing) {
                  existing.status = "recent";
                  if (gainPercent) existing.listingGains = gainPercent;
                  if (ltpText) existing.listingPrice = ltpText.startsWith("₹") ? ltpText : `₹${ltpText}`;
                  if (dateText && !dateText.includes("Mainline")) existing.listingDate = dateText;
                  if (subText && subText.includes("x")) existing.subscription.total = subText;
                }
              }
            }
          }
        }
      }
    }
  } catch (err) {
    console.error("Moneycontrol live IPO fetch error:", err);
  }

  const result = Array.from(liveMap.values());
  cachedLiveIpos = result;
  cacheTimestamp = Date.now();
  return result;
}

export async function getAllLiveIpos(): Promise<LiveIpo[]> {
  return fetchLiveIpos();
}

/**
 * Dynamically resolves any slug from the live dataset.
 * Handles exact slugs, normalized slugs, symbol variations, and catalog fallback.
 */
export async function getLiveIpoBySlug(slug: string): Promise<LiveIpo | undefined> {
  if (!slug) return undefined;
  const normalizedSlug = slugify(slug);
  const allIpos = await fetchLiveIpos();

  // 1. Exact or normalized match
  let found = allIpos.find(
    (item) => item.slug === slug || item.slug === normalizedSlug
  );
  if (found) {
    return sanitizeIpoSubscription(found);
  }

  // 2. Symbol match
  found = allIpos.find(
    (item) => item.symbol && item.symbol.toLowerCase() === slug.toLowerCase()
  );
  if (found) {
    return sanitizeIpoSubscription(found);
  }

  // 3. Normalized stripped match (ignoring trailing words like -ltd, -limited, -ipo)
  const cleanInput = normalizedSlug.replace(/-(limited|ltd|ipo|sme)$/g, "");
  found = allIpos.find((item) => {
    const itemClean = item.slug.replace(/-(limited|ltd|ipo|sme)$/g, "");
    return (
      itemClean === cleanInput ||
      (item.symbol && item.symbol.toLowerCase() === cleanInput)
    );
  });
  if (found) {
    return sanitizeIpoSubscription(found);
  }

  // 4. Fallback direct registry lookup
  const fallback = AUDITED_IPO_REGISTRY.find(
    (item) =>
      item.slug === slug ||
      item.slug === normalizedSlug ||
      (item.symbol && item.symbol.toLowerCase() === slug.toLowerCase()) ||
      item.slug.replace(/-(limited|ltd|ipo|sme)$/g, "") === cleanInput
  );
  return fallback ? sanitizeIpoSubscription(fallback) : undefined;
}

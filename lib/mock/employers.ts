import type { Employer } from "./types";

export const employers: Employer[] = [
  {
    id: "e_001",
    name: "Tully Sugar Co.",
    industry: "agriculture",
    size: "large",
    location: { town: "Tully", state: "QLD", region: "Far North Queensland" },
    abn: "12 345 678 901",
    blurb:
      "Family-run cane operation, 240 ha. Hires 30–60 WHV workers per season for cutting and irrigation.",
    joinedAt: "2026-02-04",
  },
  {
    id: "e_002",
    name: "Riverina Citrus",
    industry: "horticulture",
    size: "large",
    location: { town: "Griffith", state: "NSW", region: "Riverina" },
    abn: "98 765 432 100",
    blurb:
      "Australia's largest mandarin grower. Peak season runs May–October, ~120 pickers required.",
    joinedAt: "2026-01-22",
  },
  {
    id: "e_003",
    name: "Mildura Vine House",
    industry: "horticulture",
    size: "medium",
    location: { town: "Mildura", state: "VIC", region: "Sunraysia" },
    abn: "55 612 444 901",
    blurb:
      "Premium table grape and almond producer. Tight harvest windows, repeat WHV crews preferred.",
    joinedAt: "2026-02-18",
  },
  {
    id: "e_004",
    name: "Cape Reef Lodge",
    industry: "hospitality",
    size: "medium",
    location: { town: "Port Douglas", state: "QLD", region: "Tropical North" },
    abn: "33 222 111 555",
    blurb:
      "Boutique reef lodge, 64 rooms. Year-round seasonal hires across housekeeping, F&B, guest services.",
    joinedAt: "2026-03-09",
  },
  {
    id: "e_005",
    name: "Margaret River Wine Estates",
    industry: "horticulture",
    size: "medium",
    location: {
      town: "Margaret River",
      state: "WA",
      region: "Margaret River wine region",
    },
    abn: "77 504 332 008",
    blurb:
      "Collective of 4 boutique wineries. Vintage 2026 starts late February — expect 25 pickers + cellar hands.",
    joinedAt: "2026-01-30",
  },
  {
    id: "e_006",
    name: "Hayfield Pastoral",
    industry: "agriculture",
    size: "large",
    location: { town: "Katherine", state: "NT", region: "Top End" },
    abn: "44 100 887 234",
    blurb:
      "Cattle station, 1.2M ha across two properties. Mustering and yard hands wanted year-round.",
    joinedAt: "2026-02-25",
  },
  {
    id: "e_007",
    name: "Outback Recruitment Partners",
    industry: "agriculture",
    size: "medium",
    location: { town: "Toowoomba", state: "QLD", region: "Darling Downs" },
    abn: "21 887 654 321",
    blurb:
      "Labour-hire agency placing 200+ WHV workers per year across QLD horticulture and cropping clients.",
    joinedAt: "2026-01-15",
  },
  {
    id: "e_008",
    name: "Renmark Stonefruit Co-op",
    industry: "horticulture",
    size: "small",
    location: { town: "Renmark", state: "SA", region: "Riverland" },
    abn: "62 555 909 010",
    blurb:
      "Grower co-operative across stone-fruit orchards in the Riverland. ~40 pickers each November–February.",
    joinedAt: "2026-03-01",
  },
];

export const employerById = Object.fromEntries(employers.map((e) => [e.id, e]));

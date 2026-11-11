export type BannerGroup = "home_hero" | "page";
export type BannerAlign = "left" | "right";
export type BannerLayout = "split" | "campaign";

export type BannerSlot = {
  key: string;
  group: BannerGroup;
  label: string;
  /** Public page where this banner appears */
  pagePath: string;
  /** Default image under /public */
  defaultSrc: string;
  align: BannerAlign;
  object: string;
  layout: BannerLayout;
  /** Home-hero copy (ignored for campaign layouts) */
  title?: string;
  accent?: string;
  body?: string;
  lightNav?: boolean;
  /** Shown in the admin form */
  sizeHint: string;
  ratioHint: string;
  sortOrder: number;
};

/** Recommended upload specs shown in admin. */
export const BANNER_SPECS = {
  home_hero: {
    sizeHint: "1920 × 1080 px (or larger)",
    ratioHint: "16:9 landscape",
    note: "Keep the subject on one side. The lead form stays fixed on the other side — do not put important text under the form area.",
    maxMb: 5,
  },
  page: {
    sizeHint: "1920 × 1080 px (or larger)",
    ratioHint: "16:9 landscape",
    note: "Keep the subject on one side. The quote form stays fixed on the other side — do not put important text under the form area.",
    maxMb: 5,
  },
} as const;

export const BANNER_SLOTS: BannerSlot[] = [
  {
    key: "home_hero_1",
    group: "home_hero",
    label: "Home hero — slide 1",
    pagePath: "/",
    defaultSrc: "/images/hero/start.png",
    align: "left",
    object: "object-[82%_center]",
    layout: "split",
    title: "Turn your business",
    accent: "idea into reality.",
    body: "Company registration, GST and compliance — all in one place, so you can grow the business.",
    sizeHint: BANNER_SPECS.home_hero.sizeHint,
    ratioHint: BANNER_SPECS.home_hero.ratioHint,
    sortOrder: 10,
  },
  {
    key: "home_hero_2",
    group: "home_hero",
    label: "Home hero — slide 2",
    pagePath: "/",
    defaultSrc: "/images/hero/filings.png",
    align: "right",
    object: "object-[18%_center]",
    layout: "split",
    title: "GST, ITR and ROC —",
    accent: "filed in one place.",
    body: "Returns and annual filings with transparent professional fees plus government charges.",
    lightNav: true,
    sizeHint: BANNER_SPECS.home_hero.sizeHint,
    ratioHint: BANNER_SPECS.home_hero.ratioHint,
    sortOrder: 20,
  },
  {
    key: "home_hero_3",
    group: "home_hero",
    label: "Home hero — slide 3",
    pagePath: "/",
    defaultSrc: "/images/hero/advisor.png",
    align: "left",
    object: "object-[84%_center]",
    layout: "split",
    title: "Stay compliant.",
    accent: "Stay on the work that matters.",
    body: "MCA, GST and income tax — handled by CAs, pan-India.",
    sizeHint: BANNER_SPECS.home_hero.sizeHint,
    ratioHint: BANNER_SPECS.home_hero.ratioHint,
    sortOrder: 30,
  },
  {
    key: "page:income-tax/advance-tax-calculation",
    group: "page",
    label: "Advance Tax",
    pagePath: "/services/income-tax/advance-tax-calculation",
    defaultSrc: "/images/otherpageshero/06e846a4-84af-43f0-94c4-1bd30a5cc794.png",
    align: "left",
    object: "object-[84%_center]",
    layout: "split",
    sizeHint: BANNER_SPECS.home_hero.sizeHint,
    ratioHint: BANNER_SPECS.home_hero.ratioHint,
    sortOrder: 110,
  },
  {
    key: "page:income-tax/income-tax-notice",
    group: "page",
    label: "Income Tax Notice",
    pagePath: "/services/income-tax/income-tax-notice",
    defaultSrc: "/images/otherpageshero/thinking.png",
    align: "left",
    object: "object-[82%_center]",
    layout: "split",
    sizeHint: BANNER_SPECS.home_hero.sizeHint,
    ratioHint: BANNER_SPECS.home_hero.ratioHint,
    sortOrder: 120,
  },
  {
    key: "page:income-tax/revised-return",
    group: "page",
    label: "Revised Return",
    pagePath: "/services/income-tax/revised-return",
    defaultSrc: "/images/otherpageshero/06e846a4-84af-43f0-94c4-1bd30a5cc794.png",
    align: "left",
    object: "object-[84%_center]",
    layout: "split",
    sizeHint: BANNER_SPECS.home_hero.sizeHint,
    ratioHint: BANNER_SPECS.home_hero.ratioHint,
    sortOrder: 130,
  },
  {
    key: "page:income-tax/updated-return",
    group: "page",
    label: "Updated Return (ITR-U)",
    pagePath: "/services/income-tax/updated-return",
    defaultSrc: "/images/otherpageshero/94491b05-7085-433d-8efb-cb4c309798ae.png",
    align: "right",
    object: "object-[18%_center]",
    layout: "split",
    sizeHint: BANNER_SPECS.home_hero.sizeHint,
    ratioHint: BANNER_SPECS.home_hero.ratioHint,
    sortOrder: 140,
  },
];

export type BannerOverride = {
  imageUrl?: string | null;
  align?: BannerAlign;
  object?: string;
  title?: string | null;
  accent?: string | null;
  body?: string | null;
  lightNav?: boolean;
  updatedAt?: string;
};

export type BannerOverridesMap = Record<string, BannerOverride>;

export type ResolvedBanner = BannerSlot & {
  src: string;
  isCustomImage: boolean;
};

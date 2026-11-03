export type BannerAlign = "left" | "right";

export type BannerArt = {
  src: string;
  align: BannerAlign;
  object: string;
};

const DIR = "/images/otherpageshero";

const ART = {
  itr: { src: `${DIR}/94491b05-7085-433d-8efb-cb4c309798ae.png`, align: "right", object: "object-[18%_center]" },
  gstPhoto: { src: `${DIR}/db8c4e37-e4a2-4c8b-b9f3-8b2c718df8f5.png`, align: "right", object: "object-[16%_center]" },
  gstIllu: { src: `${DIR}/bfe4f45b-e65b-41db-a592-8fce7b9ea822.png`, align: "right", object: "object-[14%_center]" },
  mca: { src: `${DIR}/2acbfb32-51bc-47eb-9a9c-98db6b34c280.png`, align: "left", object: "object-[84%_center]" },
  couple: { src: `${DIR}/f477d466-898a-47a9-ad61-3a41c70eddd6.png`, align: "right", object: "object-[18%_center]" },
  think: { src: `${DIR}/thinking.png`, align: "left", object: "object-[82%_center]" },
  womanStand: { src: `${DIR}/aac5bb7c-91ab-4304-ac87-9e4596a835c6.png`, align: "left", object: "object-[86%_center]" },
  coupleIllu: { src: `${DIR}/150b9957-9a1d-4b30-925b-e321393e110d.png`, align: "left", object: "object-[80%_center]" },
  phone: { src: `${DIR}/06e846a4-84af-43f0-94c4-1bd30a5cc794.png`, align: "left", object: "object-[84%_center]" },
  headset: { src: `${DIR}/fffdd1c9-200d-4f62-8b2d-8454f0a4a506.png`, align: "right", object: "object-[14%_center]" },
  tablet: { src: `${DIR}/45e07ea5-214a-48b7-8cfb-891ea07bd319.png`, align: "left", object: "object-[82%_center]" },
  desk: { src: `${DIR}/67335ffa-063b-4d92-bd37-8f1c6d5f5021.png`, align: "left", object: "object-[82%_center]" },
} as const satisfies Record<string, BannerArt>;

const ALL: BannerArt[] = Object.values(ART);

const PILLAR_POOL: Record<string, BannerArt[]> = {
  "income-tax": [ART.itr, ART.phone, ART.think],
  gst: [ART.gstPhoto, ART.gstIllu, ART.phone],
  startup: [ART.womanStand, ART.mca, ART.coupleIllu],
  mca: [ART.mca, ART.desk, ART.womanStand],
  funds: [ART.headset, ART.couple, ART.coupleIllu],
  accounting: [ART.tablet, ART.gstPhoto, ART.phone],
  "other-services": [ART.desk, ART.think, ART.headset],
};

function hash(value: string) {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pick(pool: BannerArt[], key: string) {
  return pool[hash(key) % pool.length];
}

const SLUG_ART: Record<string, BannerArt> = {
  "income-tax/income-tax-e-filing": ART.itr,
  "income-tax/tax-planning": ART.think,
  "funds/cma-report": ART.headset,
  "funds/tev-report": ART.tablet,
  "funds/pitch-deck-for-startup": ART.coupleIllu,
};

export function bannerForService(pillar: string, slug: string): BannerArt {
  const key = `${pillar}/${slug}`;
  return SLUG_ART[key] ?? pick(PILLAR_POOL[pillar] ?? ALL, key);
}

export function bannerForPillar(pillar: string): BannerArt {
  return (PILLAR_POOL[pillar] ?? ALL)[0];
}

export function bannerForPath(path: string): BannerArt {
  const service = path.match(/^\/services\/([^/]+)(?:\/([^/]+))?/);
  if (service?.[2]) return bannerForService(service[1], service[2]);
  if (service?.[1]) return bannerForPillar(service[1]);
  if (/contact|book-consultation|partners/.test(path)) return ART.headset;
  if (/about|team|trust|reviews/.test(path)) return ART.couple;
  if (/tools|calculator|government-fees/.test(path)) return ART.tablet;
  if (/compliance-calendar|track/.test(path)) return ART.desk;
  if (/guides|glossary|faq|documents/.test(path)) return ART.think;
  if (/refer|for\//.test(path)) return ART.womanStand;
  if (/company-registration/.test(path)) return ART.mca;
  return pick(ALL, path);
}

function withStop(text: string) {
  return /[.!?]$/.test(text) ? text : `${text}.`;
}

export function splitHeading(heading: string): { title: string; accent: string } {
  const trimmed = heading.trim().replace(/\.$/, "");
  const dashed = trimmed.split(/\s+[—–]\s+/);
  if (dashed.length === 2) return { title: dashed[0], accent: withStop(dashed[1]) };
  const words = trimmed.split(/\s+/);
  if (words.length <= 1) return { title: "", accent: withStop(trimmed) };
  if (words.length <= 3) {
    return { title: words.slice(0, -1).join(" "), accent: withStop(words.at(-1) ?? "") };
  }
  return { title: words.slice(0, -2).join(" "), accent: withStop(words.slice(-2).join(" ")) };
}

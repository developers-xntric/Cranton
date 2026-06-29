function firstBlock<T>(value: unknown): Partial<T> | null {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  const [first] = value;
  return typeof first === "object" && first !== null ? (first as Partial<T>) : null;
}

function stringValue(value: unknown, fallback: string) {
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

export function mapSiteSettingsContent<T extends {
  navbar: Record<string, unknown>;
  footer: Record<string, unknown>;
}>(raw: Record<string, unknown>, fallback: T): T {
  const navbar = firstBlock<T["navbar"]>(raw.navbar);
  const footer = firstBlock<T["footer"]>(raw.footer);

  return {
    navbar: {
      ...fallback.navbar,
      ...(navbar ?? {}),
      solutionItems: Array.isArray(navbar?.solutionItems)
        ? navbar?.solutionItems
        : fallback.navbar.solutionItems,
    },
    footer: {
      ...fallback.footer,
      ...(footer ?? {}),
      links: Array.isArray(footer?.links) ? footer.links : fallback.footer.links,
      socialLinks: Array.isArray(footer?.socialLinks)
        ? footer.socialLinks
        : fallback.footer.socialLinks,
    },
  } as T;
}

export function mapHomeContent<T extends {
  hero: Record<string, unknown>;
  services: unknown[];
  buildingBlocks: Record<string, unknown>;
  statsSection: Record<string, unknown>;
  whyChooseUs: Record<string, unknown>;
  insightsSection: Record<string, unknown>;
}>(raw: Record<string, unknown>, fallback: T): T {
  const hero = firstBlock<T["hero"]>(raw.hero);
  const statsSection = firstBlock<T["statsSection"]>(raw.stats_section);
  const whyChooseUs = firstBlock<T["whyChooseUs"]>(raw.why_choose_us);
  const insightsSection = firstBlock<T["insightsSection"]>(raw.insights_section);

  return {
    hero: {
      ...fallback.hero,
      video: stringValue(hero?.video, fallback.hero.video as string),
      title: stringValue(hero?.title, fallback.hero.title as string),
      subtitle: stringValue(hero?.subtitle, fallback.hero.subtitle as string),
      ctaLabel: stringValue(hero?.ctaLabel ?? hero?.cta_label, fallback.hero.ctaLabel as string),
      ctaHref: stringValue(hero?.ctaHref ?? hero?.cta_href, fallback.hero.ctaHref as string),
    },
    services: Array.isArray(raw.services) && raw.services.length > 0 ? raw.services : fallback.services,
    buildingBlocks: {
      ...fallback.buildingBlocks,
      heading: stringValue(
        raw.building_blocks_heading,
        fallback.buildingBlocks.heading as string
      ),
      description: stringValue(
        raw.building_blocks_description,
        fallback.buildingBlocks.description as string
      ),
      blocks:
        Array.isArray(raw.building_block_items) && raw.building_block_items.length > 0
          ? raw.building_block_items
          : fallback.buildingBlocks.blocks,
    },
    statsSection: {
      ...fallback.statsSection,
      ...(statsSection ?? {}),
      stats:
        Array.isArray(statsSection?.stats) && statsSection.stats.length > 0
          ? statsSection.stats
          : fallback.statsSection.stats,
    },
    whyChooseUs: {
      ...fallback.whyChooseUs,
      ...(whyChooseUs ?? {}),
      features:
        Array.isArray(whyChooseUs?.features) && whyChooseUs.features.length > 0
          ? whyChooseUs.features
          : fallback.whyChooseUs.features,
    },
    insightsSection: {
      ...fallback.insightsSection,
      ...(insightsSection ?? {}),
      insights:
        Array.isArray(insightsSection?.insights) && insightsSection.insights.length > 0
          ? insightsSection.insights
          : fallback.insightsSection.insights,
    },
  } as T;
}

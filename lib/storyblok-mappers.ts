export function firstBlock<T>(value: unknown): Partial<T> | null {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  const [first] = value;
  return typeof first === "object" && first !== null ? (first as Partial<T>) : null;
}

export function stringValue(value: unknown, fallback: string) {
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

export function normalizeParagraphs(
  value: unknown,
  fallback: string[]
): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "string" && value.trim().length > 0) {
    return value
      .split(/\r?\n\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return fallback;
}

export function normalizeStringList(value: unknown, fallback: string[]): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  }

  if (typeof value === "string" && value.trim().length > 0) {
    return value
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return fallback;
}

export function normalizeObjectList<T extends Record<string, unknown>>(
  value: unknown,
  fallback: T[]
): T[] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.filter(
    (item): item is T => typeof item === "object" && item !== null
  );
}

function sanitizeBlockObject(value: Record<string, unknown>) {
  const sanitized: Record<string, unknown> = {};

  for (const [key, entry] of Object.entries(value)) {
    if (key === "_uid" || key === "component" || key === "_editable") {
      continue;
    }

    sanitized[key] = entry;
  }

  return sanitized;
}

export function mapStoryblokContent<T>(raw: unknown, fallback: T): T {
  if (raw === undefined || raw === null) {
    return fallback;
  }

  if (Array.isArray(fallback)) {
    if (!Array.isArray(raw) || raw.length === 0) {
      return fallback;
    }

    if (fallback.length === 0) {
      return raw as T;
    }

    if (typeof fallback[0] === "string") {
      return raw.map((item, index) => {
        if (typeof item === "string") {
          return item;
        }

        if (typeof item === "object" && item !== null) {
          const source = sanitizeBlockObject(item as Record<string, unknown>);
          const candidate =
            source.title ??
            source.text ??
            source.image ??
            source.value ??
            source.name ??
            source.filename ??
            source.description;

          if (typeof candidate === "string") {
            return candidate;
          }
        }

        return fallback[index] ?? fallback[0];
      }) as T;
    }

    return raw.map((item, index) =>
      mapStoryblokContent(item, fallback[index] ?? fallback[0])
    ) as T;
  }

  if (typeof fallback === "object" && fallback !== null) {
    const source =
      Array.isArray(raw) && raw.length > 0 && typeof raw[0] === "object" && raw[0] !== null
        ? sanitizeBlockObject(raw[0] as Record<string, unknown>)
        : typeof raw === "object" && raw !== null
          ? sanitizeBlockObject(raw as Record<string, unknown>)
          : null;

    if (!source) {
      return fallback;
    }

    const mapped: Record<string, unknown> = { ...(fallback as Record<string, unknown>) };

    for (const [key, fallbackValue] of Object.entries(fallback as Record<string, unknown>)) {
      mapped[key] = mapStoryblokContent(source[key], fallbackValue);
    }

    return mapped as T;
  }

  if (typeof fallback === "string" && typeof raw === "string") {
    return (raw.trim().length > 0 ? raw : fallback) as T;
  }

  return raw as T;
}

function normalizeStats(items: unknown[], fallback: unknown[]) {
  if (!Array.isArray(items) || items.length === 0) {
    return fallback;
  }

  return items.map((item, index) => {
    if (typeof item !== "object" || item === null) {
      return fallback[index] ?? item;
    }

    const entry = item as Record<string, unknown>;
    const parsedValue =
      typeof entry.value === "string" ? Number(entry.value) : entry.value;

    return {
      ...entry,
      value: Number.isFinite(parsedValue as number)
        ? parsedValue
        : (fallback[index] as Record<string, unknown>)?.value,
    };
  });
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
  } as unknown as T;
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
      paragraphs: normalizeParagraphs(
        statsSection?.paragraphs,
        fallback.statsSection.paragraphs as string[]
      ),
      stats: normalizeStats(statsSection?.stats as unknown as unknown[], fallback.statsSection.stats as unknown as unknown[]),
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
  } as unknown as T;
}

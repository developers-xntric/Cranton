type Primitive = string | number | boolean | null | undefined;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeStoryblokValue<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeStoryblokValue(item)) as T;
  }

  if (isPlainObject(value)) {
    if (typeof value.filename === "string") {
      return value.filename as T;
    }

    const normalized: Record<string, unknown> = {};

    for (const [key, entry] of Object.entries(value)) {
      normalized[key] = normalizeStoryblokValue(entry);
    }

    return normalized as T;
  }

  return value;
}

function mergeWithFallback<T>(fallback: T, incoming: unknown): T {
  if (incoming === undefined || incoming === null) {
    return fallback;
  }

  if (Array.isArray(fallback)) {
    return (Array.isArray(incoming) ? incoming : fallback) as T;
  }

  if (isPlainObject(fallback) && isPlainObject(incoming)) {
    const merged: Record<string, unknown> = { ...fallback };

    for (const [key, value] of Object.entries(incoming)) {
      const fallbackValue = merged[key];

      if (fallbackValue === undefined) {
        merged[key] = normalizeStoryblokValue(value);
        continue;
      }

      merged[key] = mergeWithFallback(
        fallbackValue,
        normalizeStoryblokValue(value)
      );
    }

    return merged as T;
  }

  return normalizeStoryblokValue(incoming) as T;
}

export async function getStoryblokContent<T>(
  slug: string,
  fallback: T
): Promise<T> {
  const token =
    process.env.STORYBLOK_PREVIEW_TOKEN ||
    process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN;

  if (!token) {
    return fallback;
  }

  const version =
    process.env.STORYBLOK_CONTENT_VERSION === "draft" ? "draft" : "published";

  try {
    const url = new URL(`https://api.storyblok.com/v2/cdn/stories/${slug}`);
    url.searchParams.set("token", token);
    url.searchParams.set("version", version);

    const response = await fetch(url.toString(), {
      next: {
        revalidate: 60,
        tags: [`storyblok:${slug}`],
      },
    });

    if (!response.ok) {
      return fallback;
    }

    const payload = await response.json();
    const storyContent =
      payload?.story?.content?.data ?? payload?.story?.content ?? null;

    return mergeWithFallback(fallback, storyContent);
  } catch {
    return fallback;
  }
}

export function asTextArray(value: Primitive[] | string[] | undefined) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

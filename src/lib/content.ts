import { getCollection, type CollectionEntry } from 'astro:content';
import { withBase } from './paths';
import { collectionMeta } from './site';

export type ContentCollectionName = keyof typeof collectionMeta;
export type Entry = CollectionEntry<ContentCollectionName>;
export type CategoryEntrySummary = {
  title: string;
  href: string;
  pubDate: string;
  collection: ContentCollectionName;
};
export type CategoryTagGroup = {
  slug: string;
  label: string;
  count: number;
  collection: ContentCollectionName;
  entries: CategoryEntrySummary[];
};

const WORDS_PER_MINUTE = 220;

export function sortEntries(entries: Entry[]) {
  return [...entries].sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );
}

export async function getPublishedEntries(collection: ContentCollectionName) {
  const entries = await getCollection(collection, ({ data }) => !data.draft);
  return sortEntries(entries);
}

export async function getAllPublishedEntries() {
  const [blog, essays] = await Promise.all([
    getPublishedEntries('blog'),
    getPublishedEntries('essays'),
  ]);

  return sortEntries([...blog, ...essays]);
}

export function getFeaturedEntries(entries: Entry[], limit = 3) {
  const featured = entries.filter((entry) => entry.data.featured);
  return featured.slice(0, limit);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function slugifyTag(tag: string) {
  return tag.trim().toLowerCase().replace(/\s+/g, '-');
}

export function getUniqueTags(entries: Entry[]) {
  const tags = new Map<string, string>();

  for (const entry of entries) {
    for (const tag of entry.data.tags) {
      tags.set(slugifyTag(tag), tag);
    }
  }

  return [...tags.entries()]
    .map(([slug, label]) => ({ slug, label }))
    .sort((a, b) => a.label.localeCompare(b.label, 'zh-CN'));
}

export function getEntriesByTag(entries: Entry[], tagSlug: string) {
  return entries.filter((entry) =>
    entry.data.tags.some((tag) => slugifyTag(tag) === tagSlug),
  );
}

export function buildCategoryHref(collection: ContentCollectionName, tag: string) {
  return withBase(`/categories?group=${collection}&tag=${slugifyTag(tag)}`);
}

export function getEntryHref(entry: Entry) {
  return withBase(`${collectionMeta[entry.collection].path}/${entry.id}`);
}

export function estimateReadingTime(text: string) {
  const plainText = text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*_\-\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const latinWords = plainText
    .replace(/[\u4e00-\u9fff]/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  const cjkChars = (plainText.match(/[\u4e00-\u9fff]/g) || []).length;
  const wordEquivalent = latinWords + cjkChars * 0.6;

  return Math.max(1, Math.round(wordEquivalent / WORDS_PER_MINUTE));
}

export function getReadingTime(entry: Entry) {
  return `${estimateReadingTime(entry.body ?? '')} min read`;
}

export function getListTags(entry: Entry, limit = 4) {
  const tags = entry.data.tags.slice(0, limit);
  return tags.length > 0 ? tags.join(', ') : 'Archive';
}

export function formatArchiveTitle(title: string) {
  const match = title.match(/^(.*?[，。：！？])(.*)$/);

  if (!match) {
    return {
      hasBreak: false,
      leading: title,
      trailing: '',
    };
  }

  return {
    hasBreak: true,
    leading: match[1].trim(),
    trailing: match[2].trim(),
  };
}

export function getAdjacentEntries(entries: Entry[], id: string) {
  const index = entries.findIndex((entry) => entry.id === id);
  if (index === -1) {
    return { previous: undefined, next: undefined };
  }

  return {
    previous: entries[index - 1],
    next: entries[index + 1],
  };
}

export function getCategoryTagGroups(
  collection: ContentCollectionName,
  entries: Entry[],
) {
  const groups = new Map<
    string,
    {
      slug: string;
      label: string;
      count: number;
      entries: Entry[];
    }
  >();

  for (const entry of entries) {
    for (const tag of entry.data.tags) {
      const slug = slugifyTag(tag);
      const current = groups.get(slug);

      if (current) {
        current.count += 1;
        current.entries.push(entry);
        continue;
      }

      groups.set(slug, {
        slug,
        label: tag,
        count: 1,
        entries: [entry],
      });
    }
  }

  return [...groups.values()]
    .map((group) => ({
      slug: group.slug,
      label: group.label,
      count: group.count,
      collection,
      entries: sortEntries(group.entries).map((entry) => ({
        title: entry.data.title,
        href: getEntryHref(entry),
        pubDate: formatDate(entry.data.pubDate),
        collection: entry.collection,
      })),
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'zh-CN'));
}

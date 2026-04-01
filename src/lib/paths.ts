function splitPathSuffix(path: string) {
  const match = path.match(/^([^?#]*)(.*)$/);

  return {
    pathname: match?.[1] ?? path,
    suffix: match?.[2] ?? '',
  };
}

export function normalizePathname(pathname: string) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return normalized.replace(/\/+$/, '') || '/';
}

export function withBase(path: string) {
  if (
    !path ||
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#')
  ) {
    return path;
  }

  const { pathname, suffix } = splitPathSuffix(path);
  const normalizedPath = normalizePathname(pathname);
  const basePath = normalizePathname(import.meta.env.BASE_URL);

  if (basePath === '/') {
    return normalizedPath === '/' ? '/' : `${normalizedPath}${suffix}`;
  }

  if (normalizedPath === '/') {
    return `${basePath}/`;
  }

  return `${basePath}${normalizedPath}${suffix}`;
}

export function stripBase(pathname: string) {
  const normalizedPath = normalizePathname(pathname);
  const basePath = normalizePathname(import.meta.env.BASE_URL);

  if (basePath === '/') {
    return normalizedPath;
  }

  if (normalizedPath === basePath) {
    return '/';
  }

  if (normalizedPath.startsWith(`${basePath}/`)) {
    return normalizedPath.slice(basePath.length) || '/';
  }

  return normalizedPath;
}

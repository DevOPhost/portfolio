/// <reference types="vite/client" />

export const pageIds = [
  "inicio",
  "servicos",
  "projetos",
  "sobre",
  "carreira",
  "contato"
] as const;

export type PageId = (typeof pageIds)[number];

const pageSegments: Record<PageId, string> = {
  inicio: "",
  servicos: "servicos/",
  projetos: "projetos/",
  sobre: "sobre/",
  carreira: "carreira/",
  contato: "contato/"
};

const pageBySegment = Object.fromEntries(
  Object.entries(pageSegments)
    .filter(([, segment]) => segment)
    .map(([page, segment]) => [segment.replace(/\/$/, ""), page])
) as Record<string, PageId>;

const legacyHashTargets: Record<string, { page: PageId; anchor?: string }> = {
  inicio: { page: "inicio" },
  servicos: { page: "servicos" },
  projetos: { page: "projetos" },
  sobre: { page: "sobre" },
  stack: { page: "sobre", anchor: "stack" },
  tecnologias: { page: "sobre", anchor: "stack" },
  carreira: { page: "carreira" },
  experiencia: { page: "carreira", anchor: "experiencia" },
  estagios: { page: "carreira", anchor: "estagios" },
  formacao: { page: "carreira", anchor: "formacao" },
  certificados: { page: "carreira", anchor: "certificados" },
  eventos: { page: "carreira", anchor: "eventos" },
  extensao: { page: "carreira", anchor: "extensao" },
  curriculo: { page: "carreira", anchor: "curriculo" },
  contato: { page: "contato" }
};

export type ResolvedPageLocation = {
  page: PageId;
  anchor: string | null;
  needsCanonicalization: boolean;
  source: "path" | "legacy-hash" | "body" | "default";
};

export function isPageId(value: unknown): value is PageId {
  return typeof value === "string" && pageIds.includes(value as PageId);
}

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function normalizePageAnchor(anchor?: string | null) {
  if (!anchor) return null;
  const normalized = safeDecode(anchor.replace(/^#/, "").trim());
  return normalized || null;
}

function normalizePath(pathname: string) {
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return withLeadingSlash.replace(/\/{2,}/g, "/");
}

function inferRelativeBase(pathname: string) {
  const normalized = normalizePath(pathname);
  const routeNames = Object.keys(pageBySegment).join("|");
  const routeSuffix = new RegExp(`/(?:${routeNames})(?:/index\\.html|/?)$`, "i");
  const withoutRoute = normalized.replace(routeSuffix, "/");

  if (withoutRoute !== normalized) return withoutRoute;
  if (normalized.endsWith("/")) return normalized;
  return normalized.replace(/\/[^/]*$/, "/");
}

function normalizeBasePath(rawBase: string) {
  if (!rawBase || rawBase === "." || rawBase === "./") {
    return typeof window === "undefined" ? "/" : inferRelativeBase(window.location.pathname);
  }

  let pathname = rawBase;
  try {
    if (/^https?:\/\//i.test(rawBase)) pathname = new URL(rawBase).pathname;
  } catch {
    pathname = rawBase;
  }

  const normalized = normalizePath(pathname);
  return normalized.endsWith("/") ? normalized : `${normalized}/`;
}

export const basePath = normalizeBasePath(import.meta.env.BASE_URL);

function pageFromPath(pathname: string): PageId | null {
  const normalized = normalizePath(pathname);
  const baseWithoutTrailingSlash = basePath === "/" ? "" : basePath.replace(/\/$/, "");

  if (
    normalized === `${baseWithoutTrailingSlash}/` ||
    normalized === baseWithoutTrailingSlash ||
    normalized === `${baseWithoutTrailingSlash}/index.html`
  ) {
    return "inicio";
  }

  const basePrefix = baseWithoutTrailingSlash ? `${baseWithoutTrailingSlash}/` : "/";
  if (!normalized.startsWith(basePrefix)) return null;

  const relativePath = normalized
    .slice(basePrefix.length)
    .replace(/^\/+|\/+$/g, "")
    .replace(/\/index\.html$/i, "");

  return pageBySegment[safeDecode(relativePath)] ?? null;
}

function readBodyPage(): PageId | null {
  if (typeof document === "undefined") return null;
  const candidate = document.body?.dataset.page;
  return isPageId(candidate) ? candidate : null;
}

export function pageFromPathname(pathname: string, bodyPage: PageId | null = readBodyPage()) {
  return pageFromPath(pathname) ?? bodyPage ?? "inicio";
}

export function resolvePageLocation(
  pathname = typeof window === "undefined" ? basePath : window.location.pathname,
  hash = typeof window === "undefined" ? "" : window.location.hash,
  bodyPage: PageId | null = readBodyPage()
): ResolvedPageLocation {
  const pathPage = pageFromPath(pathname);
  const normalizedHash = normalizePageAnchor(hash);
  const legacyTarget = normalizedHash ? legacyHashTargets[normalizedHash.toLowerCase()] : undefined;

  if ((!pathPage || pathPage === "inicio") && legacyTarget) {
    return {
      page: legacyTarget.page,
      anchor: legacyTarget.anchor ?? null,
      needsCanonicalization: true,
      source: "legacy-hash"
    };
  }

  if (pathPage) {
    return {
      page: pathPage,
      anchor: normalizedHash,
      needsCanonicalization: false,
      source: "path"
    };
  }

  if (bodyPage) {
    return {
      page: bodyPage,
      anchor: normalizedHash,
      needsCanonicalization: true,
      source: "body"
    };
  }

  return {
    page: "inicio",
    anchor: normalizedHash,
    needsCanonicalization: true,
    source: "default"
  };
}

export function pageHref(page: PageId, anchor?: string | null) {
  const href = `${basePath}${pageSegments[page]}`.replace(/\/{2,}/g, "/");
  const normalizedAnchor = normalizePageAnchor(anchor);
  return normalizedAnchor ? `${href}#${encodeURIComponent(normalizedAnchor)}` : href;
}

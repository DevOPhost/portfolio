import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import {
  normalizePageAnchor,
  pageHref,
  resolvePageLocation,
  type PageId,
  type ResolvedPageLocation
} from "../routes";

export type PageTransitionPhase = "leaving" | "entering" | "idle";

export type PageFocusTarget =
  | { readonly current: HTMLElement | null }
  | ((page: PageId) => HTMLElement | null);

export type PageNavigateOptions = {
  anchor?: string | null;
  replace?: boolean;
  focus?: boolean;
};

export type UsePageRouteOptions = {
  focusTarget?: PageFocusTarget;
  exitDuration?: number;
  enterDuration?: number;
  reduceMotion?: boolean | (() => boolean);
  onPageRendered?: (page: PageId) => void;
};

export type UsePageRouteResult = {
  activePage: PageId;
  renderedPage: PageId;
  phase: PageTransitionPhase;
  isTransitioning: boolean;
  navigate: (page: PageId, options?: PageNavigateOptions) => void;
  href: typeof pageHref;
};

type NavigationTarget = Pick<ResolvedPageLocation, "page" | "anchor">;

const routeStateKey = "portfolioPage";

function isReducedMotion(preference?: boolean | (() => boolean)) {
  const explicitPreference = typeof preference === "function" ? preference() : preference;
  if (explicitPreference) return true;
  if (typeof window === "undefined") return false;

  return (
    document.documentElement.dataset.motion === "reduce" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function resolveFocusTarget(target: PageFocusTarget | undefined, page: PageId) {
  if (!target) return null;
  return typeof target === "function" ? target(page) : target.current;
}

function focusElement(element: HTMLElement) {
  const addedTabIndex = !element.hasAttribute("tabindex");
  if (addedTabIndex) element.setAttribute("tabindex", "-1");

  element.focus({ preventScroll: true });

  if (addedTabIndex) {
    element.addEventListener("blur", () => element.removeAttribute("tabindex"), { once: true });
  }
}

function historyState(page: PageId) {
  const previous = typeof window.history.state === "object" && window.history.state
    ? window.history.state
    : {};

  return { ...previous, [routeStateKey]: page };
}

export function usePageRoute(options: UsePageRouteOptions = {}): UsePageRouteResult {
  const initialLocationRef = useRef<ResolvedPageLocation | null>(null);
  if (!initialLocationRef.current) initialLocationRef.current = resolvePageLocation();

  const initialLocation = initialLocationRef.current;
  const [activePage, setActivePage] = useState<PageId>(initialLocation.page);
  const [renderedPage, setRenderedPage] = useState<PageId>(initialLocation.page);
  const [phase, setPhase] = useState<PageTransitionPhase>("idle");

  const activePageRef = useRef(activePage);
  const renderedPageRef = useRef(renderedPage);
  const phaseRef = useRef<PageTransitionPhase>(phase);
  const optionsRef = useRef(options);
  const exitTimerRef = useRef<number | null>(null);
  const enterTimerRef = useRef<number | null>(null);
  const firstFrameRef = useRef<number | null>(null);
  const secondFrameRef = useRef<number | null>(null);
  const lastHandledLocationRef = useRef("");
  const mountedRef = useRef(false);

  optionsRef.current = options;

  const setTransitionPhase = useCallback((nextPhase: PageTransitionPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }, []);

  const clearScheduledWork = useCallback(() => {
    if (exitTimerRef.current !== null) window.clearTimeout(exitTimerRef.current);
    if (enterTimerRef.current !== null) window.clearTimeout(enterTimerRef.current);
    if (firstFrameRef.current !== null) window.cancelAnimationFrame(firstFrameRef.current);
    if (secondFrameRef.current !== null) window.cancelAnimationFrame(secondFrameRef.current);

    exitTimerRef.current = null;
    enterTimerRef.current = null;
    firstFrameRef.current = null;
    secondFrameRef.current = null;
  }, []);

  const afterPagePaint = useCallback((callback: () => void) => {
    firstFrameRef.current = window.requestAnimationFrame(() => {
      firstFrameRef.current = null;
      secondFrameRef.current = window.requestAnimationFrame(() => {
        secondFrameRef.current = null;
        if (mountedRef.current) callback();
      });
    });
  }, []);

  const positionAndFocus = useCallback((target: NavigationTarget, shouldFocus: boolean) => {
    afterPagePaint(() => {
      const anchorElement = target.anchor ? document.getElementById(target.anchor) : null;

      if (anchorElement) {
        anchorElement.scrollIntoView({ behavior: "auto", block: "start" });
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }

      if (shouldFocus) {
        const focusTarget = anchorElement ?? resolveFocusTarget(optionsRef.current.focusTarget, target.page);
        if (focusTarget) focusElement(focusTarget);
      }

      optionsRef.current.onPageRendered?.(target.page);
    });
  }, [afterPagePaint]);

  const commitRenderedPage = useCallback((target: NavigationTarget, shouldFocus: boolean, reduced: boolean) => {
    renderedPageRef.current = target.page;
    setRenderedPage(target.page);

    if (reduced) {
      setTransitionPhase("idle");
      positionAndFocus(target, shouldFocus);
      return;
    }

    setTransitionPhase("entering");
    positionAndFocus(target, shouldFocus);
    enterTimerRef.current = window.setTimeout(() => {
      enterTimerRef.current = null;
      if (mountedRef.current && activePageRef.current === target.page) setTransitionPhase("idle");
    }, Math.max(0, optionsRef.current.enterDuration ?? 360));
  }, [positionAndFocus, setTransitionPhase]);

  const beginTransition = useCallback((
    target: NavigationTarget,
    updateHistory: "push" | "replace" | "none",
    shouldFocus: boolean
  ) => {
    clearScheduledWork();

    const href = pageHref(target.page, target.anchor);
    if (updateHistory !== "none") {
      const currentHref = `${window.location.pathname}${window.location.hash}`;
      if (currentHref !== href) {
        window.history[updateHistory === "replace" ? "replaceState" : "pushState"](
          historyState(target.page),
          "",
          href
        );
      }
      lastHandledLocationRef.current = window.location.href;
    }

    activePageRef.current = target.page;
    setActivePage(target.page);

    const reduced = isReducedMotion(optionsRef.current.reduceMotion);
    if (target.page === renderedPageRef.current || reduced) {
      commitRenderedPage(target, shouldFocus, reduced);
      return;
    }

    setTransitionPhase("leaving");
    exitTimerRef.current = window.setTimeout(() => {
      exitTimerRef.current = null;
      if (!mountedRef.current || activePageRef.current !== target.page) return;
      commitRenderedPage(target, shouldFocus, false);
    }, Math.max(0, optionsRef.current.exitDuration ?? 170));
  }, [clearScheduledWork, commitRenderedPage, setTransitionPhase]);

  const navigate = useCallback((page: PageId, navigateOptions: PageNavigateOptions = {}) => {
    beginTransition(
      { page, anchor: normalizePageAnchor(navigateOptions.anchor) },
      navigateOptions.replace ? "replace" : "push",
      navigateOptions.focus !== false
    );
  }, [beginTransition]);

  useEffect(() => {
    mountedRef.current = true;
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    document.body.dataset.page = renderedPageRef.current;
    lastHandledLocationRef.current = window.location.href;

    if (initialLocation.needsCanonicalization) {
      window.history.replaceState(
        historyState(initialLocation.page),
        "",
        pageHref(initialLocation.page, initialLocation.anchor)
      );
      lastHandledLocationRef.current = window.location.href;
    }

    if (initialLocation.anchor) positionAndFocus(initialLocation, false);

    const handleLocationChange = () => {
      if (lastHandledLocationRef.current === window.location.href) return;
      lastHandledLocationRef.current = window.location.href;

      const nextLocation = resolvePageLocation();
      if (nextLocation.needsCanonicalization) {
        window.history.replaceState(
          historyState(nextLocation.page),
          "",
          pageHref(nextLocation.page, nextLocation.anchor)
        );
        lastHandledLocationRef.current = window.location.href;
      }

      beginTransition(nextLocation, "none", true);
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);

    return () => {
      mountedRef.current = false;
      clearScheduledWork();
      window.history.scrollRestoration = previousScrollRestoration;
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, [beginTransition, clearScheduledWork, initialLocation, positionAndFocus]);

  useEffect(() => {
    document.body.dataset.page = renderedPage;
  }, [renderedPage]);

  useEffect(() => {
    document.documentElement.dataset.pageTransition = phase;
  }, [phase]);

  return {
    activePage,
    renderedPage,
    phase,
    isTransitioning: phase !== "idle",
    navigate,
    href: pageHref
  };
}

import {
  ChevronDown,
  Menu,
  Minus,
  Moon,
  Plus,
  Sun,
  X
} from "lucide-react";
import {
  type Dispatch,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type RefObject,
  type SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import type { ActionCopy } from "../content/commercial";
import { links } from "../config";
import { languageOptions, type Language, type PortfolioContent } from "../i18n";
import { pageHref, type PageId } from "../routes";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { AccessibilityHandsIcon } from "./AccessibilityHandsIcon";

type AccessibilitySettings = {
  theme: "dark" | "light";
  fontScale: number;
  highContrast: boolean;
  reduceMotion: boolean;
  underlineLinks: boolean;
};

type AccessibilityCopy = PortfolioContent["accessibility"];
type LanguageSelectorCopy = PortfolioContent["languageSelector"];

const defaultSettings: AccessibilitySettings = {
  theme: "dark",
  fontScale: 1,
  highContrast: false,
  reduceMotion: false,
  underlineLinks: false
};

function readSettings() {
  if (typeof window === "undefined") return defaultSettings;

  try {
    const saved = JSON.parse(localStorage.getItem("portfolio-accessibility") ?? "{}");
    return { ...defaultSettings, ...saved } as AccessibilitySettings;
  } catch {
    return defaultSettings;
  }
}

function AccessibilityMenu({
  labels,
  settings,
  setSettings,
  panelRef,
  closeButtonRef,
  isClosing,
  onClose
}: {
  labels: AccessibilityCopy;
  settings: AccessibilitySettings;
  setSettings: Dispatch<SetStateAction<AccessibilitySettings>>;
  panelRef: RefObject<HTMLDivElement>;
  closeButtonRef: RefObject<HTMLButtonElement>;
  isClosing: boolean;
  onClose: () => void;
}) {
  const setFont = (value: number) => setSettings((current) => ({
    ...current,
    fontScale: Math.min(1.2, Math.max(0.9, Number(value.toFixed(1))))
  }));

  const toggle = (key: "highContrast" | "reduceMotion" | "underlineLinks") => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  return (
    <div
      id="accessibility-panel"
      ref={panelRef}
      className={`accessibility-panel accessibility-panel--floating${isClosing ? " is-closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={labels.modalLabel}
    >
      <button
        ref={closeButtonRef}
        className="accessibility-panel__close"
        type="button"
        onClick={onClose}
        aria-label={labels.close}
      >
        <X size={16} />
      </button>

      <header>
        <span>{labels.titleKicker}</span>
        <h2>{labels.title}</h2>
        <p>{labels.description}</p>
      </header>

      <div className="accessibility-control">
        <div><span>{labels.theme}</span><small>{labels.themeDescription}</small></div>
        <div className="segmented-control">
          <button
            type="button"
            aria-pressed={settings.theme === "dark"}
            onClick={() => setSettings((current) => ({ ...current, theme: "dark" }))}
          >
            <Moon size={17} /> {labels.dark}
          </button>
          <button
            type="button"
            aria-pressed={settings.theme === "light"}
            onClick={() => setSettings((current) => ({ ...current, theme: "light" }))}
          >
            <Sun size={17} /> {labels.light}
          </button>
        </div>
      </div>

      <div className="accessibility-control">
        <div><span>{labels.fontSize}</span><small>{labels.fontPercent(settings.fontScale)}</small></div>
        <div className="font-control">
          <button
            type="button"
            onClick={() => setFont(settings.fontScale - 0.1)}
            aria-label={labels.decreaseText}
          >
            <Minus />
          </button>
          <output aria-live="polite">{Math.round(settings.fontScale * 100)}%</output>
          <button
            type="button"
            onClick={() => setFont(settings.fontScale + 0.1)}
            aria-label={labels.increaseText}
          >
            <Plus />
          </button>
        </div>
      </div>

      {labels.toggles.map(([key, title, description]) => {
        const settingKey = key as "highContrast" | "reduceMotion" | "underlineLinks";

        return (
          <button
            className="accessibility-toggle"
            type="button"
            key={settingKey}
            aria-pressed={settings[settingKey]}
            onClick={() => toggle(settingKey)}
          >
            <span><strong>{title}</strong><small>{description}</small></span>
            <i aria-hidden="true" />
          </button>
        );
      })}

      <button
        className="accessibility-reset"
        type="button"
        onClick={() => setSettings(defaultSettings)}
      >
        {labels.reset}
      </button>
    </div>
  );
}

function useSectionReveal(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        element.classList.toggle("is-visible", entry.isIntersecting);
      },
      { threshold: 0.08, rootMargin: "-4% 0px -8% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
}

function LanguageFlag({ language }: { language: Language }) {
  const source = language === "pt" ? "assets/flags/br.svg" : "assets/flags/us.svg";

  return (
    <span className="language-switcher__flag" aria-hidden="true">
      <img src={source} alt="" loading="eager" />
    </span>
  );
}

function LanguageSwitcher({
  language,
  labels,
  onLanguageChange
}: {
  language: Language;
  labels: LanguageSelectorCopy;
  onLanguageChange: (language: Language) => void;
}) {
  const [open, setOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const focusIndexRef = useRef(0);
  const currentIndex = Math.max(
    0,
    languageOptions.findIndex((option) => option.code === language)
  );
  const currentOption = languageOptions[currentIndex];
  const currentLabel = currentOption.code === "pt" ? labels.pt : labels.en;

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  const openAt = (index: number) => {
    const boundedIndex = Math.min(languageOptions.length - 1, Math.max(0, index));
    focusIndexRef.current = boundedIndex;
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;

    const focusFrame = window.requestAnimationFrame(() => {
      optionRefs.current[focusIndexRef.current]?.focus();
    });

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!switcherRef.current?.contains(event.target as Node)) closeMenu(false);
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
      }
    };

    window.addEventListener("pointerdown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("pointerdown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeMenu, open]);

  const chooseLanguage = (nextLanguage: Language) => {
    onLanguageChange(nextLanguage);
    closeMenu(true);
  };

  const handleTriggerKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openAt(currentIndex);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openAt(languageOptions.length - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      openAt(0);
    } else if (event.key === "End") {
      event.preventDefault();
      openAt(languageOptions.length - 1);
    }
  };

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const focusedIndex = optionRefs.current.findIndex(
      (element) => element === document.activeElement
    );
    const fallbackIndex = focusedIndex >= 0 ? focusedIndex : currentIndex;
    let nextIndex: number | null = null;

    if (event.key === "ArrowDown") {
      nextIndex = (fallbackIndex + 1) % languageOptions.length;
    } else if (event.key === "ArrowUp") {
      nextIndex = (fallbackIndex - 1 + languageOptions.length) % languageOptions.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = languageOptions.length - 1;
    } else if (event.key === "Tab") {
      setOpen(false);
      return;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      optionRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className={"language-switcher" + (open ? " is-open" : "")} ref={switcherRef}>
      <button
        ref={triggerRef}
        className="language-switcher__trigger"
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="language-switcher-menu"
        aria-label={labels.aria + ": " + currentLabel}
        onClick={() => {
          if (open) closeMenu(false);
          else openAt(currentIndex);
        }}
        onKeyDown={handleTriggerKeyDown}
      >
        <LanguageFlag language={currentOption.code} />
        <strong>{currentOption.short}</strong>
        <ChevronDown aria-hidden="true" size={14} />
      </button>

      <div
        id="language-switcher-menu"
        className="language-switcher__menu"
        role="menu"
        aria-label={labels.aria}
        aria-hidden={!open}
        onKeyDown={handleMenuKeyDown}
      >
        {languageOptions.map((option, index) => {
          const languageLabel = option.code === "pt" ? labels.pt : labels.en;

          return (
            <button
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              key={option.code}
              type="button"
              role="menuitemradio"
              aria-checked={language === option.code}
              tabIndex={open ? 0 : -1}
              onClick={() => chooseLanguage(option.code)}
            >
              <LanguageFlag language={option.code} />
              <span>
                <strong>{languageLabel}</strong>
                <small>{option.short}</small>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Section({
  id,
  className = "",
  children
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);

  return (
    <section
      ref={ref}
      id={id}
      className={"section " + className}
    >
      {children}
    </section>
  );
}

export function SectionIntro({
  label,
  title,
  description
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="section-intro">
      <span>{label}</span>
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </header>
  );
}

function shouldUseClientNavigation(event: ReactMouseEvent<HTMLAnchorElement>) {
  return (
    event.button === 0 &&
    !event.defaultPrevented &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

export function Navigation({
  language,
  activePage,
  navigationItems,
  labels,
  onLanguageChange,
  onNavigate
}: {
  language: Language;
  activePage: PageId;
  navigationItems: ReadonlyArray<{ id: PageId; label: string }>;
  labels: {
    brandRole: string;
    navLabel: string;
    projectCta: ActionCopy;
    languageSelector: LanguageSelectorCopy;
    accessibility: AccessibilityCopy;
  };
  onLanguageChange: (language: Language) => void;
  onNavigate: (page: PageId) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [accessibilityClosing, setAccessibilityClosing] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(readSettings);
  const navRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navItemRefs = useRef(new Map<PageId, HTMLAnchorElement>());
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const accessibilityDockRef = useRef<HTMLDivElement>(null);
  const accessibilityPanelRef = useRef<HTMLDivElement>(null);
  const accessibilityButtonRef = useRef<HTMLButtonElement>(null);
  const accessibilityCloseRef = useRef<HTMLButtonElement>(null);
  const accessibilityCloseTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = settings.theme;
    root.dataset.contrast = settings.highContrast ? "high" : "normal";
    root.dataset.motion = settings.reduceMotion ? "reduce" : "full";
    root.dataset.links = settings.underlineLinks ? "underlined" : "default";
    root.style.setProperty("--font-scale", String(settings.fontScale));

    try {
      localStorage.setItem("portfolio-accessibility", JSON.stringify(settings));
    } catch {
      // The controls remain available when storage is blocked.
    }
  }, [settings]);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const desktopQuery = window.matchMedia("(min-width: 1121px)");
    let frame = 0;
    let disposed = false;

    const measure = () => {
      frame = 0;
      const activeLink = navItemRefs.current.get(activePage);

      if (!desktopQuery.matches || !activeLink) {
        nav.style.removeProperty("--nav-indicator-x");
        nav.style.removeProperty("--nav-indicator-width");
        nav.dataset.indicatorReady = "false";
        return;
      }

      const navBounds = nav.getBoundingClientRect();
      const activeBounds = activeLink.getBoundingClientRect();
      nav.style.setProperty(
        "--nav-indicator-x",
        String(activeBounds.left - navBounds.left) + "px"
      );
      nav.style.setProperty(
        "--nav-indicator-width",
        String(activeBounds.width) + "px"
      );
      nav.dataset.indicatorReady = "true";
    };

    const scheduleMeasure = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(measure);
    };

    const resizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(scheduleMeasure);
    resizeObserver?.observe(nav);
    navItemRefs.current.forEach((item) => resizeObserver?.observe(item));
    desktopQuery.addEventListener("change", scheduleMeasure);
    window.addEventListener("resize", scheduleMeasure, { passive: true });
    document.fonts?.ready.then(() => {
      if (!disposed) scheduleMeasure();
    });
    scheduleMeasure();

    return () => {
      disposed = true;
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      desktopQuery.removeEventListener("change", scheduleMeasure);
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [activePage, navigationItems]);

  useEffect(() => {
    if (!menuOpen) return;

    const mobileQuery = window.matchMedia("(max-width: 1120px)");
    if (!mobileQuery.matches) {
      setMenuOpen(false);
      return;
    }

    const bodyOverflow = document.body.style.overflow;
    const inertTargets = [
      document.querySelector<HTMLElement>("#conteudo"),
      document.querySelector<HTMLElement>("#site-footer"),
      document.querySelector<HTMLElement>(".language-dock"),
      document.querySelector<HTMLElement>(".accessibility-dock")
    ].filter((element): element is HTMLElement => Boolean(element));

    document.body.style.overflow = "hidden";
    inertTargets.forEach((element) => element.setAttribute("inert", ""));

    const focusActiveItem = () => {
      navItemRefs.current.get(activePage)?.focus({ preventScroll: true });
    };
    const focusFrame = window.requestAnimationFrame(focusActiveItem);
    const focusTimer = window.setTimeout(focusActiveItem, 80);

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") return;

      const navItems = Array.from(
        navRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []
      );
      const focusableItems = [
        ...navItems,
        menuButtonRef.current
      ].filter((element): element is HTMLElement => Boolean(element));
      const first = focusableItems[0];
      const last = focusableItems[focusableItems.length - 1];

      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("pointerdown", closeOnOutsidePointer);
    window.addEventListener("keydown", handleKeyboard);

    return () => {
      document.body.style.overflow = bodyOverflow;
      inertTargets.forEach((element) => element.removeAttribute("inert"));
      window.cancelAnimationFrame(focusFrame);
      window.clearTimeout(focusTimer);
      window.removeEventListener("pointerdown", closeOnOutsidePointer);
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [activePage, menuOpen]);

  const closeAccessibility = useCallback((restoreFocus: boolean) => {
    if (accessibilityCloseTimerRef.current !== null) return;

    const finish = () => {
      accessibilityCloseTimerRef.current = null;
      setAccessibilityOpen(false);
      setAccessibilityClosing(false);
      if (restoreFocus) {
        window.requestAnimationFrame(() => accessibilityButtonRef.current?.focus());
      }
    };

    if (document.documentElement.dataset.motion === "reduce") {
      finish();
      return;
    }

    setAccessibilityClosing(true);
    accessibilityCloseTimerRef.current = window.setTimeout(finish, 260);
  }, []);

  useEffect(() => () => {
    if (accessibilityCloseTimerRef.current !== null) {
      window.clearTimeout(accessibilityCloseTimerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!accessibilityOpen) return;

    const bodyOverflow = document.body.style.overflow;
    const inertTargets = [
      document.querySelector<HTMLElement>("#conteudo"),
      document.querySelector<HTMLElement>("#site-footer"),
      document.querySelector<HTMLElement>(".topbar"),
      document.querySelector<HTMLElement>(".language-dock")
    ].filter((element): element is HTMLElement => Boolean(element));

    document.body.style.overflow = "hidden";
    inertTargets.forEach((element) => element.setAttribute("inert", ""));

    const focusFrame = window.requestAnimationFrame(() => {
      accessibilityCloseRef.current?.focus();
    });

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!accessibilityDockRef.current?.contains(event.target as Node)) {
        closeAccessibility(false);
      }
    };

    const handleKeyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeAccessibility(true);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableItems = Array.from(
        accessibilityPanelRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
      const first = focusableItems[0];
      const last = focusableItems[focusableItems.length - 1];

      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("pointerdown", closeOnOutsideClick);
    window.addEventListener("keydown", handleKeyboard);

    return () => {
      document.body.style.overflow = bodyOverflow;
      inertTargets.forEach((element) => element.removeAttribute("inert"));
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("pointerdown", closeOnOutsideClick);
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [accessibilityOpen, closeAccessibility]);

  const navigateFromLink = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    page: PageId
  ) => {
    if (!shouldUseClientNavigation(event)) return;
    event.preventDefault();
    setMenuOpen(false);
    onNavigate(page);
  };

  const homeLabel = navigationItems.find((item) => item.id === "inicio")?.label ?? "Início";

  return (
    <>
      <header className="topbar" ref={headerRef}>
        <a
          className="brand"
          href={pageHref("inicio")}
          tabIndex={menuOpen ? -1 : undefined}
          aria-label={"Leonardo Farias Martins, " + homeLabel}
          onClick={(event) => navigateFromLink(event, "inicio")}
        >
          <img src="favicon.svg" alt="" width="42" height="42" />
          <span>
            <strong>Leonardo Farias</strong>
            <small>{labels.brandRole}</small>
          </span>
        </a>

        <nav
          ref={navRef}
          id="site-navigation"
          className={menuOpen ? "is-open" : ""}
          aria-label={labels.navLabel}
          data-active-page={activePage}
        >
          <span className="topbar-nav__indicator" aria-hidden="true" />
          {navigationItems.map(({ id, label }) => (
            <a
              ref={(element) => {
                if (element) navItemRefs.current.set(id, element);
                else navItemRefs.current.delete(id);
              }}
              key={id}
              href={pageHref(id)}
              aria-current={activePage === id ? "page" : undefined}
              onClick={(event) => navigateFromLink(event, id)}
            >
              {label}
            </a>
          ))}
          <a
            className="mobile-resume mobile-project-cta"
            href={links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labels.projectCta.ariaLabel}
            onClick={() => setMenuOpen(false)}
          >
            <WhatsAppIcon aria-hidden="true" />
            {labels.projectCta.label}
          </a>
        </nav>

        <div className="topbar-actions">
          <button
            className="icon-button"
            type="button"
            tabIndex={menuOpen ? -1 : undefined}
            onClick={() => setSettings((current) => ({
              ...current,
              theme: current.theme === "dark" ? "light" : "dark"
            }))}
            aria-label={
              settings.theme === "dark"
                ? labels.accessibility.themeToggle.toLight
                : labels.accessibility.themeToggle.toDark
            }
          >
            {settings.theme === "dark" ? <Sun /> : <Moon />}
          </button>
          <a
            className="topbar-resume topbar-project-cta"
            href={links.whatsapp}
            tabIndex={menuOpen ? -1 : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={labels.projectCta.ariaLabel}
          >
            <WhatsAppIcon aria-hidden="true" />
            <span>{labels.projectCta.label}</span>
          </a>
          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            aria-label={
              menuOpen
                ? labels.accessibility.menu.close
                : labels.accessibility.menu.open
            }
            onClick={() => {
              setMenuOpen((current) => {
                const next = !current;
                if (next) setAccessibilityOpen(false);
                return next;
              });
            }}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <div className={"language-dock" + (menuOpen ? " is-menu-open" : "")}>
        <LanguageSwitcher
          language={language}
          labels={labels.languageSelector}
          onLanguageChange={onLanguageChange}
        />
      </div>

      <div
        className={
          "accessibility-dock" +
          (accessibilityOpen ? " is-open" : "") +
          (accessibilityClosing ? " is-closing" : "")
        }
        ref={accessibilityDockRef}
        hidden={menuOpen}
      >
        <button
          ref={accessibilityButtonRef}
          className="accessibility-fab"
          type="button"
          aria-label={labels.accessibility.open}
          aria-expanded={accessibilityOpen && !accessibilityClosing}
          aria-haspopup="dialog"
          aria-controls="accessibility-panel"
          onClick={() => {
            if (accessibilityOpen) closeAccessibility(false);
            else {
              if (accessibilityCloseTimerRef.current !== null) {
                window.clearTimeout(accessibilityCloseTimerRef.current);
                accessibilityCloseTimerRef.current = null;
              }
              setAccessibilityClosing(false);
              setMenuOpen(false);
              setAccessibilityOpen(true);
            }
          }}
        >
          <AccessibilityHandsIcon />
        </button>

        {accessibilityOpen && (
          <AccessibilityMenu
            labels={labels.accessibility}
            settings={settings}
            setSettings={setSettings}
            panelRef={accessibilityPanelRef}
            closeButtonRef={accessibilityCloseRef}
            isClosing={accessibilityClosing}
            onClose={() => closeAccessibility(true)}
          />
        )}
      </div>
    </>
  );
}

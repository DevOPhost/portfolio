import {
  Accessibility,
  Check,
  Contrast,
  Download,
  Link2,
  Menu,
  Minus,
  Moon,
  Plus,
  RotateCcw,
  Sun,
  X
} from "lucide-react";
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useRef,
  useState
} from "react";
import { links } from "../config";
import { languageOptions, type Language, type PortfolioContent } from "../i18n";
import { Modal } from "./Modal";

type AccessibilitySettings = {
  theme: "dark" | "light";
  fontScale: number;
  highContrast: boolean;
  reduceMotion: boolean;
  underlineLinks: boolean;
};

type NavigationItem = readonly [string, string];
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
  onClose
}: {
  labels: AccessibilityCopy;
  settings: AccessibilitySettings;
  setSettings: Dispatch<SetStateAction<AccessibilitySettings>>;
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
    <Modal label={labels.modalLabel} size="accessibility" onClose={onClose}>
      <div className="accessibility-panel">
        <header>
          <span>{labels.titleKicker}</span>
          <h2>{labels.title}</h2>
          <p>{labels.description}</p>
        </header>

        <div className="accessibility-control">
          <div><span>{labels.theme}</span><small>{labels.themeDescription}</small></div>
          <div className="segmented-control">
            <button type="button" aria-pressed={settings.theme === "dark"} onClick={() => setSettings((current) => ({ ...current, theme: "dark" }))}>
              <Moon size={17} /> {labels.dark}
            </button>
            <button type="button" aria-pressed={settings.theme === "light"} onClick={() => setSettings((current) => ({ ...current, theme: "light" }))}>
              <Sun size={17} /> {labels.light}
            </button>
          </div>
        </div>

        <div className="accessibility-control">
          <div><span>{labels.fontSize}</span><small>{labels.fontPercent(settings.fontScale)}</small></div>
          <div className="font-control">
            <button type="button" onClick={() => setFont(settings.fontScale - 0.1)} aria-label={labels.decreaseText}><Minus /></button>
            <output aria-live="polite">{Math.round(settings.fontScale * 100)}%</output>
            <button type="button" onClick={() => setFont(settings.fontScale + 0.1)} aria-label={labels.increaseText}><Plus /></button>
          </div>
        </div>

        {labels.toggles.map(([key, title, description]) => {
          const settingKey = key as "highContrast" | "reduceMotion" | "underlineLinks";
          const ControlIcon = settingKey === "highContrast" ? Contrast : settingKey === "reduceMotion" ? Accessibility : Link2;
          return (
            <button
              className="accessibility-toggle"
              type="button"
              key={settingKey}
              aria-pressed={settings[settingKey]}
              onClick={() => toggle(settingKey)}
            >
              <ControlIcon />
              <span><strong>{title}</strong><small>{description}</small></span>
              <i>{settings[settingKey] && <Check size={14} />}</i>
            </button>
          );
        })}

        <button className="accessibility-reset" type="button" onClick={() => setSettings(defaultSettings)}>
          <RotateCcw size={16} /> {labels.reset}
        </button>
      </div>
    </Modal>
  );
}

function useSectionReveal(ref: React.RefObject<HTMLElement>) {
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

function LanguageSwitcher({
  language,
  labels,
  onLanguageChange
}: {
  language: Language;
  labels: LanguageSelectorCopy;
  onLanguageChange: (language: Language) => void;
}) {
  return (
    <div className="language-switcher" role="group" aria-label={labels.aria}>
      <span className="language-switcher__label">{labels.label}</span>
      <div className="language-switcher__options">
        {languageOptions.map((option) => {
          const languageLabel = option.code === "pt" ? labels.pt : labels.en;
          return (
            <button
              key={option.code}
              type="button"
              aria-pressed={language === option.code}
              aria-label={`${languageLabel} - ${option.short}`}
              title={`${languageLabel} - ${option.short}`}
              onClick={() => onLanguageChange(option.code)}
            >
              <span className="language-switcher__flag" aria-hidden="true">{option.flag}</span>
              <span className="language-switcher__copy">
                <strong>{option.short}</strong>
                <small>{languageLabel}</small>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Section({ id, className = "", children }: { id: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref);
  return <section ref={ref} id={id} className={`section ${className}`}>{children}</section>;
}

export function SectionIntro({ label, title, description }: { label: string; title: string; description?: string }) {
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

export function Navigation({
  language,
  navigationItems,
  labels,
  onLanguageChange
}: {
  language: Language;
  navigationItems: readonly NavigationItem[];
  labels: {
    brandRole: string;
    navLabel: string;
    resume: string;
    languageSelector: LanguageSelectorCopy;
    accessibility: AccessibilityCopy;
  };
  onLanguageChange: (language: Language) => void;
}) {
  const [active, setActive] = useState("inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(readSettings);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = settings.theme;
    root.dataset.contrast = settings.highContrast ? "high" : "normal";
    root.dataset.motion = settings.reduceMotion ? "reduce" : "full";
    root.dataset.links = settings.underlineLinks ? "underlined" : "default";
    root.style.setProperty("--font-scale", String(settings.fontScale));
    localStorage.setItem("portfolio-accessibility", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const ids = ["inicio", ...navigationItems.map(([id]) => id)];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: [0.01, 0.2] }
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [navigationItems]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeMenu);
    return () => window.removeEventListener("keydown", closeMenu);
  }, [menuOpen]);

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Leonardo Farias Martins — início">
          <img src="favicon.svg" alt="" width="42" height="42" />
          <span><strong>Leonardo Farias</strong><small>{labels.brandRole}</small></span>
        </a>

        <nav id="site-navigation" className={menuOpen ? "is-open" : ""} aria-label={labels.navLabel}>
          {navigationItems.map(([id, label]) => (
            <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a className="mobile-resume" href={links.resume} download>{labels.resume} <Download size={16} /></a>
        </nav>

        <div className="topbar-actions">
          <LanguageSwitcher language={language} labels={labels.languageSelector} onLanguageChange={onLanguageChange} />
          <button
            className="icon-button"
            type="button"
            onClick={() => setSettings((current) => ({ ...current, theme: current.theme === "dark" ? "light" : "dark" }))}
            aria-label={settings.theme === "dark" ? labels.accessibility.themeToggle.toLight : labels.accessibility.themeToggle.toDark}
          >
            {settings.theme === "dark" ? <Sun /> : <Moon />}
          </button>
          <button className="accessibility-button" type="button" aria-label={labels.accessibility.open} onClick={() => setAccessibilityOpen(true)}>
            <Accessibility /> <span>{labels.accessibility.titleKicker}</span>
          </button>
          <a className="topbar-resume" href={links.resume} download>{labels.resume} <Download size={15} /></a>
          <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="site-navigation" aria-label={menuOpen ? labels.accessibility.menu.close : labels.accessibility.menu.open} onClick={() => setMenuOpen((current) => !current)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {accessibilityOpen && (
        <AccessibilityMenu labels={labels.accessibility} settings={settings} setSettings={setSettings} onClose={() => setAccessibilityOpen(false)} />
      )}
    </>
  );
}




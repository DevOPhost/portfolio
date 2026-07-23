import { useEffect, useMemo, useState } from "react";
import { AmbientLight } from "./components/AmbientLight";
import { Navigation } from "./components/SiteChrome";
import { SiteFooter } from "./components/SiteFooter";
import { getCommercialContent, type PageMetaCopy } from "./content/commercial";
import { certificates, events, extensions, projects } from "./data";
import {
  content,
  localizeCertificates,
  localizeEvents,
  localizeExtensions,
  localizeProjects,
  readPreferredLanguage,
  type Language
} from "./i18n";
import { usePageRoute } from "./hooks/usePageRoute";
import type { PageId } from "./routes";
import { AboutPage } from "./pages/AboutPage";
import { CareerPage } from "./pages/CareerPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ServicesPage } from "./pages/ServicesPage";

const productionBase = "https://devophost.github.io/portfolio/";

const productionPaths: Record<PageId, string> = {
  inicio: "",
  servicos: "servicos/",
  projetos: "projetos/",
  sobre: "sobre/",
  carreira: "carreira/",
  contato: "contato/"
};

function pageMeta(page: PageId, commercial: ReturnType<typeof getCommercialContent>): PageMetaCopy {
  switch (page) {
    case "servicos": return commercial.services.meta;
    case "projetos": return commercial.projects.meta;
    case "sobre": return commercial.about.meta;
    case "carreira": return commercial.career.meta;
    case "contato": return commercial.contact.meta;
    default: return commercial.home.meta;
  }
}

function updateMeta(selector: string, value: string) {
  document.querySelector(selector)?.setAttribute("content", value);
}

function App() {
  const [language, setLanguage] = useState<Language>(readPreferredLanguage);
  const copy = content[language];
  const commercial = getCommercialContent(language);
  const route = usePageRoute({
    focusTarget: () => document.querySelector<HTMLElement>("#conteudo h1"),
    exitDuration: 220,
    enterDuration: 680
  });

  const localizedProjects = useMemo(() => localizeProjects(projects, language), [language]);
  const localizedCertificates = useMemo(() => localizeCertificates(certificates, language), [language]);
  const localizedEvents = useMemo(() => localizeEvents(events, language), [language]);
  const localizedExtensions = useMemo(() => localizeExtensions(extensions, language), [language]);

  useEffect(() => {
    const htmlLanguage = language === "pt" ? "pt-BR" : "en-US";
    const meta = pageMeta(route.activePage, commercial);
    const canonical = productionBase + productionPaths[route.activePage];

    document.documentElement.lang = htmlLanguage;
    document.title = meta.title;
    try {
      window.localStorage.setItem("portfolio-language", language);
    } catch {}
    updateMeta('meta[name="description"]', meta.description);
    updateMeta('meta[property="og:locale"]', language === "pt" ? "pt_BR" : "en_US");
    updateMeta('meta[property="og:title"]', meta.title);
    updateMeta('meta[property="og:description"]', meta.description);
    updateMeta('meta[property="og:url"]', canonical);
    updateMeta('meta[name="twitter:title"]', meta.title);
    updateMeta('meta[name="twitter:description"]', meta.description);
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute("href", canonical);
  }, [commercial, language, route.activePage]);

  const renderPage = () => {
    switch (route.renderedPage) {
      case "servicos":
        return <ServicesPage copy={commercial.services} />;
      case "projetos":
        return (
          <ProjectsPage
            copy={copy}
            commercialCopy={commercial.projects}
            projects={localizedProjects}
          />
        );
      case "sobre":
        return (
          <AboutPage
            copy={copy}
            commercialCopy={commercial.about}
            onNavigate={route.navigate}
          />
        );
      case "carreira":
        return (
          <CareerPage
            copy={copy}
            commercialCopy={commercial.career}
            certificates={localizedCertificates}
            events={localizedEvents}
            extensions={localizedExtensions}
          />
        );
      case "contato":
        return <ContactPage copy={commercial.contact} />;
      default:
        return (
          <HomePage
            copy={copy}
            commercialCopy={commercial.home}
            onNavigate={route.navigate}
          />
        );
    }
  };

  return (
    <>
      <AmbientLight scene={route.activePage} />
      <a className="skip-link" href="#conteudo">{copy.skipLink}</a>
      <Navigation
        language={language}
        activePage={route.activePage}
        navigationItems={commercial.global.navigation}
        labels={{
          brandRole: commercial.global.brandRole,
          navLabel: commercial.global.navigationLabel,
          projectCta: commercial.global.headerCta,
          languageSelector: copy.languageSelector,
          accessibility: copy.accessibility
        }}
        onLanguageChange={setLanguage}
        onNavigate={route.navigate}
      />

      <main
        id="conteudo"
        className={"site-main page-transition page-transition--" + route.phase}
        aria-busy={route.isTransitioning}
      >
        <span className="sr-only" aria-live="polite">
          {pageMeta(route.renderedPage, commercial).title}
        </span>
        <div className="page-stage" data-current-page={route.renderedPage}>
          {renderPage()}
        </div>
      </main>

      {route.renderedPage !== "inicio" && (
        <SiteFooter
          language={language}
          role={commercial.global.brandRole}
          navigationItems={commercial.global.navigation}
          onNavigate={route.navigate}
        />
      )}
    </>
  );
}

export default App;

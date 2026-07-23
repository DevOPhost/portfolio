import { useEffect, useRef } from "react";
import type { PageId } from "../routes";

const focusSelector = [
  ".project-card",
  ".service-preview-card",
  ".service-detail-card",
  ".contact-audience",
  ".profile-portrait",
  ".button"
].join(",");

export function AmbientLight({ scene }: { scene: PageId }) {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const position = {
      x: window.innerWidth * 0.72,
      y: window.innerHeight * 0.34,
      scroll: Math.min(window.scrollY * 0.025, 54)
    };
    const target = { ...position };
    let frame = 0;

    const writePosition = () => {
      field.style.setProperty("--ambient-x", `${position.x}px`);
      field.style.setProperty("--ambient-y", `${position.y}px`);
      field.style.setProperty("--ambient-scroll", `${position.scroll}px`);
    };

    const animate = () => {
      frame = 0;
      const factor = 0.09;
      position.x += (target.x - position.x) * factor;
      position.y += (target.y - position.y) * factor;
      position.scroll += (target.scroll - position.scroll) * factor;
      writePosition();

      const moving =
        Math.abs(target.x - position.x) > 0.15 ||
        Math.abs(target.y - position.y) > 0.15 ||
        Math.abs(target.scroll - position.scroll) > 0.15;

      field.classList.toggle("is-moving", moving);
      if (moving && !document.hidden) frame = window.requestAnimationFrame(animate);
    };

    const schedule = () => {
      if (!frame && !document.hidden) frame = window.requestAnimationFrame(animate);
    };

    const motionEnabled = () =>
      finePointer.matches &&
      !reducedMotion.matches &&
      document.documentElement.dataset.motion !== "reduce";

    const handlePointer = (event: PointerEvent) => {
      if (!motionEnabled()) return;
      target.x = event.clientX;
      target.y = event.clientY;
      schedule();
    };

    const handleScroll = () => {
      if (!motionEnabled()) return;
      target.scroll = Math.min(window.scrollY * 0.025, 54);
      schedule();
    };

    const setFocus = (element: Element | null) => {
      if (!element || !motionEnabled()) {
        field.dataset.focus = "false";
        return;
      }
      const bounds = element.getBoundingClientRect();
      field.style.setProperty("--ambient-focus-x", `${bounds.left + bounds.width / 2}px`);
      field.style.setProperty("--ambient-focus-y", `${bounds.top + bounds.height / 2}px`);
      field.dataset.focus = "true";
    };

    const handlePointerOver = (event: PointerEvent) => {
      const targetElement = (event.target as Element | null)?.closest(focusSelector) ?? null;
      setFocus(targetElement);
    };

    const handlePointerOut = (event: PointerEvent) => {
      const current = (event.target as Element | null)?.closest(focusSelector);
      const next = (event.relatedTarget as Element | null)?.closest?.(focusSelector);
      if (current !== next) setFocus(next ?? null);
    };

    const handleFocusIn = (event: FocusEvent) => {
      setFocus((event.target as Element | null)?.closest(focusSelector) ?? null);
    };

    const handleFocusOut = (event: FocusEvent) => {
      const next = (event.relatedTarget as Element | null)?.closest?.(focusSelector) ?? null;
      setFocus(next);
    };

    const handleVisibility = () => {
      if (document.hidden && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        field.classList.remove("is-moving");
      } else {
        schedule();
      }
    };

    const handleCapabilityChange = () => {
      if (!motionEnabled()) {
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        field.dataset.focus = "false";
        field.classList.remove("is-moving");
        target.x = window.innerWidth * 0.72;
        target.y = window.innerHeight * 0.34;
        target.scroll = 0;
        Object.assign(position, target);
        writePosition();
        return;
      }
      schedule();
    };

    writePosition();
    window.addEventListener("pointermove", handlePointer, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.addEventListener("pointerout", handlePointerOut, { passive: true });
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    document.addEventListener("visibilitychange", handleVisibility);
    finePointer.addEventListener("change", handleCapabilityChange);
    reducedMotion.addEventListener("change", handleCapabilityChange);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointer);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
      document.removeEventListener("visibilitychange", handleVisibility);
      finePointer.removeEventListener("change", handleCapabilityChange);
      reducedMotion.removeEventListener("change", handleCapabilityChange);
    };
  }, []);

  return (
    <div
      ref={fieldRef}
      className="ambient-light"
      data-scene={scene}
      data-focus="false"
      aria-hidden="true"
    >
      <span className="ambient-light__depth" />
      <span className="ambient-light__pointer" />
      <span className="ambient-light__focus" />
      <span className="ambient-light__vignette" />
    </div>
  );
}

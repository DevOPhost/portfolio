import { X } from "lucide-react";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef
} from "react";

export type ModalOrigin = {
  x: number;
  y: number;
};

export function Modal({
  label,
  onClose,
  children,
  size = "project",
  origin
}: {
  label: string;
  onClose: () => void;
  children: ReactNode;
  size?: "project" | "document" | "accessibility";
  origin?: ModalOrigin;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => !element.hasAttribute("hidden"));

      if (!focusable.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
      returnFocus?.focus();
    };
  }, [onClose]);

  const style = origin
    ? ({
        "--modal-origin-x": `${origin.x}px`,
        "--modal-origin-y": `${origin.y}px`
      } as CSSProperties)
    : undefined;

  return (
    <div className={`overlay overlay--${size}`} role="presentation" onMouseDown={onClose}>
      <div
        ref={panelRef}
        className="overlay__panel"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        style={style}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} className="overlay__close" type="button" onClick={onClose} aria-label="Fechar">
          <X />
        </button>
        {children}
      </div>
    </div>
  );
}

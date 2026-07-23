import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { pageHref, type PageId } from "../routes";

type PageLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick"> & {
  page: PageId;
  anchor?: string;
  onNavigate: (page: PageId, options?: { anchor?: string; focus?: boolean }) => void;
  children: ReactNode;
};

function shouldUseClientNavigation(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.button === 0 &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

export function PageLink({
  page,
  anchor,
  onNavigate,
  children,
  ...props
}: PageLinkProps) {
  return (
    <a
      {...props}
      href={pageHref(page, anchor)}
      onClick={(event) => {
        if (!shouldUseClientNavigation(event)) return;
        event.preventDefault();
        onNavigate(page, { anchor });
      }}
    >
      {children}
    </a>
  );
}

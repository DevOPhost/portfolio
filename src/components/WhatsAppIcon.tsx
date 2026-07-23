import type { SVGProps } from "react";
import { siWhatsapp } from "simple-icons";

type WhatsAppIconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  title?: string;
};

export function WhatsAppIcon({ title, ...props }: WhatsAppIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...props}
    >
      {title && <title>{title}</title>}
      <path fill="currentColor" d={siWhatsapp.path} />
    </svg>
  );
}

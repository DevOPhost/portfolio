import { Hand } from "lucide-react";

export function AccessibilityHandsIcon() {
  return (
    <span className="accessibility-hands-icon" aria-hidden="true">
      <Hand className="accessibility-hands-icon__left" />
      <Hand className="accessibility-hands-icon__right" />
    </span>
  );
}

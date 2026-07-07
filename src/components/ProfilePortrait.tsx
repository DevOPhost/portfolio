import { type MouseEvent } from "react";

type ProfilePortraitProps = {
  labels: {
    aria: string;
    alt: string;
    role: string;
    location: string;
    passTitle: string;
    passCode: string;
    name: string;
    scopeLabel: string;
    scope: string;
    reachLabel: string;
    reach: string;
    verification: string;
  };
};

export function ProfilePortrait({ labels }: ProfilePortraitProps) {
  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const rotateY = ((x - 50) / 50) * 5;
    const rotateX = -((y - 50) / 50) * 5;

    target.style.setProperty("--pass-x", `${x}%`);
    target.style.setProperty("--pass-y", `${y}%`);
    target.style.setProperty("--pass-rotate-x", `${rotateX}deg`);
    target.style.setProperty("--pass-rotate-y", `${rotateY}deg`);
  };

  const handleLeave = (event: MouseEvent<HTMLElement>) => {
    const target = event.currentTarget;
    target.style.setProperty("--pass-x", "50%");
    target.style.setProperty("--pass-y", "35%");
    target.style.setProperty("--pass-rotate-x", "0deg");
    target.style.setProperty("--pass-rotate-y", "0deg");
  };

  return (
    <aside className="identity-pass-wrap" aria-label={labels.aria}>
      <article className="identity-pass" onMouseMove={handleMove} onMouseLeave={handleLeave}>
        <div className="identity-pass__surface">
          <header className="identity-pass__header">
            <img src="favicon.svg" alt="" width="38" height="38" />
            <div>
              <span>{labels.passTitle}</span>
              <strong>{labels.passCode}</strong>
            </div>
          </header>

          <div className="identity-pass__photo">
            <img
              src="assets/profile/leonardo-farias.png"
              width="1024"
              height="1024"
              alt={labels.alt}
            />
          </div>

          <footer className="identity-pass__footer">
            <span className="identity-pass__verification">{labels.verification}</span>
            <h2>{labels.name}</h2>
            <p>{labels.role}</p>
            <dl className="identity-pass__meta">
              <div>
                <dt>{labels.scopeLabel}</dt>
                <dd>{labels.scope}</dd>
              </div>
              <div>
                <dt>{labels.reachLabel}</dt>
                <dd>{labels.reach}</dd>
              </div>
            </dl>
          </footer>
        </div>
      </article>
    </aside>
  );
}

type ProfilePortraitProps = {
  labels: {
    aria: string;
    alt: string;
    role: string;
    location: string;
    name: string;
    reach: string;
  };
  compact?: boolean;
};

export function ProfilePortrait({ labels, compact = false }: ProfilePortraitProps) {
  return (
    <aside
      className={`profile-portrait${compact ? " profile-portrait--compact" : ""}`}
      aria-label={labels.aria}
    >
      <figure className="profile-portrait__photo">
        <img
          src="assets/profile/leonardo-farias.png"
          width="1024"
          height="1024"
          alt={labels.alt}
          decoding="async"
        />
      </figure>

      <div className="profile-portrait__caption">
        <img src="favicon.svg" alt="" width="34" height="34" />
        <div>
          <strong>{labels.name}</strong>
          <span>{labels.role}</span>
          <small>{labels.location} · {labels.reach}</small>
        </div>
      </div>
    </aside>
  );
}

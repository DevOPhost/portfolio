type ProfilePortraitProps = {
  labels: {
    aria: string;
    alt: string;
    status: string;
    role: string;
    location: string;
  };
};

export function ProfilePortrait({ labels }: ProfilePortraitProps) {
  return (
    <aside className="portrait-wrap" aria-label={labels.aria}>
      <figure className="portrait">
        <div className="portrait__image">
          <img
            src="assets/profile/leonardo-farias.png"
            width="1024"
            height="1024"
            alt={labels.alt}
          />
        </div>
        <span className="portrait__status"><b aria-hidden="true" /> {labels.status}</span>
        <figcaption>
          <strong>{labels.role}</strong>
          <span>{labels.location}</span>
        </figcaption>
      </figure>
    </aside>
  );
}




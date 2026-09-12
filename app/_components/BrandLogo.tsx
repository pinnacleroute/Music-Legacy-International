import Image from 'next/image';

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className = '', priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/assets/mli-logo.png"
      alt="Music Legacy International"
      width={1000}
      height={246}
      className={`brand-logo ${className}`.trim()}
      priority={priority}
      unoptimized
    />
  );
}

type BrandLockupProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLockup({ className = '', priority = false }: BrandLockupProps) {
  return (
    <span className={`brand-lockup ${className}`.trim()}>
      <span className="brand-mark" aria-hidden="true">
        <BrandLogo className="brand-logo-mark" priority={priority} />
      </span>
      <span className="brand-wordmark">
        Music Legacy
        <small>INTERNATIONAL</small>
      </span>
    </span>
  );
}

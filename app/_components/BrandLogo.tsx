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

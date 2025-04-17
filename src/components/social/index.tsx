import { ReactNode } from "react";

interface SocialProps {
  url: string;
  children: ReactNode;
}

export function Social({ url, children }: SocialProps) {
  return (
    <a className='transition-transform hover:scale-110' target="blank" href={url} rel="noopener noreferrer">
      {children}
    </a>
  );
}

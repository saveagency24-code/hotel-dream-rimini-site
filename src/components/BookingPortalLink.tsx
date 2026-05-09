"use client";

import { BOOKING_PORTAL_URL } from "@/lib/site";
import { trackConversion } from "@/lib/analytics";

type Props = {
  className?: string;
  children: React.ReactNode;
  source: string;
  onNavigate?: () => void;
};

export default function BookingPortalLink({ className, children, source, onNavigate }: Props) {
  return (
    <a
      href={BOOKING_PORTAL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => {
        onNavigate?.();
        trackConversion("booking_portal_click", { source });
      }}
    >
      {children}
    </a>
  );
}

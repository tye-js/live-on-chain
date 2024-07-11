import React from "react";
import Link from "next/link";
import {
  PaginationLink,
  type PaginationLinkProps,
} from "@/components/ui/pagination";

interface ForwardedPaginationLinkProps extends PaginationLinkProps {
  href: string;
}

const ForwardedPaginationLink = React.forwardRef<
  HTMLAnchorElement,
  ForwardedPaginationLinkProps
>(({ href, ...props }, ref) => (
  <Link href={href} passHref legacyBehavior>
    <PaginationLink ref={ref} {...props} />
  </Link>
));

ForwardedPaginationLink.displayName = "ForwardedPaginationLink";

export default ForwardedPaginationLink;

import type {
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
} from 'react';
import React from 'react';
import { usePageContext } from 'vike-react/usePageContext';

interface LinkProps extends PropsWithChildren, ComponentPropsWithoutRef<'a'> {
  href: string;
  className?: string;
  render?: ElementType;
}

export function Link({
  render,
  href,
  className = 'cursor-pointer',
  children,
  ...props
}: LinkProps) {
  const { urlPathname } = usePageContext();
  const isActive =
    href === '/' ? urlPathname === href : urlPathname.startsWith(href);

  const Tag = render || 'a';
  if (isActive) className += ' is-active';

  return React.createElement(Tag, { href, className, ...props }, children);
}

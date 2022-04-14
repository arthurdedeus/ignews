import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}

export function ActiveLink({ children, activeClassName, ...props  }: ActiveLinkProps) {
  const { asPath } = useRouter()

  let className
  if (asPath === props.href) {
    className = activeClassName
  } else {
    className = ''
  }

  return(
    <Link {...props}>
      {cloneElement(children, {
        className,
      })}
    </Link>
  )
}

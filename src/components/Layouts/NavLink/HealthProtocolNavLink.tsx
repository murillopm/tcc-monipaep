import NextLink from 'next/link'
import { useRouter } from "next/router";
import { Link, LinkProps } from "@chakra-ui/react";

interface HealthProtocolNavLinkProps extends LinkProps {
  children: string;
  href: string;
}

export function HealthProtocolNavLink({ href, children, ...rest }: HealthProtocolNavLinkProps) {
  const { asPath } = useRouter()
  
  let isActive = false

  if(asPath === href) {
    isActive = true
  }
  
  return (
    <NextLink href={href} passHref>
      <Link 
        pb="1rem" 
        borderBottom={isActive ? '2px': '0'} 
        color={isActive ? 'black': 'gray.500'}
        fontWeight={isActive ? 'bold' : 'semibold'}
        _hover={{ textDecoration: "none", color: isActive ? 'black' : 'gray.700' }}
        {...rest}
      >
        {children}
      </Link>
    </NextLink>
  )
}
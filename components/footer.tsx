import React from 'react'
import { cn } from '@/utils/utils'


interface FooterTextProps extends React.ComponentPropsWithoutRef<'p'> {}

export function FooterText({ className, ...props }: FooterTextProps) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}

'use client'

import { IconOpenAI, IconUser } from '@/components/ui/icons'
import { spinner } from './ui/spinner'
import { MemoizedReactMarkdown } from '../utils/markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { StreamableValue, useStreamableValue } from 'ai/rsc'
import { useStreamableText } from '@/lib/hooks/use-streamable-text'

export function SystemMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-500">
      <div className="max-w-[600px] flex-initial p-2">{children}</div>
    </div>
  )
}

export function SpinnerMessage() {
  return (
    <div className="group relative flex items-start md:-ml-12">
      <div className="flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm">
        <IconOpenAI />
      </div>
      <div className="ml-4 h-[24px] flex flex-row items-center flex-1 space-y-2 overflow-hidden px-1">
        {spinner}
      </div>
    </div>
  )
}

type MessageProps = {
  children?: React.ReactNode
  content?: string | StreamableValue<string>
  className?: string
  icon: 'openai' | 'user'
  showAvatar?: boolean
  id?: string
}

export function Message({
  children,
  content,
  className,
  icon,
  showAvatar = true
}: MessageProps) {
  // Call useStreamableText unconditionally
  const text = useStreamableText(content || '')

  const avatarClasses = showAvatar
    ? 'flex size-[24px] shrink-0 select-none items-center justify-center rounded-md border bg-primary text-primary-foreground shadow-sm'
    : 'invisible'

  const IconComponent = icon === 'openai' ? IconOpenAI : IconUser

  return (
    <div className={`group relative flex items-start md:-ml-12 ${className || ''}`}>
      <div className={avatarClasses}>
        <IconComponent />
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        {content ? (
          <div className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0">
            <MemoizedReactMarkdown remarkPlugins={[remarkGfm, remarkMath]}>
              {text}
            </MemoizedReactMarkdown>
          </div>
        ) : (
          <div className="pl-2">{children}</div>
        )}
      </div>
    </div>
  )
}
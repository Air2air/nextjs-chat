import React from 'react'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { cn } from '@/lib/utils'
import { IconOpenAI, IconUser } from '@/components/ui/icons'

type ChatMessageRole = 'user' | 'assistant'

interface ChatMessageProps {
  message: {
    content: string
    role: ChatMessageRole
  }
  className?: string
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message: { content, role },
  className
}) => {
  const icon = role === 'user' ? <IconUser /> : <IconOpenAI />
  const backgroundColor = role === 'assistant' ? 'red-500' : 'background'

  return (
    <div
      className={cn('group relative mb-4 flex items-start md:-ml-12', {
        [`bg-${backgroundColor}`]: true
      })}
    >
      <div className="flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow">
        {icon}
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
        >
          {content}
        </MemoizedReactMarkdown>
      </div>
    </div>
  )
}

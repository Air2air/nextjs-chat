import React from 'react'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { CodeBlock } from '@/components/ui/codeblock'
import { cn } from '@/lib/utils'
import { IconOpenAI, IconUser } from '@/components/ui/icons'


type ChatMessageProps = {
  message: {
    content: string;
    role: 'user' | 'assistant'; // assuming only two roles
  };
  className?: string; // assuming additional props like className
  // add other props as needed
};

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div className={cn('group relative mb-4 flex items-start md:-ml-12', {
      'bg-red-500': message.role === 'assistant',
      'bg-background': message.role === 'user',
    })} {...props}>
      <div className="flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow">
        {message.role === 'user' ? <IconUser /> : <IconOpenAI />}
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
        >
          {message.content}
        </MemoizedReactMarkdown>
      </div>
    </div>
  )
}

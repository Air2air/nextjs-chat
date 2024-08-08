import React from 'react'
import { MessageType } from '@/lib/types'
import { IconUser } from '@/components/ui/icons'
import { MemoizedReactMarkdown } from '@/utils/markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

interface UserMessageProps {
  message: MessageType
}

export const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  console.log('Rendering UserMessage:', message)
  return (
    <div className="user-message group relative mb-4 flex items-start bg-blue-100 p-4 rounded">
      <div className="icon-container flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow">
        <IconUser />
      </div>
      <div className="message-content flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
        >
          {message.content || 'No content available'}
        </MemoizedReactMarkdown>
      </div>
    </div>
  )
}
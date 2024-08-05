import React from 'react'
import { Separator } from '@/components/ui/separator'
import { MessageType } from '@/lib/types'
import { UserMessage } from './UserMessage'
import { AssistantMessage } from './AssistantMessage'

interface ChatListProps {
  messages: MessageType[]
  isShared: boolean
}

export const ChatList: React.FC<ChatListProps> = ({ messages, isShared }) => {
  if (messages.length === 0) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => (
        <React.Fragment key={message.id}>
          {message.display !== undefined ? (
            <div>{message.display}</div>
          ) : (
            <>
              {message.role === 'user' && <UserMessage message={message} />}
              {message.role === 'assistant' && <AssistantMessage message={message} />}
            </>
          )}
          {index < messages.length - 1 && <Separator className="my-4" />}
        </React.Fragment>
      ))}
    </div>
  )
}
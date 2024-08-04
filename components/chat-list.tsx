import { Separator } from '@/components/ui/separator'
import { MessageType } from '@/lib/types'
import React from 'react'

interface ChatListProps {
  messages: MessageType[]
  isShared: boolean
}

export const ChatList: React.FC<ChatListProps> = ({ messages, isShared }) => {
  if (messages.length === 0) {
    return null
  }

  return (
    <div className="relative mx-auto max-w-2xl px-4 bg-red-500">
      {messages.map(({ id, display }, index) =>
        display !== undefined ? (
          <React.Fragment key={id}>
            {display}
            {index < messages.length - 1 && <Separator className="my-4" />}
          </React.Fragment>
        ) : null
      )}
    </div>
  )
}

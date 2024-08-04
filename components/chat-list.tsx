import { Separator } from '@/components/ui/separator'
import { UIState } from '@/lib/chat/actions'
import { Session } from '@/lib/types'
import React from 'react'

export interface ChatListProps {
  messages: UIState
  session?: Session
  isShared: boolean
}



export const ChatList = ({ messages, session, isShared }: ChatListProps) => {
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

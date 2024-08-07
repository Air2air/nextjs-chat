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

  console.log('Rendering ChatList with messages:', messages)

  return (
    <div className="chat-list relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => {
        console.log('Processing message:', message)

        if (!message.role) {
          return (
            <React.Fragment key={message.id}>
              {/* <div className="bg-red-500"> */}
                {message.role} {message.display}
              {/* </div> */}
              {index < messages.length - 1 && <Separator className="my-4" />}
            </React.Fragment>
          )
        } else {
          return (
            <React.Fragment key={message.id}>
              <div className="text-green-500">
                {message.role} {message.display}
              </div>
              {index < messages.length - 1 && <Separator className="my-4" />}
            </React.Fragment>
          )
        }
      })}
    </div>
  )
}

'use client'
import { cn } from '@/utils/utils'
import { ChatList } from '@/components/chat-list'
import { ChatInputPanel } from '@/components/chat-input-panel'
import { useEffect, useState } from 'react'
import { useUIState, useAIState } from 'ai/rsc'
import { MessageType, Session } from '@/lib/types'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { toast } from 'sonner'

interface ChatContainerProps {
  id: string;
  missingKeys: string[];
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ id, missingKeys }) => {
  const [input, setInput] = useState('')
  const [messages] = useUIState()
  const [aiState] = useAIState()
  const { messagesRef, visibilityRef, isAtBottom, scrollToBottom } = useScrollAnchor()

  useEffect(() => {
    if (messages.length === 1) {
      console.log(`Chat session started with id: ${id}`);
    }
  }, [id, messages])

  useEffect(() => {
    const messagesLength = aiState.messages?.length
    if (messagesLength === 2) {
      console.log('Messages length is 2, refreshing UI state.')
    }
  }, [aiState.messages])

  useEffect(() => {
    missingKeys.forEach(key => {
      toast.error(`Missing ${key} environment variable!`)
    })
  }, [missingKeys])

  // Log messages to verify their structure
  useEffect(() => {
    console.log('Messages from useUIState:', messages)
  }, [messages])

  return (
    <div className="group w-full overflow-auto pl-0">
      <div className={cn('pb-[200px] pt-4 md:pt-10', 'chat-container')} ref={messagesRef}>
        {messages.length && <ChatList messages={messages} isShared={false} />}
        <div className="w-full h-px" ref={visibilityRef} />
      </div>
      <ChatInputPanel
        id={id}
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>
  )
}
import * as React from 'react'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import { nanoid } from 'nanoid'
import { Message } from './message'
import exampleData from '@/config/questions.json'
import { FooterText } from './layout/footer'
import { PromptForm } from './prompt-form'
import { MessageType } from '@/lib/types'
import CardExample from './card-example'

export interface ChatInputPanelProps {
  id?: string
  title?: string
  input: string
  setInput: (value: string) => void
  isAtBottom: boolean
  scrollToBottom: () => void
}

interface Message {
  id: string
  display: React.ReactNode
}

const prepareExampleMessages = (data: any[]) =>
  data.map(example => ({
    ...example,
    message: `${example.heading} ${example.subheading}`
  }))

const exampleMessages = prepareExampleMessages(exampleData)

export function ChatInputPanel({
  id,
  title,
  input,
  setInput,
  isAtBottom,
  scrollToBottom
}: ChatInputPanelProps) {
  const [aiState] = useAIState()
  const [messages, setMessages] = useUIState()
  const { submitUserMessage } = useActions()

  const handleExampleClick = async (example: any) => {
    const newMessage: Message = {
      id: nanoid(),
      display: <Message icon={'openai'}>{example.message}</Message>
    }

    setMessages((currentMessages: MessageType[]) => [
      ...currentMessages,
      newMessage
    ])

    const responseMessage = await submitUserMessage(example.message)
    setMessages((currentMessages: MessageType[]) => [
      ...currentMessages,
      responseMessage
    ])
  }

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {exampleMessages.map(example => (
            <CardExample
              key={example.heading}
              example={example}
              onClick={() => handleExampleClick(example)}
            />
          ))}
        </div>
      </div>
      <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
        <PromptForm input={input} setInput={setInput} />
        <FooterText className="hidden sm:block" />
      </div>
    </div>
  )
}

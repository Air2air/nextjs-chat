import * as React from 'react'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { useAIState, useActions, useUIState } from 'ai/rsc'
import { nanoid } from 'nanoid'
import { UserMessage } from './message'
import exampleData from '@/config/questions.json'
import { FooterText } from './footer'
import { PromptForm } from './prompt-form'

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
      display: <UserMessage>{example.message}</UserMessage>
    }

    setMessages((currentMessages: Message[]) => [
      ...currentMessages,
      newMessage
    ])

    const responseMessage = await submitUserMessage(example.message)
    setMessages((currentMessages: Message[]) => [
      ...currentMessages,
      responseMessage
    ])
  }

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />

      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="mb-4 grid grid-cols-2 gap-2 px-4 sm:px-0">
          {exampleMessages.map(example => (
            <ExampleCard
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

interface ExampleCardProps {
  example: any
  onClick: () => void
}

const ExampleCard: React.FC<ExampleCardProps> = ({ example, onClick }) => (
  <div
    className="cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900"
    onClick={onClick}
  >
    <div className="text-sm font-semibold">{example.heading}</div>
    <div className="text-xs">{example.subheading}</div>
  </div>
)
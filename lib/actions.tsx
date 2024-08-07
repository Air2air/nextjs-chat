import 'server-only'

import {
  createAI,
  getMutableAIState,
  streamUI,
  createStreamableValue
} from 'ai/rsc'

import { nanoid } from '@/utils/utils'
import { Message, SpinnerMessage} from '@/components/message'
import { basePrompt, resume, aiConfigs, postProcess } from '@/config/aiConfig'
import { MessageType } from '@/lib/types'; // Ensure you import the Message type correctly


export const systemPrompt = `${basePrompt}\n\nAdditional context in Todd's resume:\n${resume}\n\nBefore returning your response you must follow this instruction:${postProcess}`

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

  // Add user message to the AI state with role 'user'
  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content
      }
    ]
  })

  let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
  let textNode: undefined | React.ReactNode

  const result = await streamUI({
    model: aiConfigs.model,
    initial: <SpinnerMessage />,
    system: systemPrompt,
    messages: [
      ...aiState.get().messages.map((message: any) => ({
        role: message.role,
        content: message.content,
        name: message.name
      }))
    ],
    temperature: aiConfigs.temperature,
    maxTokens: aiConfigs.maxTokens,
    topP: aiConfigs.topP,
    frequencyPenalty: aiConfigs.frequencyPenalty,
    presencePenalty: aiConfigs.presencePenalty,
    stopSequences: aiConfigs.stopSequences,
    text: ({ content, done, delta }) => {
      if (!textStream) {
        textStream = createStreamableValue('')
        textNode = <Message content={textStream.value} icon={'openai'} />
      }

      if (done) {
        textStream.done()
        aiState.done({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: nanoid(),
              role: 'assistant',
              content
            } as MessageType
          ]
        })
      } else {
        textStream.update(delta)
      }

      return textNode
    }
  })

  return {
    id: nanoid(),
    display: result.value
  }
}

export type AIState = {
  chatId: string
  messages: MessageType[]; 
}

export type UIState = {
  id: string
  display: React.ReactNode
}[]

export const AI = createAI<AIState, UIState>({
  actions: {
    submitUserMessage
  },
  initialUIState: [],

  onSetAIState: async ({ state }) => {
    'use server'

    const { messages } = state
    const newMessage: MessageType = {
      id: nanoid(),
      role: 'system',
      content: 'Your purchase has been confirmed. Thank you for your order!'
    }

    messages.push(newMessage)
  }
})

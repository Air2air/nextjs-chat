import 'server-only'

import {
  createAI,
  getMutableAIState,
  getAIState,
  streamUI,
  createStreamableValue
} from 'ai/rsc'

import { BotCard, BotMessage, Stock, Purchase } from '@/components/stocks'

import { z } from 'zod'

import { Events } from '@/components/stocks/events'

import { Stocks } from '@/components/stocks/stocks'

import { nanoid } from '@/lib/utils'
import { SpinnerMessage, UserMessage } from '@/components/stocks/message'
import { Chat, Message } from '@/lib/types'
import { basePrompt, resume, aiConfigs } from '@/config/aiConfig'

export const systemPrompt = `${basePrompt}\n\nAdditional context in Todd's resume:\n${resume}`

async function submitUserMessage(content: string) {
  'use server'

  const aiState = getMutableAIState<typeof AI>()

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
        textNode = <BotMessage content={textStream.value} />
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
            }
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
  messages: Message[]
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
  // initialAIState: { chatId: nanoid(), messages: [] },
  // onGetUIState: async () => {
  //   'use server'

  //   // Remove the auth dependency
  //   const aiState = getAIState() as Chat

  //   if (aiState) {
  //     // const uiState = getUIStateFromAIState(aiState)
  //     // return uiState
  //   }

  //   return
  // },

  onSetAIState: async ({ state }) => {
    'use server'

    // Remove the auth dependency
    const { chatId, messages } = state

    const createdAt = new Date()
    const userId = 'anonymous' // Replace with the desired user ID

    const newMessage: Message = {
      id: nanoid(),
      role: 'system',
      content: 'Your purchase has been confirmed. Thank you for your order!'
    }

    messages.push(newMessage)

    // Don't return anything
  }
})

// export const getUIStateFromAIState = (aiState: Chat) => {
//   return aiState.messages
//     .filter(message => message.role !== 'system')
//     .map((message, index) => ({
//       id: `${aiState.chatId}-${index}`,
//       display:
//         message.role === 'tool' ? (
//           message.content.map(tool => {
//             return tool.toolName === 'listStocks' ? (
//               <BotCard>
//                 {/* TODO: Infer types based on the tool result*/}
//                 {/* @ts-expect-error */}
//                 <Stocks props={tool.result} />
//               </BotCard>
//             ) : tool.toolName === 'showStockPrice' ? (
//               <BotCard>
//                 {/* @ts-expect-error */}
//                 <Stock props={tool.result} />
//               </BotCard>
//             ) : tool.toolName === 'showStockPurchase' ? (
//               <BotCard>
//                 {/* @ts-expect-error */}
//                 <Purchase props={tool.result} />
//               </BotCard>
//             ) : tool.toolName === 'getEvents' ? (
//               <BotCard>
//                 {/* @ts-expect-error */}
//                 <Events props={tool.result} />
//               </BotCard>
//             ) : null
//           })
//         ) : message.role === 'user' ? (
//           <UserMessage>{message.content as string}</UserMessage>
//         ) : message.role === 'assistant' &&
//           typeof message.content === 'string' ? (
//           <BotMessage content={message.content} />
//         ) : null
//     }))
// }
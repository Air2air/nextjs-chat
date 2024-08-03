import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { getChat, getMissingKeys } from '@/app/actions'
import { ChatContainer } from '@/components/chat-container'
import { AI } from '@/lib/chat/actions'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  // Remove the auth dependency
  const chat = await getChat(params.id, '')
  return {
    title: chat?.title?.toString().slice(0, 50) ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const chat = await getChat(params.id, '')

  if (!chat) {
    redirect('/')
  }

  return (
    <AI initialAIState={{ chatId: chat.id, messages: chat.messages }}>
      <Chat
        id={chat.id}
        initialMessages={chat.messages}
        missingKeys={await getMissingKeys()}
      />
    </AI>
  )
}

import { nanoid } from '@/utils/utils'
import { ChatContainer } from '@/components/chat-container'
import { AI } from '@/lib/actions'

export const metadata = {
  title: 'Todd Chatbot'
}

export default async function IndexPage() {
  const id = nanoid()

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <ChatContainer id={id} missingKeys={[]} />
    </AI>
  )
}
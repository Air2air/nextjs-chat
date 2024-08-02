import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'

export const metadata = {
  title: 'Todd Chatbot'
}

export default async function IndexPage() {
  const id = nanoid()

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} missingKeys={[]} />
    </AI>
  )
}



interface ChatContainerProps {
  children: React.ReactNode
}

export default async function ChatContainer({ children }: ChatContainerProps) {
  return (
    <div className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden">

      {children}
    </div>
  )
}

'use client'

import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { useActions, useUIState } from 'ai/rsc'

import { Message } from './message'
import { type AI } from '@/lib/actions'
import { Button } from '@/components/ui/button'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'











export function PromptForm({
  input,
  setInput
}: {
  input: string
  setInput: (value: string) => void
}) {
  const router = useRouter()
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState<typeof AI>()

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      ref={formRef}
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const value = input.trim()
        setInput('')
        if (!value) return

        setMessages(currentMessages => [
          ...currentMessages,
          {
            id: nanoid(),
            role: 'user',
            content: value
          }
        ])

        const responseMessage = await submitUserMessage(value)
        setMessages(currentMessages => [...currentMessages, responseMessage])
      }}
    >
      <div className="relative">
        <textarea
          ref={inputRef}
          onKeyDown={onKeyDown}
          value={input}
          onChange={e => setInput(e.target.value)}
          className="w-full h-24 p-4 border rounded-md"
        />
        <div className="absolute right-4 bottom-4 flex space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit">
                <IconArrowElbow />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Send</span>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </form>
  )
}
import { CoreMessage } from 'ai'

// lib/types.ts
export interface MessageType {
  id: string
  role: 'user' | 'system' | 'assistant'
  content: string
}

// Define the type for an AI message object
export type AIMessageObject = {
  id: string
  content: string
}

// Define the type for the AI state
export type AIState = {
  messages: MessageType[]
  aiMessageObjects: AIMessageObject[]
}

// Define the type for the UI state
export type UIState = {
  loading: boolean
  error?: string
}

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: MessageType[]
  sharePath?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export interface Session {
  user: {
    id: string
    email: string
  }
}

export interface AuthResult {
  type: string
  message: string
}

export interface User extends Record<string, any> {
  id: string
  email: string
  password: string
  salt: string
}

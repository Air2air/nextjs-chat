import React from 'react';
import { Separator } from '@/components/ui/separator';
import { MessageType } from '@/lib/types';

interface ChatListProps {
  messages: MessageType[];
}

export const ChatList: React.FC<ChatListProps> = ({ messages }) => {
  if (messages.length === 0) {
    return null;
  }

  console.log('Rendering ChatList with messages:', messages);

  return (
    <div className="chat-list relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => {
        const { id, role, content } = message;

        console.log('Processing message:', message);

        if (!role || (role !== 'user' && role !== 'assistant')) {
          return (
            <React.Fragment key={id}>
              <div className="bg-red-500 p-2 text-white">
                Role not specified or invalid: {content}
              </div>
              {index < messages.length - 1 && <Separator className="my-4" />}
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={id}>
              <div className={`p-2 text-${role === 'user' ? 'blue' : 'green'}-500`}>
                {role === 'assistant' ? (
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                ) : (
                  content
                )}
              </div>
              {index < messages.length - 1 && <Separator className="my-4" />}
            </React.Fragment>
          );
        }
      })}
    </div>
  );
};
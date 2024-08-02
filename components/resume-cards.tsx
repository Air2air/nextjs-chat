import React from 'react';

interface CardProps {
  content: string;
  onSelect?: () => void;
}

const CardWrapper: React.FC<React.PropsWithChildren<{ title: string }>> = ({ title, children }) => (
  <div className="border rounded-lg p-4 shadow-md">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

export const ParentCard: React.FC<CardProps> = ({ content, onSelect }) => (
  <CardWrapper title="Parent">
    <p>{content}</p>
    {onSelect && (
      <button onClick={onSelect} className="mt-2 text-blue-500 hover:underline">
        Select
      </button>
    )}
  </CardWrapper>
);

export const CurrentCard: React.FC<CardProps> = ({ content }) => (
  <CardWrapper title="Current">
    <p>{content}</p>
  </CardWrapper>
);

export const SiblingCard: React.FC<CardProps> = ({ content, onSelect }) => (
  <CardWrapper title="Sibling">
    <p>{content}</p>
    {onSelect && (
      <button onClick={onSelect} className="mt-2 text-blue-500 hover:underline">
        Select
      </button>
    )}
  </CardWrapper>
);

export const DrilldownCard: React.FC<CardProps> = ({ content, onSelect }) => (
  <CardWrapper title="Drilldown">
    <p>{content}</p>
    {onSelect && (
      <button onClick={onSelect} className="mt-2 text-blue-500 hover:underline">
        Select
      </button>
    )}
  </CardWrapper>
);

interface CardExampleProps {
    example: {
      heading: string
      subheading: string
    }
    onClick: () => void
  }
  
  const CardExample: React.FC<CardExampleProps> = ({
    example: { heading, subheading },
    onClick
  }) => (
    <div
      className="cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900"
      onClick={onClick}
    >
      <div className="text-sm font-semibold">{heading}</div>
      <div className="text-xs">{subheading}</div>
    </div>
  )
  
  export default CardExample
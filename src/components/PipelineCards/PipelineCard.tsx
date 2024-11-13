interface PipelineCardProps {
  title: string
  icon: string
  value: string
  onClick: () => void
}

export default function PipelineCard({ 
  title, 
  icon, 
  value,
  onClick 
}: PipelineCardProps) {
  return (
    <div 
      className="bg-white rounded-xl p-6 cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      <div className="text-2xl mb-2">{icon}</div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="text-3xl font-bold text-primary">
        {value}
      </div>
    </div>
  )
}

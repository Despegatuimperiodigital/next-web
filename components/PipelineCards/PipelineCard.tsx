// PipelineCard.tsx
interface PipelineCardProps {
  title: string
  icon: string
  value: string
  metrics: Record<string, string>
  onClick: () => void
}

export default function PipelineCard({ 
  title, 
  icon, 
  value,
  metrics,
  onClick 
}: PipelineCardProps) {
  return (
    <div 
      className="bg-white rounded-xl p-6 cursor-pointer transition-transform hover:scale-105"
      onClick={onClick}
    >
      {icon && <div className="text-2xl mb-2">{icon}</div>}
      {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}
      {value && (
        <div className="text-3xl font-bold text-primary mb-4">
          {value}
        </div>
      )}
      {metrics && (
        <div className="text-sm text-gray-600">
          {Object.entries(metrics).map(([key, value]) => (
            <div key={key}>
              {key}: {typeof value === 'object' ? JSON.stringify(value) : value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
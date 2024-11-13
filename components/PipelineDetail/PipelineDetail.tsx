// PipelineDetail.tsx
import { PipelineStage } from '../../types/pipeline'

interface PipelineDetailProps {
  stage: PipelineStage
  onClose: () => void
}
export default function PipelineDetail({ 
  stage,
  onClose 
}: PipelineDetailProps) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          {stage.icon && <span>{stage.icon}</span>}
          {stage.title && <span>{stage.title}</span>}
        </h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {stage.value && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Valor</div>
            <div className="text-2xl font-bold">{stage.value}</div>
          </div>
        )}
        {stage.metrics && Object.entries(stage.metrics).map(([key, value]) => (
          <div key={key} className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">{key}</div>
            <div className="text-xl font-bold">
              {typeof value === 'object' ? JSON.stringify(value) : value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
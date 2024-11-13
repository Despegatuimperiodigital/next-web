'use client'
import { usePipelineSelection } from '../../hooks/usePipelineSelection'
import { PipelineCard } from '../../components/PipelineCards'
import { PipelineDetail } from '../../components/PipelineDetail'
import { initialData } from '../../data/pipeline-simple'

export default function Pipeline() {
  const { selected, handleSelect } = usePipelineSelection()
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-secondary-foreground p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Pipeline CloudHub</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {Object.entries(initialData).map(([id, data]) => {
  console.log('Pipeline data:', data);
  return (
    <PipelineCard
      key={id}
      {...data}
      onClick={() => handleSelect(id)}
    />
  );
})}
      </div>
      
      {selected && (
        <PipelineDetail
          stage={initialData[selected]}
          onClose={() => handleSelect(null)}
        />
      )}
    </div>
  )
}

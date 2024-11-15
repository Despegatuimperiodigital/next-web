export interface PipelineStage {
  title: string
  icon: string
  value: string
  metrics: Record<string, string>
}

export interface PipelineCardProps extends PipelineStage {
  onClick: () => void
}

export interface PipelineDetailProps {
  stage: PipelineStage
  onClose: () => void
}

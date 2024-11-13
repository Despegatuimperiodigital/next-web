export interface PipelineStage {
  title?: string;
  icon?: string;
  value?: string;
  metrics?: Record<string, string | boolean | Record<string, string | boolean>>;
  [key: string]: any;
}


export interface PipelineDetailProps {
  stage: PipelineStage
  onClose: () => void
}


export interface PipelineCardProps extends PipelineStage {
  onClick: () => void
}

import { useState } from 'react'

export function usePipelineSelection() {
  const [selected, setSelected] = useState<string | null>(null)
  
  const handleSelect = (id: string) => {
    setSelected(id === selected ? null : id)
  }

  return { selected, handleSelect }
}

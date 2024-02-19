import React, { useState } from 'react'

import PageHeader from '../PageHeader/PageHeader'
import { Paper } from '@mui/material'
import { useDocumentParser } from '../../model/hooks/useDocumentParser'
import { type DocumentBlock, DocumentBlockType } from '../../model/types'
import { closestCenter, DndContext, type DragEndEvent, useDroppable } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { mockDocs } from '../../../../utils/mock/mockdata'

const PageView = () => {
  const [documents, setDocuments] = useState<DocumentBlock[]>(() => mockDocs)

  const { blocks, getBlockByType } = useDocumentParser({
    blocks: documents
  })

  const { isOver, setNodeRef } = useDroppable({
    id: 'droppableAShit'
  })

  const style = {
    opacity: isOver ? 1 : 0.5
  }

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e

    if (over !== null) {

    }

    if (active.id !== over.id) {
      setDocuments((blocks) => {
        const oldIndex = blocks.findIndex((block) => block.id === active.id)
        const newIndex = blocks.findIndex((block) => block.id === over.id)
        return arrayMove(blocks, oldIndex, newIndex)
      })
    }
  }

  return (
        <>
            <PageHeader text={'Page'}/>
            <Paper
                sx={{
                  width: 600,
                  height: 900,
                  p: 2,
                  bgcolor: 'whitesmoke'
                }}
            >
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
                        <div ref={setNodeRef} style={style}>
                            {blocks.map((item) => {
                              return getBlockByType(item)
                            })}
                        </div>
                    </SortableContext>
                </DndContext>
            </Paper>
        </>
  )
}

export default PageView

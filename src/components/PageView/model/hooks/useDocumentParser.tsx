import React, { ChangeEventHandler, useCallback, useMemo } from 'react'
import { type DocumentBlock, DocumentBlockType } from '../types'
import DocumentBlockBase from '../../ui/DocumentBlockComponents/ DocumentBlockBase/DocumentBlockBase'
import { Stack } from '@mui/material'

export const blockTypes: Record<DocumentBlockType, string> = {
  [DocumentBlockType.CHECKBOX]: 'checkbox',
  [DocumentBlockType.QUOTE]: 'quote',
  [DocumentBlockType.TEXT]: 'text',
  [DocumentBlockType.CODE]: 'code',
  [DocumentBlockType.IMAGE]: 'image'
}

const defaultStyle = {
  background: 'white',
  padding: 7,
  borderRadius: 7,
  color: 'none',
  height: 'auto',
  marginBottom: 7,
  display: 'flex',
  alignItems: 'center',
  border: 'none'
}

const codeStyle = {
  background: 'lightgrey',
  borderRadius: 7,
  padding: 14,
  color: 'none',
  height: 'auto',
  marginBottom: 7,
  display: 'flex',
  alignItems: 'center',
  width: ' 100%'
}

const contentEdit = 'true'

interface PageView {
  blocks: DocumentBlock[]
}

export const useDocumentParser = (page: PageView) => {
  const { blocks } = page

  const getBlockByType = useCallback(
    (block: DocumentBlock) => {
      const { type, id } = block

      const getChildren = (child: React.ReactNode) => {
        return (
                    <DocumentBlockBase id={block.id} editButtons={false}>
                        {child}
                    </DocumentBlockBase>
        )
      }

      switch (type) {
        case DocumentBlockType.CODE:
          return (
                        <DocumentBlockBase id={block.id}>
                            <code style={codeStyle} contentEditable={contentEdit}>
                                {block.code}
                            </code>
                            {block?.children && getChildren(getBlockByType(block.children))}
                        </DocumentBlockBase>
          )
        case DocumentBlockType.IMAGE:
          return (
                        <DocumentBlockBase id={block.id}>
                            {block?.title && <span>{block.title}</span>}
                            <div contentEditable={contentEdit} style={defaultStyle}>
                                {block.title}
                            </div>
                            {block?.children && getChildren(getBlockByType(block.children))}
                        </DocumentBlockBase>
          )

        case DocumentBlockType.CHECKBOX:
          return (
                        <DocumentBlockBase id={block.id}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <input type={'checkbox'}/>
                                <div contentEditable={contentEdit} style={defaultStyle}>
                                    {block.title}
                                </div>
                                {block?.children && getChildren(getBlockByType(block.children))}
                            </div>
                        </DocumentBlockBase>
          )
        case DocumentBlockType.TEXT:
          return (
                        <DocumentBlockBase id={block.id}>
                            <div contentEditable={contentEdit} style={defaultStyle}>
                                <div>
                                    <div>{block.title}</div>
                                    <div>
                                        {block.paragraphs.map((paragraph) => (
                                            <p>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {block?.children && getChildren(getBlockByType(block.children))}
                        </DocumentBlockBase>
          )
      }
    },
    [page]
  )

  return { getBlockByType, blocks }
}

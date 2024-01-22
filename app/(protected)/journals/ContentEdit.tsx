'use client'

import Doc from '@/app/types/entities/doc.model'

type ContentEditProps = {
  item: Doc | null
  editDisabled?: boolean
  onTitleChange: (title: string) => void
  onContentChange: (content: string) => void
  onTitleBlur: () => void
  onContentBlur: () => void
}

const ContentEdit = ({ item, editDisabled = false, onTitleChange, onContentChange, onTitleBlur, onContentBlur }: ContentEditProps) => {
  if (!item) return <p>No item selected.</p>

  return (
    <div className="flex w-full flex-col">
      <input
        type="text"
        placeholder="Aa..."
        disabled={editDisabled}
        value={item.title}
        onChange={(e) => onTitleChange(e.target.value)}
        onBlur={onTitleBlur}
      />
      <textarea
        className="h-full w-full resize-none outline-none"
        placeholder="Aa..."
        disabled={editDisabled}
        value={item.content}
        onChange={(e) => onContentChange(e.target.value)}
        onBlur={onContentBlur}
      />
    </div>
  )
}

export default ContentEdit

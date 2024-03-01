import { Button } from '@common'
import { useShareModal } from '@hooks'
import { createDoc } from '@utils'
import { format } from 'date-fns'
import { useMemo } from 'react'
import toast from 'react-hot-toast'

type SidebarProps = {
  journalId?: string
  title?: string
  editDisabled?: boolean
  onAddNewDoc?: (args: any) => void
  onItemSelect: (id: string) => void
  onTitleChange: (title: string) => void
  onTitleBlur: (title: string) => void
  items?: { title: string; [key: string]: any }[]
  selectedItemId: string
}

const Sidebar = ({
  journalId,
  title,
  editDisabled = false,
  onAddNewDoc,
  onItemSelect,
  onTitleChange,
  onTitleBlur,
  items = [],
  selectedItemId
}: SidebarProps) => {
  const { onOpen } = useShareModal()

  const sortedItems = useMemo(() => items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()), [items])

  const onCreateDoc = async (): Promise<void> => {
    const errorMessage: string = 'Something went wrong during journal creation.'

    if (!journalId) {
      toast.error(errorMessage)
      return
    }
    const res = await createDoc(journalId)

    if (!res.ok) {
      toast.error(errorMessage)
      return
    }

    if (res.data?.id) {
      toast.success('Journal created successfully')
      onAddNewDoc?.(res.data)
    } else {
      toast.error(errorMessage)
    }
  }

  return (
    <aside className="flex h-full w-1/3 flex-col gap-2 border-r border-slate-100 pr-4">
      <div className="flex gap-3 pl-2">
        <input
          className={`bg-transparent text-xl font-bold outline-none ${editDisabled ? 'w-full' : 'w-4/5'}`}
          type="text"
          placeholder="Aa.."
          value={title}
          disabled={editDisabled}
          onChange={(e) => onTitleChange(e.target.value)}
          onBlur={(e) => onTitleBlur(e.target.value)}
        />
        {!editDisabled && (
          <div className="flex w-1/5 items-center">
            <Button label="Share" onClick={onOpen} small />
          </div>
        )}
      </div>

      {!sortedItems.length ? (
        <p className="flex h-full w-full items-center justify-center">No items</p>
      ) : (
        <div className="flex cursor-default flex-col gap-1">
          {sortedItems.map(({ id, title, createdAt }, i) => (
            <button
              key={i}
              className="flex items-center justify-between gap-1 rounded-md p-2 hover:bg-slate-100 hover:bg-opacity-75"
              onClick={() => onItemSelect(id)}
            >
              <p className={`truncate ${selectedItemId === id ? 'font-semibold' : 'font-light'}`}>{title}</p>
              <span className="whitespace-nowrap text-slate-400">{format(createdAt, 'yyyy-MM-dd')}</span>
            </button>
          ))}

          {!editDisabled && onAddNewDoc && <button onClick={onCreateDoc}>Create new</button>}
        </div>
      )}
    </aside>
  )
}

export default Sidebar

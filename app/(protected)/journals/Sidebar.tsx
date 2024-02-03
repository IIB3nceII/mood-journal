import { useShareModal } from '@hooks'
import { Button } from '@common'
import { format } from 'date-fns'

type SidebarProps = {
  title?: string
  editDisabled?: boolean
  onTitleChange: (title: string) => void
  onTitleBlur: (title: string) => void
  items?: { title: string; [key: string]: any }[]
}

const Sidebar = ({ title, editDisabled = false, onTitleChange, onTitleBlur, items = [] }: SidebarProps) => {
  const { onOpen } = useShareModal()

  return (
    <aside className="flex h-full w-1/3 flex-col gap-2 border-r border-slate-100 pr-4">
      {title && (
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
      )}
      {!items.length ? (
        <p className="flex h-full w-full items-center justify-center">No items</p>
      ) : (
        <div className="flex cursor-default flex-col">
          {items.map(({ title, createdAt }, i) => (
            <div className="flex items-center justify-between gap-1 rounded-md p-2 hover:bg-slate-100 hover:bg-opacity-75" key={i}>
              <p className="truncate">{title}</p>
              <span className="whitespace-nowrap text-slate-400">{format(createdAt, 'yyyy-MM-dd')}</span>
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}

export default Sidebar

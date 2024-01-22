import { useShareModal } from '@hooks'
import { Button } from '@common'

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
            className={`bg-transparent outline-none ${editDisabled ? 'w-full' : 'w-4/5'}`}
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
        <div className="flex flex-col cursor-default">
          {items.map(({ title }, i) => (
            <p key={i} className="rounded-md p-2 hover:bg-slate-100 hover:bg-opacity-75">
              {title}
            </p>
          ))}
        </div>
      )}
    </aside>
  )
}

export default Sidebar

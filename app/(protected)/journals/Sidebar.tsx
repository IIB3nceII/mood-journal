type SidebarProps = {
  title?: string
  onTitleChange: (title: string) => void
  onTitleBlur: (title: string) => void
  items?: { title: string; [key: string]: any }[]
}

const Sidebar = ({ title, onTitleChange, onTitleBlur, items = [] }: SidebarProps) => {
  return (
    <aside className="flex h-full w-1/3 flex-col gap-2 bg-[#eaeaea] p-2">
      {title && (
        <input
          className="outline-none"
          type="text"
          placeholder="Aa.."
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          onBlur={(e) => onTitleBlur(e.target.value)}
        />
      )}
      {!items.length ? (
        <p className="flex h-full w-full items-center justify-center">No items</p>
      ) : (
        <div className="flex flex-col">
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

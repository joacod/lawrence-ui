import { useLocation } from 'preact-iso'

export function Header() {
  const { url } = useLocation()

  return (
    <div className="navbar bg-neutral text-neutral-content shadow-sm">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">
          Lawrence
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/" className={url === '/' && 'btn-active'}>
              Home
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

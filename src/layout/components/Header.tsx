import type { FunctionComponent } from "react"
import { Link } from "react-router-dom"

const Header: FunctionComponent = () => {
    return (
        <header className="header">
            <Link to='/' className="logo">
                PhotoGallery
            </Link>
            <nav className="links">
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/history'>History</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header

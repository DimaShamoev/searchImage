import type { FunctionComponent } from "react"
import Header from "./components/Header"
import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"

const Layout: FunctionComponent = () => {
    return (
        <div className="wrapper">
            <Header />
            <main className="main">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout

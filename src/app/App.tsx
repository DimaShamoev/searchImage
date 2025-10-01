import type { FunctionComponent } from "react"
import { RouterProvider } from "react-router-dom"
import { routes } from "../routes/route"

const App: FunctionComponent = () => {
    return (
        <div>
            <RouterProvider router={routes} />
        </div>
    )
}

export default App
import { Suspense, type FunctionComponent } from "react"

import { RouterProvider } from "react-router-dom"

import { routes } from "../routes/route"

import ScreenLoader from "../components/loader/ScreenLoader"

const App: FunctionComponent = () => {
    return (
        <Suspense fallback={<ScreenLoader />}>
            <RouterProvider router={routes} />
        </Suspense>
    )
}

export default App
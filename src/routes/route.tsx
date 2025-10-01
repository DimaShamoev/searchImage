import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";

const Home = lazy(() => import('../pages/home/Home'))
const History = lazy(() => import('../pages/history/History'))

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/history',
                element: <History />
            }
        ]
    }
]) 
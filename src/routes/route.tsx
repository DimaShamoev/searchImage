import { createBrowserRouter } from "react-router-dom";

import { lazy } from "react";

import Layout from "../layout/Layout";

const Home = lazy(() => import('../pages/home/Home'))
const History = lazy(() => import('../pages/history/History'))
const Images = lazy(() => import('../pages/images/Images'))

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
            },
            {
                path: '/images/:id',
                element: <Images />
            }
        ]
    }
]) 
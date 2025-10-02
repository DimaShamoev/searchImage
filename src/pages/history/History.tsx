import { useEffect, useState, type FunctionComponent } from "react"

import { useInfiniteScroll } from "../../hooks/useInfiniteScroll"

import { Link } from "react-router-dom"

import './history.css'

const History: FunctionComponent = () => {
    const [history, setHistory] = useState<string[]>([])
    const [page, setPage] = useState(1)
    const [allHistory, setAllHistory] = useState<string[]>([])

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("history") || "[]").reverse()
        setAllHistory(stored)
        setHistory(stored.slice(0, 20))
    }, [])

    const hasNextPage = page * 20 < allHistory.length

    useEffect(() => {
        if (page > 1) {
            setHistory(allHistory.slice(0, page * 20))
        }
    }, [page, allHistory])

    useInfiniteScroll({
        fetchNextPage: () => setPage(p => p + 1),
        hasNextPage,
        offset: 1,
    })

    return (
        <div className="history_body">
            <ul className="history_list">
                {history.map((item, i) => (
                    <li className="history_list-item" key={i}>
                        <Link to={`/images/${item}`}>
                            {`${i + 1}) ${item}`}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default History
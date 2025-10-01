import { useEffect } from "react"

interface IUseInfiniteScroll {
    fetchNextPage: () => void
    hasNextPage?: boolean
    offset?: number
}

export const useInfiniteScroll = ({ fetchNextPage, hasNextPage, offset=100 }: IUseInfiniteScroll) => {
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop + offset >= document.documentElement.scrollHeight && hasNextPage) {
                fetchNextPage()
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)

    }, [fetchNextPage, hasNextPage, offset])
}
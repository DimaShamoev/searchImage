import { useEffect, useState, type FunctionComponent } from "react"

import { useDebounce } from "../../hooks/useDebounce"
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll"

import { useInfiniteQuery } from "@tanstack/react-query"

import { getAllPhotos } from "../../api/api"

import type { IImage } from "../../types/image.type"

import ImageCard from "../../components/card/ImageCard"
import ImageModal from "../../components/modal/ImageModal"

import './home.css'

const Home: FunctionComponent = () => {

    const [search, setSearch] = useState<string>("")
    const debouncedSearch = useDebounce(search, 500)

    const [clickedImage, setClickedImage] = useState<IImage | null>(null)

    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['images', debouncedSearch],
        queryFn: ({ pageParam = 1 }) => getAllPhotos(debouncedSearch, pageParam, 20),
        initialPageParam: 1,
        getNextPageParam: (lastPage: IImage[], allPages: IImage[][]) => lastPage.length === 20 ? allPages.length + 1 : undefined,
    })

    useInfiniteScroll({ fetchNextPage, hasNextPage })

    const handleImageSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const saveSearchHistory = (query: string) => {
        if (!query.trim()) return
        const history = JSON.parse(localStorage.getItem("history") || "[]")
        localStorage.setItem("history", JSON.stringify([...history, query.trim()]))
    }

    useEffect(() => {
        saveSearchHistory(debouncedSearch)
    }, [debouncedSearch])

    return (
        <div className="home_wrapper">
            <div className="home_header">
                <input
                    className="search"
                    type="text"
                    placeholder="search"   
                    value={search}
                    onChange={handleImageSearch} 
                />
            </div>
            <div className="home_body">
                {data?.pages.flatMap(page => (
                    page.map((image, index) => (
                        <ImageCard
                            key={index}
                            image={image}
                            onClick={setClickedImage}
                        />
                    ))
                ))}
            </div>

            <ImageModal
                image={clickedImage}
                onClose={() => setClickedImage(null)}
            />
        </div>
    )
}

export default Home
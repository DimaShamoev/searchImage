import { useState, type FunctionComponent } from "react";

import { useParams } from "react-router-dom";

import { useInfiniteQuery } from "@tanstack/react-query";

import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

import { searchPhoto } from "../../api/api";

import type { IImage } from "../../types/image.type";

import ImageCard from "../../components/card/ImageCard";
import ImageModal from "../../components/modal/ImageModal";

import './images.css'

const Images: FunctionComponent = () => {

    const { id } = useParams();
    const [clickedImage, setClickedImage] = useState<IImage | null>(null);

    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ['search', id],
        queryFn: ({ pageParam = 1 }) => id ? searchPhoto(id, pageParam, 20) : Promise.resolve([]),
        getNextPageParam: (lastPage: IImage[], allPages: IImage[][]) => lastPage.length === 20 ? allPages.length + 1 : undefined,
        initialPageParam: 1,
        enabled: !!id,
    });

    useInfiniteScroll({ fetchNextPage, hasNextPage, offset: 200 });

    return (
        <div className="images_wrapper">
            <div className="images_body">
                {data?.pages.flatMap(page =>
                    page.map((image, index) => (
                        <ImageCard key={index} image={image} onClick={setClickedImage} />
                    ))
                )}
            </div>

            <ImageModal image={clickedImage} onClose={() => setClickedImage(null)} />
        </div>
    );
};

export default Images;
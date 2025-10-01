import { api } from "./axios"

import type { IImage } from "../types/image.type"

export const getPopularPhotos = async (page=1, perPage=20): Promise<IImage[]> => {
    const { data } = await api.get<IImage[]>('/photos/', {
        params: {
            page: page,
            per_page: perPage,
            order_by: 'popular',
        }
    })

    return data
}

export const getPhotoById = async (id: string): Promise<IImage> => {
    const { data } = await api.get<IImage>(`/photos/${id}`)

    return data
} 

export const searchPhoto = async (query: string, page=1, perPage=20): Promise<IImage[]> => {
    const { data } = await api.get<{ results: IImage[] }>('/search/photos/', {
        params: {
            query: query,
            page: page,
            per_page: perPage
        }
    })

    return data.results
} 

export const getAllPhotos = async (query: string, page=1, perPage=20): Promise<IImage[]> => {
    if (query && query.trim().length > 0) {
        return await searchPhoto(query, page, perPage)
    }

    return getPopularPhotos(page, perPage)
}
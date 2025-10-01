export interface IImage {
    id: string
    alt_description: string | null
    urls: {
        small: string
        regular: string
        full: string
    }
    likes: number
    views?: number
    downloads?: number
    user: {
        name: string
        username: string
    }
}
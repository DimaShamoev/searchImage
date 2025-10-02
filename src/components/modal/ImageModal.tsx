import type { FunctionComponent } from "react"

import type { IImage } from "../../types/image.type"

import { getPhotoById } from "../../api/api"

import { useQuery } from "@tanstack/react-query"

interface IImageModalProps {
    image: IImage | null
    onClose: () => void
}

const ImageModal: FunctionComponent<IImageModalProps> = ({ image, onClose }) => {

    const { data, isLoading } = useQuery({
        queryKey: ['photo', image?.id],
        queryFn: () => image && getPhotoById(image.id),
        enabled: !!image,
        staleTime: 1000 * 60 * 5,
    })

    return (
        <>
            {data && (
                <div className="image_modal">
                    <div className="image_modal-wrapper">
                        <div
                            className="modal_header"
                            onClick={onClose}
                        >
                            <p>&#10007;</p>
                        </div>
                        <div className="modal_body">
                            <img
                                src={image?.urls.small}
                                height={400}
                                alt={data.alt_description || 'image'}
                            />
                        </div>
                        <div className="modal_footer">
                            {isLoading ? (
                                <p>Loading...</p>
                            ) : (
                                <>
                                    <p>Likes: {data.likes}</p>
                                    <p>Downloads: {data.downloads}</p>
                                    <p>views: {data.views}</p>
                                    <p>Uploaded by: {data.user.username}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ImageModal
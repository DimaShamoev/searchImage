import type { FunctionComponent } from "react"
import type { IImage } from "../../types/image.type"

interface IIMageCardProps {
    image: IImage,
    onClick: (img: IImage) => void
}

const ImageCard: FunctionComponent<IIMageCardProps> = ({ image, onClick }) => {
    return (
        <div
            className="image_card"
            onClick={() => onClick(image)}
        >
            <img
                className="image"
                src={image.urls.small}
                alt={image?.alt_description || 'image'}
            />
        </div>
    )
}

export default ImageCard

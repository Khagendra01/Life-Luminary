import { useState } from "react";

import "./styles/carousel.css";

const Carousel = ({ images }: { images: string[] }) => {
    // Create a state to keep track of the current image
    const [currentImage, setCurrentImage] = useState(0);

    // Create a function to handle the next image
    const nextImage = () => {
        // If the current image is the last image, set the current image to 0
        if (currentImage === images.length - 1) {
            setCurrentImage(0);
        } else {
            // Otherwise, increment the current image by 1
            setCurrentImage(currentImage + 1);
        }
    }

    // Create a function to handle the previous image
    const previousImage = () => {
        // If the current image is the first image, set the current image to the last image
        if (currentImage === 0) {
            setCurrentImage(images.length - 1);
        } else {
            // Otherwise, decrement the current image by 1
            setCurrentImage(currentImage - 1);
        }
    }

    // Create a function to handle the image selection
    const selectImage = (index: number) => {
        // Set the current image to the selected image
        setCurrentImage(index);
    }

    return (
        <div className="flex flex-row justify-between items-center">
            <div className="w-1/2">
                <img className="w-1/4 h-auto ml-5" src={images[currentImage]} alt="carousel" />
            </div>
            <div className="w-1/2 flex flex-col items-center justify-center">
                <div className="flex flex-row items-center justify-center">
                    <button onClick={previousImage} className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-l">
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-row items-center justify-center">
                            {images.map((image, index) => {
                                return (
                                    <button key={index} onClick={() => selectImage(index)} className={`bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded ${index === currentImage ? 'bg-gray-300' : ''}`}>
                                        {index + 1}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    <button onClick={nextImage} className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-r">
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
                <div className="mt-4">
                    <h2 className="text-2xl font-bold">Title</h2>
                    <p className="text-gray-600">Subtitle</p>
                </div>
                <div className="mt-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Button 1
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
                        Button 2
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Carousel;
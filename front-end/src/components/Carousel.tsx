import { useEffect, useState } from "react";

import "./styles/carousel.css";
import { useNavigate } from "react-router-dom";

const Carousel = ({ images }: { images: string[] }) => {

    const navigate = useNavigate();
    // Create a state to keep track of the current image
    const [currentImage, setCurrentImage] = useState(0);

    const [carouselInsider, setInsider] = useState({ title: "", content:"", buttonF:"", buttonFRef:"", buttonS:"", buttonSRef:""});

    useEffect(() => {
        switch (currentImage) {
          case 0:
            setInsider({
              title: "One entry each day",
              content: "changes you and people around you!",
              buttonF: "Learn More",
              buttonFRef: "/about",
              buttonS: "Sign Up",
              buttonSRef: "/register"
            });
            break;
          case 1:
            setInsider({
              title: "Check the feed",
              content: "Read other people's amazing day",
              buttonF: "Feed",
              buttonFRef: "/feed",
              buttonS: "Activity",
              buttonSRef: "/activity"
            });
            break;
          case 2:
            setInsider({
              title: "Get story for your bed time",
              content: "AI generated story according to your daily entry",
              buttonF: "Story",
              buttonFRef: "/bedTime",
              buttonS: "About-Us",
              buttonSRef: "/about"
            });
            break;
        }
      }, [currentImage]);


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
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="col-span-1">
            <img className="w-full h-auto transition duration-500 ease-in-out transform" src={images[currentImage]} alt="carousel" />
        </div>
        <div className="col-span-1 flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center">
                <button onClick={previousImage} className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-l transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    <i className="fas fa-chevron-left"></i>
                </button>
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-row items-center justify-center">
                        {images.map((image, index) => {
                            return (
                                <button key={index} onClick={() => selectImage(index)} className={`bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 ${index === currentImage ? 'bg-gray-300' : ''}`}>
                                    {index + 1}
                                </button>
                            )
                        })}
                    </div>
                </div>
                <button onClick={nextImage} className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-r transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
            <div className="mt-4 text-center">
                <h2 className="text-2xl font-bold transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">{carouselInsider.title}</h2>
                <p className="text-gray-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">{carouselInsider.content}</p>
            </div>
            <div className="mt-4">
                <button onClick={() => navigate(carouselInsider.buttonFRef)} className="bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                    {carouselInsider.buttonF}
                </button>
                <button onClick={() => navigate(carouselInsider.buttonSRef)}  className="bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                {carouselInsider.buttonS}
                </button>
            </div>
        </div>
    </div>
    )
}

export default Carousel;
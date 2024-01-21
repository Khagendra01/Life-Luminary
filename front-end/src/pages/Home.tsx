import DailyNote from '../components/DailyNote';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';

// Import the images
import piktar1 from '../img/piktar1.png';
import piktar2 from '../img/piktar3.png';
import piktar3 from '../img/piktar2.jpg';


const Home = () => {
    // Create an array of the images
    const images = [piktar1, piktar2, piktar3];

    return (
        <>
        <Navbar />
        <Carousel images={images}/> 
        <DailyNote />
        <Footer />
        </>
    );
}

export default Home;
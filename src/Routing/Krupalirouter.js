import { Routes, Route } from 'react-router-dom';
import Feature from '../Container/Feature';
import AboutUs from '../Container/AboutUs';
import Pricing from '../Container/Pricing';
import Help from '../Container/Help';
import VideoTimeline from '../Container/VideoTimeline';
import Contect_us from '../Container/Contect_us';
import PrivacyPolicy from '../Container/PrivacyPolicy';
import TndC from '../Container/TndC';
import Payment from '../Container/Payment';
import Footer from '../Componant/Footer';
import SignIn from '../Componant/SignIn';
import Index from '../Container/Index';
import CustomNavbar from '../Componant/CustomNavbar';

function Krupalirouter(props) {
    return (
        <>
            <CustomNavbar />
            <Routes>
                {/* Define the routes here */}
                {/* <Route path="/" element={<><CustomNavbar /><Index /></>} /> */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/timeline" element={<VideoTimeline />} />
                <Route path="/" element={<Index />} />
                <Route path="/feature" element={<Feature />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/help" element={<Help />} />
                <Route path="/contact" element={<Contect_us />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TndC />} />
                <Route path="/pricing/payment" element={<Payment />} />
                <Route path="/footer" element={<Footer />} />
                {/* <Route path="/form" element={<ValForm />} /> */}
            </Routes>
            <Footer />
        </>
    );
}

export default Krupalirouter;

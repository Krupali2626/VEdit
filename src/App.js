
import './App.css';
import './CSS/Navbar.css'
import './CSS/Index.css'
import './CSS/Feature.css'
import './CSS/About.css'
import './CSS/Pricing.css'
import './CSS/Help.css'
import './CSS/carousel.css'
import './CSS/Accordian.css'
import './CSS/Footer.css'
import Index from './Container/Index';
import CustomNavbar from './Componant/CustomNavbar';
import SignIn from './Componant/SignIn';
import { Route, Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import ValForm from './ValForm';
import Footer from './Componant/Footer';
import Feature from './Container/Feature';
import AboutUs from './Container/AboutUs';
import Pricing from './Container/Pricing';
import Help from './Container/Help';
import Contect_us from './Container/Contect_us'

function App() {
  return (
    <>

      <CustomNavbar /> 
      <Provider store={store}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/" element={<Index />} />
          <Route path="/feature" element={<Feature />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<Contect_us />} />
          <Route path="/footer" element={<Footer />} />
          {/* <Route path="/form" element={<ValForm />} /> */}
        </Routes>
      </Provider>
      <Footer />
    </>
  );
}

export default App;

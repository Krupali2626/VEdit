// src/App.js
import './App.css';
import './CSS/Navbar.css';
import './CSS/Index.css';
import './CSS/Feature.css';
import './CSS/About.css';
import './CSS/Pricing.css';
import './CSS/Help.css';
import './CSS/Contact.css';
import './CSS/Payment.css';
import './CSS/carousel.css';
import './CSS/Accordian.css';
import './CSS/Footer.css';
import './CSS/d_navbar.css';
import { Provider } from 'react-redux';
import { store } from './Redux/Store';
import DenishaRoutes from './Editing/Denisha.routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import Krupalirouter from './Routing/Krupalirouter';
import TimelineEditor from './Editing/TimelineEditor';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  
  // Define the paths where you want to show the Krupalirouter
  const krupalirouterPaths = ['/signin', '/timeline', '/', '/feature', '/about', '/pricing', '/help', '/contact', '/privacy', '/terms', '/pricing/payment', '/footer'];

  return (
    <>
      <Provider store={store}>
        {krupalirouterPaths.includes(location.pathname) ? <Krupalirouter /> : <DenishaRoutes />}
      </Provider>
    </>
  );
}

export default App;
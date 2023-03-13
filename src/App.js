import './App.css';
import { Routes, Route } from 'react-router-dom';

// Font
import "@fontsource/montserrat/100.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/700.css";

// Pages
import Landing from './pages/Landing';
import Compare from './pages/Compare';
import Timeline from './pages/Timeline';
import Sidebar from './components/sidebar';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';

function App() {
  return (
    <Container>
      <Row>

        <Sidebar className='align-items-center' xs={2}/>

        <Routes>
          <Route path='/' element= { <Landing /> } />
          <Route path='/compare' element= { <Compare /> } />
          <Route path='/timeline' element= { <Timeline /> } />
        </Routes>

      </Row>
    </Container>
  );
}

export default App;

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Components
import PokemonDetails from '../components/pokemonDetails';
import LevelChart from '../components/levelChart';

function Timeline() {

  return (
    
    <Col xs={10}>
      <Row className='mb-25'>
      <Col xs={12} className='pt-12'>
          <div className='top-info-bar'>
            <h1 className="bold">Timeline</h1>
          </div>
        </Col>
      </Row>

      <Row className='mb-25'>
        <Col xs={12}>
          <div className="input-box">
            <input type="text" className="search-bar" placeholder="Type Pokemon name"/>                  
          </div>
        </Col>
      </Row>

      <Row className="mb-25">
        <Col xs={8} className='d-flex'>
          <PokemonDetails/>
        </Col>

        <Col xs={4} className='d-flex'>
          <div className='rounded-container bg-mid-grey'>
            <h3 className='bold mb-15 text-center'>Evolution</h3>
          </div>
        </Col>
      </Row>

      <Row className="mb-25">
        <Col xs={12} className='d-flex'>
          <LevelChart/>
        </Col>
      </Row>

      <Row className="mb-25">
        <Col xs={12} className='d-flex'>
          <LevelChart/>
        </Col>
      </Row>

    </Col>
    
  );
}

export default Timeline;
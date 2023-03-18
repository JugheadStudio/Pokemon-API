// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Components
import PokemonDetails from '../components/pokemonDetails';
import LevelChart from '../components/levelChart';
import SearchBar from '../components/searchBar';

function Timeline() {

  return (
    
    <Col xs={12} xl={10}>
      <Row>
      <Col xs={12} xl={12} className='pt-12'>
          <div className='top-info-bar xs={12} xs-text-center'>
            <h1 className="bold">Timeline</h1>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12}>
          <div className="input-box">
          <SearchBar/>                
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={8} className='d-flex'>
          <PokemonDetails/>
        </Col>

        <Col xs={12} xl={4} className='d-flex'>
          <div className='rounded-container bg-mid-grey'>
            <h3 className='bold mb-15 text-center'>Evolution</h3>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className='d-flex'>
          <LevelChart/>
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className='d-flex'>
          <LevelChart/>
        </Col>
      </Row>

    </Col>
    
  );
}

export default Timeline;
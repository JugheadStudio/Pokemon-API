// Components
import PokemonDetails from '../components/pokemonDetails';
import RadarStats from '../components/radarStats';
import HorizontalBarStats from '../components/horizontalBarStats';
import PieStats from '../components/pieStats';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Compare() {

  return (
    
    <Col xs={10}>
      {/* API info ===================== */}
      <Row className='mb-25'>
        <Col xs={12} className='pt-12'>
          <div className='top-info-bar'>
            <h1 className="mb-15 bold">Pokemon Comparison</h1>
            <p className="mb-10">Comparing Pokemon stats and abilities can be a valuable tool for trainers looking to build powerful teams. By using data and charts, we can gain a deeper understanding of the unique strengths and weaknesses of each Pokemon.</p>
            <p>One way to compare Pokemon stats is by using a radar chart, which displays a Pokemon's base stats in categories such as Attack, Defense, Speed, Special Attack, Special Defense, and HP. This chart allows us to quickly see how a Pokemon stacks up against others in different categories and can help trainers decide which Pokemon to add to their team based on their desired attributes.</p>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={6}>
          <div className="input-box mb-25">
            <input type="text" className="search-bar" placeholder="Type Pokemon name"/>                  
          </div>
        </Col>

        <Col xs={6}>
          <div className="input-box mb-25">
            <input type="text" className="search-bar" placeholder="Type Pokemon name"/>                  
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={6} className='mb-25'>
          <PokemonDetails/>
        </Col>

        <Col xs={6} className='mb-25'>
          <PokemonDetails/>
        </Col>
      </Row>

      <Row>
        <Col xs={6} className='mb-25 text-center'>
          <div className='rounded-container bg-mid-grey'>
            <h3 className='bold mb-15'>Stats Overview</h3>
            <div className='w-100 text-center mb-25'>
              <div className='w-50 m-auto'>
                <RadarStats/>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={6} className='mb-25 text-center'>
          <div className='rounded-container bg-mid-grey'>
            <h3 className='bold mb-15'>Stats Overview</h3>
            <div className='w-100 text-center mb-25'>
              <div className='w-50 m-auto'>
                <RadarStats/>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={6} className='mb-25 text-center'>
          <div className='rounded-container bg-dark-grey'>
            <h3 className='bold mb-15'>Pokemon Stats</h3>
            <div className='w-100 text-center mb-25'>
              <div className='w-75 m-auto'>
                <HorizontalBarStats/>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={6} className='mb-25 text-center'>
          <div className='rounded-container bg-dark-grey'>
            <h3 className='bold mb-15'>Pokemon Stats</h3>
            <div className='w-100 text-center mb-25'>
              <div className='w-75 m-auto'>
                <HorizontalBarStats/>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={6} className='pb-12 text-center'>
          <div className='rounded-container bg-dark-grey'>
            <h3 className='bold mb-15'>Stats Overview</h3>
            <div className='w-100 text-center mb-25'>
              <div className='w-75 m-auto'>
                <PieStats/>
              </div>
            </div>
          </div>
        </Col>

        <Col xs={6} className='pb-12 text-center'>
          <div className='rounded-container bg-dark-grey'>
            <h3 className='bold mb-15'>Stats Overview</h3>
            <div className='w-100 text-center mb-25'>
              <div className='w-75 m-auto'>
                <PieStats/>
              </div>
            </div>
          </div>
        </Col>
      </Row>

    </Col>


  );
}

export default Compare;
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function Compare() {

  return (
    
    <Col xs={10}>
      <Row>
      <Col xs={12} className='pt-12'>
          <div className='top-info-bar'>
            <h3 className="mb-15 bold">Pokemon Comparison</h3>
            <p className="mb-10">Comparing Pokemon stats and abilities can be a valuable tool for trainers looking to build powerful teams. By using data and charts, we can gain a deeper understanding of the unique strengths and weaknesses of each Pokemon.</p>
            <p>One way to compare Pokemon stats is by using a radar chart, which displays a Pokemon's base stats in categories such as Attack, Defense, Speed, Special Attack, Special Defense, and HP. This chart allows us to quickly see how a Pokemon stacks up against others in different categories and can help trainers decide which Pokemon to add to their team based on their desired attributes.</p>
          </div>
        </Col>
      </Row>

      <Row>
        
      </Row>

    </Col>


  );
}

export default Compare;
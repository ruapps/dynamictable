import { Container, Row, Col } from 'react-bootstrap';
import Formcomp from './Components/Formcomp';
import Phptesttable from './Components/Phptesttable';
import { Provider } from 'react-redux';
import store from './store/store'
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Container fluid="xxl" style={{background: "#343232"}} className='py-4'>
        <Row>
          <Col lg={4}>
            <Formcomp/>
          </Col>
          <Col lg={8}>
            <Phptesttable/>
          </Col>
        </Row>
      </Container>
    </Provider>
  );
}

export default App;

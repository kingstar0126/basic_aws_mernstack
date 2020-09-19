import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './Home.css';

const Steps = () => (
  <Container>
    <Row>
      <Col>
        <div>img1</div>
      </Col>
      <Col >
        <h4>Choose your meals</h4>
        <p>You can choose from our variety of dishes ranging from healthy to the latest trends</p>
      </Col>
    </Row>
    <Row>
      <Col>
        <h4>Unpack you box</h4>
        <p>We deliver the fresh ingredients of your meals in an insulated box to your door.</p>
      </Col>
      <Col>
      <div>img2</div>
      </Col>
    </Row>
    <Row>
      <Col>
        <div>img3</div>
      </Col>
      <Col>
        <h4>Cook and enjoy</h4>
        <p>We provide you with a set of steps in order for you to cook your meals the best way possible.</p>
      </Col>
    </Row>
  </Container>
);

const Home = ({ history }) => (
    <>
      <Container fluid className='homeHeader d-flex align-items-center'>
        <Row className='mx-auto'>
          <Col lg={12} className='font-weight-bolder black text-center h1'>Delicious recipes delivered at your door</Col>
          <Button size='lg' className='mx-auto align-center shadow'>Get Started</Button>
        </Row>
      </Container>
      <Steps />
    </>

);

export default Home;

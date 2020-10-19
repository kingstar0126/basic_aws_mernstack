import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import './Home.css';

/** Options grid contaianer */
const Options = ({ images, history }) => (
  <Container fluid className='options'>
    <h2 className='text-center mt-4'>You Have Options</h2>
    <p>We use professional culinary techniques to create our recipes, which allows us to come up with a variety of different meals</p>
    <Button onClick={() => history.push('./menu')}>Explore Our Menus</Button>
    <Row className='mt-5 mb-3'>
      <Col className='col-lg-4 col-md-4 mb-4'>
        <Image fluid src={images('./start1.jpg')} width='300' height='300' />
        <Image fluid src={images('./start2.jpg')} width='300' height='300' />
      </Col>
      <Col className='col-lg-4 col-md-4 mb-4'>
        <Image fluid src={images('./start3.jpg')} width='300' height='300' />
        <Image fluid src={images('./start4.jpg')} width='300' height='300' />
      </Col>
      <Col className='col-lg-4 col-md-4 mb-4'>
        <Image fluid src={images('./start5.jpg')} width='300' height='300' />
        <Image fluid src={images('./start6.jpg')} width='300' height='300' />
      </Col>
    </Row>
  </Container>
);

/** Final start now container */
const StartNow = ({ images, history }) => (
  <Container fluid className='startNow'>
    <Row>
      <Image src={images('./Cutlery.svg')} width='100' height='100' />
      <h2>Register Today</h2>
      <strong>Choose the plan that best suits you</strong>
      <p>You can change and cancel any time you want</p>
      <Button variant='secondary' onClick={() => history.push('/signin')}>Get Started</Button>
    </Row>
  </Container>
);

/** Steps to take section */
const Steps = ({ images, history }) => (
  <Container fluid className='steps'>
    <Row>
      <Col className='stepsBg' xs={12} md={6}>
      </Col>
      <Col xs={12} md={6} className='stepsSteps'>
        <h2 className='text-center'>Here is all you have to do</h2>
        <ul>
          <li>Join us by registering</li>
          <li>Choose a plan</li>
          <li>Choose your prefered meals</li>
          <li>Unpack your box</li>
          <li>Cook and enjoy</li>
        </ul>
        <Button onClick={() => history.push('/signin')}>Start Now</Button>
      </Col>
    </Row>
  </Container>
);

/** Why us container */
const WhyUs = ({ images, history }) => (
  <Container className='whyUs my-5'>
    <h2 className='text-center my-5'>Why Daily Recipe</h2>
    <Row>
      <Col className='whyUsItem' xs={12} md ={6} lg={3}>
        <Image src={images('./Product.svg')} width='60' height='60' />
        <p className='listTitle'>Fresh and unique</p>
        <p>We provide you with a unique variety of recipes using fresh ingredients</p>
      </Col>
      <Col className='whyUsItem' xs={12} md ={6} lg={3}>
        <Image src={images('./Salt.svg')} width='60' height='60' />
        <p className='listTitle'>No commitment from you</p>
        <p>If you feel like you need a change, you are able to change your plan any time</p>
      </Col>
      <Col className='whyUsItem' xs={12} md ={6} lg={3}>
        <Image src={images('./Breakfast.svg')} width='60' height='60' />
        <p className='listTitle'>#1 in food services</p>
        <p>We have been reviewed and rated #1 at making recipes and delivering them to people</p>
      </Col>
      <Col className='whyUsItem' xs={12} md ={6} lg={3}>
        <Image src={images('./Sausage.svg')} width='60' height='60' />
        <p className='listTitle'>Call yourself a home cook</p>
        <p>You will be able to learn and cook impressive top quality meals, you will feel proud!</p>
      </Col>
      <Button className='mx-auto' onClick={() => history.push('/singin')}>Join Us</Button>
    </Row>
  </Container>
);

/** Inside Box container */
const Box = ({ images, history }) => (
  <Container fluid className='boxContainer'>
    <Container fluid className='innerBox'>
      <h2 className='m-5'>What is inside a Daily Recipe box</h2>
      <Row>
        <Col className='boxItem' xs={12} md={6}>
          <Image src={images('./Bulb.svg')} width='60' height='60' />
          <p className='listTitle'>Professionaly created recipes</p>
          <p>Easy to follow steps with images, instructions and nutrition facts</p>
        </Col>
        <Col className='boxItem' xs={12} md={6}>
          <Image src={images('./Cheese.svg')} width='60' height='60' />
          <p className='listTitle'>Fresh and top quality ingredients</p>
          <p>What we take out of farms is sustainable, fresh and healthy</p>
        </Col>
        <Col className='boxItem' xs={12} md={6}>
          <Image src={images('./Recycle.svg')} width='60' height='60' />
          <p className='listTitle'>Exact portions and recyclable containers</p>
          <p>We provide you with the exact measurements so you don't have to</p>
        </Col>
        <Col className='boxItem' xs={12} md={6}>
          <Image src={images('./Love.svg')} width='60' height='60' />
          <p className='listTitle'>A memorable experience with cooking</p>
          <p>You will hands on experience how it is like to be a home cook, you will love it</p>
        </Col>
      </Row>
      <Row>
        <Button
          variant='secondary'
          className='mx-auto mb-3'
          onClick={() => history.push('/pricing')}>View our plans</Button>
      </Row>
    </Container>
  </Container>
);

/** Home page */
const Home = ({ history }) => {
  const images = require.context('../../assets', false, /.*\.(svg|jpg|png)$/);
  images.keys().forEach((key) => {
    images(key);
  });

  return (
    <div className='home'>
      <Container fluid className='homeHeader'>
        <h1>Welcome to Daily Recipe, where we deliver meals and you cook them</h1>
        <Button variant='secondary' size='lg' className='mx-auto' onClick={() => history.push('/signin')}>Get Started</Button>
      </Container>
      <WhyUs images={images} history={history} />
      <Box images={images} history={history}/>
      <Options images={images} history={history} />
      <Steps images={images} history={history}/>
      <StartNow images={images} history={history} />
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import CardDeck from 'react-bootstrap/CardDeck';
import Image from 'react-bootstrap/Image';

import RecipeCard from '../../Recipe/RecipeCard';
import Tea from '../../../assets/Tea.svg';
import carousel1 from '../../../assets/carousel_1.jpg';
import carousel2 from '../../../assets/carousel_2.jpg';
import carousel3 from '../../../assets/carousel_3.jpg';
import './thisWeek.css';

/** Displays a carousel and the user's selected recipes */
const ThisWeek = ({ history }) => {
  const [recipes, setRecipes] = useState({});
  const [error, setError] = useState('');
  const deliveryDate = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000));

  /** Calls API to get a user's selected recipes */
  useEffect(() => {
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('http://localhost:5000/api/users/recipes', request)
      .then((request) => {
        request.json().then((data) => {
          if (data.error) setError(data.error);
          else if (data.length) {
            setRecipes(data);
          }
        });
      })
      .catch((error) => setError(error.toString()));
  }, []);

  const InfoCarousel = () => (
    <Carousel className='infoCarousel'>
      <Carousel.Item>
        <img
          className='d-block w-100'
          src={carousel1}
          height='400'
          alt='First slide'
        />
        <Carousel.Caption>
          <div className='innerCaption'>
            <h3>Don't miss our latests blogs and news articles</h3>
            <p>Subscribe to our newletter and become part of our culinary community</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carousel2}
          height='400'
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>All you have to do is wait now</h3>
          <p>Your order will soon be processed, shipped and delivered right to your door</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={carousel3}
          height='400'
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>We love new ideas</h3>
          <p>Got any recipe ideas you would love to share? At Daily Recipe, we always have to come up with new recipes so share them with us!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );

  return (
    <Container className='my-4 thisWeek'>
      <h1 className='my-2'>This Week's Delivery</h1>
      <InfoCarousel />
      <Row className='my-5'>
        <Col>
          {!recipes.length && (
            <Col className='emptyWeek mx-auto'>
              <Image src={Tea} width='70' height='70' />
              <p>You currently have no recipes coming your way. Go ahead and click the button to select the recipes you want delivered for this week</p>
              <Button onClick={() => history.push('/user/upcoming')}>Choose Upcoming Recipes</Button>
            </Col>
          )}
          {error && <Col xs={12} className='invalid-feedback d-block' role='alert'>{error}</Col>}
          {recipes.length && (
            <>
              <div className='weekInfo'>
                <div className='d-flex flex-column'>
                  <span>Arriving</span>
                  <span>
                    {`${deliveryDate.getMonth() + 1}/${deliveryDate.getDate()}/${deliveryDate.getFullYear()}`}
                  </span>
                </div>
                <Button onClick={() => history.push('/user/upcoming')}>Manage deliveries</Button>
              </div>
              <CardDeck as={Row} className='justify-content-center'>
              {recipes.map((recipe) => (
                <RecipeCard recipe={recipe} history={history} />
              ))}
              </CardDeck>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ThisWeek;

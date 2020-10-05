import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';

import './thisWeek.css';
import carousel1 from '../../../assets/carousel_1.jpg';
import carousel2 from '../../../assets/carousel_2.jpg';
import carousel3 from '../../../assets/carousel_3.jpg';

const ThisWeek = ({ history }) => {
  const [recipes, setRecipes] = useState({});
  const [error, setError] = useState('');
  const deliveryDate = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000));

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

  return (
    <Container className='my-4'>
      <h1 className='my-2'>This week's delivery</h1>
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
      <Row className='my-5'>
        <Col>
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
          {error && <Col xs={12} className='invalid-feedback d-block' role='alert'>{error}</Col>}
          {recipes.length && recipes.map((recipe) => (
            <Col xs={12} md={8} lg={6} xl={4} className='cardWrapper p-lg-0' key={`col-${recipe.name}`}>
              <Card key={recipe.title} id={recipe._id}>
                <Image fluid src={`https://source.unsplash.com/random/358x300/?${recipe.title}`} />
                    <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                      <div className='d-flex justify-content-between'>
                        <span>{recipe.duration}</span>
                        <Button onClick={() => history.push(`/recipes/:${recipe._id}`)}>Details</Button>
                      </div>
                    </Card.Body>
              </Card>
            </Col>
          ))}
        </CardDeck>
        </Col>
      </Row>
    </Container>
  );
};

export default ThisWeek;

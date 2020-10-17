import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import './recipe.css';

/** Generates a random number between 0 - max (max not being inclusive) */
const randNum = (max) => Math.floor(Math.random() * Math.floor(max));

/** Displays a recipe as a card */
const RecipeCard = ({ history, recipe }) => (
  <Col xs={12} md={6} lg={6} xl={4} className='cardMenu p-lg-0' key={`col-${recipe.name}`}>
    <Card key={recipe.title} id={recipe._id}>
      <Image fluid src={`https://source.unsplash.com/collection/58658209/390x300/?sig=${randNum(40)}`} />
          <Card.Body>
            <Card.Title>{recipe.title}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <div className='d-flex justify-content-between'>
              <span>
                <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                {recipe.duration}
              </span>
              <Button variant='secondary' onClick={() => history.push(`/recipes/:${recipe._id}`)}>Details</Button>
            </div>
          </Card.Footer>
    </Card>
  </Col>
);

export default RecipeCard;

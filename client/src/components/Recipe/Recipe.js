import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import './recipe.css';

/** Individual recipe component */
const Recipe = ({ id, match, history }) => {
  const [recipe, setRecipe] = useState({});
  const [error, setError] = useState('');
  const recipeId = id || match.params.recipeId;

  /** API call to get recipe with the given recipeId */
  useEffect(() => {
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`${process.env.REACT_APP_HOST}/api/menu/${recipeId}`, request)
      .then((response) => {
        response.json().then((data) => {
          if (data.error) setError(data.error); // http error
          else setRecipe(data);
        });
      }).catch((err) => {
        console.log('An error happened', error);
        setError(err.toString());
      });
  }, [error, recipeId]);

  /** Generates a random number between 0 - max (max not being inclusive) */
  const randNum = (max) => Math.floor(Math.random() * Math.floor(max));

  return (
    <Container className='recipe'>
      {error && <Col xs={12} className='invalid-feedback d-block' role='alert'>{error}</Col>}
      <Row className='recipeDescription'>
        <Col xs={12} lg={6} className='d-flex align-items-center'>
          <Image fluid src={`https://source.unsplash.com/collection/58658209/540x496/?sig=${randNum(40)}`} />
        </Col>
        <Col xs={12} lg={6} className='recipeDetails my-4 my-lg-0 p-lg-5'>
          <h1>{recipe.title}</h1>
          <h4>At Daily Recipe</h4>
          <p>This recipe is a combination of simple and flavory, the fresh and high quality ingredients we provide along with this recipe make up for an unforgettable meal. In no time you will have cooked a complete meal that is both simple and tasy. Follow these simple instructions step by step to have the best results.</p>
          <div>
            <div>
              <svg xmlns='http://www.w3.org/2000/svg' height='25' width='25' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
              <span>{recipe.duration}</span>
            </div>
            <div>
              <span>
                <svg xmlns='http://www.w3.org/2000/svg' height='25' width='25' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' />
                </svg>
                <span className='recipeDiet'>{recipe.diet}</span>
              </span>
            </div>
            <div>
              <svg xmlns='http://www.w3.org/2000/svg' height='25' width='25' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' />
              </svg>
              <span>{recipe.servings} servings</span>
            </div>
            {match && <Button onClick={() => history.push('/signin')}>Get Started</Button>}
          </div>
        </Col>
      </Row>
      <Row className='ingredients py-4'>
        <Col xs={12}>
          <h2>Ingredients</h2>
        </Col>
        <Col className='ingredientItems'>
          <ul>
            {recipe.ingredients && recipe.ingredients.map((ing) => (
              <li>
                <input type='checkbox' id='ingredient' />
                <label for='ingredient'>{ing}</label>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
      <Row className='instructions py-4'>
        <Col xs={12}>
            <h2>Instructions</h2>
        </Col>
        <Col xs={12}>
            <ul>
              {recipe.instructions && recipe.instructions.map((step) => (
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" width='25' height='25' fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                   {step}
                </li>
              ))}
            </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Recipe;

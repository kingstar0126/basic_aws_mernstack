import React, { useEffect, useState } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import RecipeModal from '../../Recipe/RecipeModal';
import './upcoming.css';

/** Shows user available recipes to choose from in upcoming weeks */
const Upcoming = ({ history }) => {
  const [menu, setMenu] = useState([]);
  const [recipesNum, setRecipesNum] = useState(0);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);

  /** Calls API for the menu of the user's plan */
  useEffect(() => {
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('http://localhost:5000/api/users/planInstance', request)
      .then((request) => {
        request.json().then((data) => {
          if (data.error) setError(data.error);
          else {
            setMenu(data.plan.menu);
            setRecipesNum(data.recipesPerWeek);
          }
        });
      })
      .catch((error) => setError(error.toString()));
  }, []);

  /** Calls API to check if user already has recipes saved on their plan instance */
  useEffect(() => {
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('http://localhost:5000/api/users/recipes', request)
      .then((request) => {
        request.json().then((data) => {
          if (data.error) setError(data.error);
          else if (data.length) { // if user has already selected their recipes
            setSelected(data.map((val) => val._id));
            setIsSaved(true);
          }
        });
      })
      .catch((error) => setError(error.toString()));
  }, []);

  /** Button handler that calls API to save the selected recipes */
  const saveRecipes = () => {
    setError('');
    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedRecipes: selected }),
    };
    fetch('http://localhost:5000/api/users/recipes', request)
      .then((request) => {
        request.json().then((data) => {
          if (data.error) setError(data.error);
          else setIsSaved(true);
        });
      })
      .catch((error) => setError(error.toString()));
  };

  /** Add clicked recipe to array of selected recipes */
  const selectCard = (recipeId) => {
    setSelected([...selected, recipeId]);
  };

  /** Remove recipe from array of selected recipes */
  const unselectCard = (recipeId) => {
    setSelected(selected.filter((val) => val !== recipeId));
  };

  /** Dynamically displays details about the recipe selection process */
  const DisplayAmount = () => {
    const deliveryDate = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000));

    return (
      <>
        <div className='weekInfo'>
          <div className='d-flex flex-column'>
            <span>Arriving</span>
            <span>
              {`${deliveryDate.getMonth() + 1}/${deliveryDate.getDate()}/${deliveryDate.getFullYear()}`}
            </span>
          </div>
          {
            isSaved
              ? (<Button type='submit' onClick={() => setIsSaved(false)}>Change Recipes</Button>)
              : (<Button type='submit' onClick={() => saveRecipes(selected)}>Save</Button>)
          }
        </div>
        {!isSaved && (
          <div className='suggestion'>
            {selected.length === recipesNum
              ? <div>Good choices! Hit save when you are ready</div>
              : <div>Add or remove the recipes you want</div>
            }
            <div>Selected recipes: {selected.length}/{recipesNum}</div>
          </div>
        )}
      </>
    );
  };

  return (
    <Container className='my-5 userMenu p-lg-0'>
      <h1 className='m-2 mx-md-auto'>Select Upcoming Orders</h1>
      <DisplayAmount />
      <CardDeck as={Row} className='justify-content-center'>
        {error && <Col xs={12} className='invalid-feedback d-block' role='alert'>{error}</Col>}
        {menu.map((recipe) => (
          <Col xs={12} md={8} lg={6} xl={4} className='cardWrapper p-lg-0'>
            <Card key={recipe.title} id={recipe._id} className={selected.includes(recipe._id) && 'selected'}>
              <Image fluid src={`https://source.unsplash.com/random/358x300/?${recipe.title}`} />
              {selected.includes(recipe._id) ? (
                <>
                  <div className='d-flex justify-content-between selectedBtnDiv'>
                    <span className='checkmark'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='white' viewBox='0 0 24 24' stroke='green'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                    </span>
                    <Button onClick={() => unselectCard(recipe._id)} disabled={isSaved} className='unselectBtn'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='white' viewBox='0 0 24 24' stroke={isSaved ? 'gray' : 'red'}>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                    </Button>
                  </div>
                  <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                    <div className='d-flex justify-content-between'>
                      <span>
                        <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                        </svg>
                        {recipe.duration}
                      </span>
                      <Button onClick={() => setShowRecipe(true)}>Details</Button>
                      <RecipeModal
                        id={recipe._id}
                        show={showRecipe}
                        hide={() => setShowRecipe(false)} />
                    </div>
                  </Card.Body>
                </>
              ) : (
                <>
                  {
                    selected.length !== recipesNum && (
                      <Button key={recipe._id} onClick={(e) => selectCard(recipe._id)} className='selectBtn'>
                        <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='white' viewBox='0 0 24 24' stroke='green'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z' />
                        </svg>
                      </Button>
                    )
                  }
                  <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                    <div className='d-flex justify-content-between'>
                      <span>
                        <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                        </svg>
                        {recipe.duration}
                      </span>
                      <Button onClick={() => setShowRecipe(true)}>Details</Button>
                      <RecipeModal
                        id={recipe._id}
                        show={showRecipe}
                        hide={() => setShowRecipe(false)} />
                    </div>
                  </Card.Body>
                </>
              )}
            </Card>
          </Col>
        ))}
        </CardDeck>
    </Container>
  );
};

export default Upcoming;

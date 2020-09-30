import React, { useEffect, useState } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import './userMenu.css';

const UserMenu = () => {
  const [menu, setMenu] = useState([]);
  const [recipesNum, setRecipesNum] = useState(0);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

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

  useEffect(() => {
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('http://localhost:5000/api/users/recipes', request)
      .then((request) => {
        request.json().then((data) => {
          if (data.error) setError(data.error);
          else if (data) { // if user has already selected their recipes
            setSelected(data);
            setIsSaved(true);
          }
        });
      })
      .catch((error) => setError(error.toString()));
  }, []);

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
          else {
            // setSelected(data);
            setIsSaved(true);
          }
        });
      })
      .catch((error) => setError(error.toString()));
  };

  const selectCard = (recipeId) => {
    setSelected([...selected, recipeId]);
  };

  const unselectCard = (recipeId) => {
    setSelected(selected.filter((val) => val !== recipeId));
  };

  return (
    <Container className='my-5 userMenu'>
      <h1>Choose your recipes for this week</h1>
      <CardDeck as={Row} className='justify-content-center'>
        {error && <Col xs={12} className='invalid-feedback d-block' role='alert'>{error}</Col>}
        {menu.map((recipe) => (
          <Col xs={12} lg={6} xl={4} className='py-2'>
            <Card key={recipe.title} id={recipe._id} className={selected.includes(recipe._id) && 'active'}>
              {selected.includes(recipe._id) ? (
                <>
                  <Image fluid src={`https://source.unsplash.com/random/?${recipe.title}`} />
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                   <Button onClick={() => unselectCard(recipe._id)} disabled={isSaved}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                   </Button>
                  <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                    <div className='d-flex justify-content-between'>
                      <span>{recipe.duration}</span>
                      <span>Details</span>
                    </div>
                  </Card.Body>
                </>
              ) : (
                <>
                  <Image fluid src={`https://source.unsplash.com/random/?${recipe.title}`} />
                  {
                    selected.length !== recipesNum && (
                      <Button key={recipe._id} onClick={(e) => selectCard(recipe._id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                      </Button>
                    )
                  }
                  <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                    <div className='d-flex justify-content-between'>
                      <span>{recipe.duration}</span>
                      <span>Details</span>
                    </div>
                  </Card.Body>
                </>
              )}
            </Card>
          </Col>
        ))}
        </CardDeck>
        {
          isSaved
            ? (<Button type='submit' onClick={() => setIsSaved(false)}>Change</Button>)
            : (<Button type='submit' onClick={() => saveRecipes(selected)}>Save</Button>)
        }
    </Container>
  );
};

export default UserMenu;

import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const ChoosePlan = () => {
  const [plans, setPlans] = useState([]);
  const [price, setPrice] = useState();

  useEffect(() => {
    const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('http://localhost:5000/api/plans', request)
      .then((response) => {
        // http response error
        response.json().then((data) => {
          if (data.error) console.log(data.error);
          else {
            console.log('seting the plan', data);
            setPlans(data);
          }
        });
      })
      .catch((error) => {
        console.log('An error happened', error);
      }); // network error
  }, []);

  /*  useEffect(() => {
    let totalPrice = 0;

    for (let i = 0; i < amount; i += 1) {
      totalPrice += recipesPerWeek * servings;
    }
    return totalPrice;
  }, [amount]);
 */

  const selectPlan = (event) => {
    // on btn submition
    console.log(event.target.value);
  };

  return (
    <Container>
      <CardDeck>
        {plans.map((plan) => {
          return (
            <Card key={plan.name} id={plan.name}>
              <p>image here</p>
              <Card.Body>
                <Card.Title>{plan.name}</Card.Title>
                <Card.Text>{plan.description}</Card.Text>
                <ToggleButtonGroup name={plan.name}>
                  {plan.recipesPerWeek.map((num) => (
                    <ToggleButton
                      type='radio' key={num} value={num} name='radio'
                      onChange={(event) => (setPrice(plan.pricePerServing * plan.servings * event.currentTarget.value))}
                    >{num}</ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Card.Body>
              <Card.Footer>
                <div className='d-flex flex-row'>
                  <p>{plan.pricePerServing}</p>
                  <p>weekly total {price}</p>
                </div>
              </Card.Footer>
              <Button variant='primary' >Select</Button>
            </Card>
          );
        })}
      </CardDeck>
    </Container>
  );
};

export default ChoosePlan;

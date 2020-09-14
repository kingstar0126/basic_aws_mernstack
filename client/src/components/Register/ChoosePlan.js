import React, {useState} from 'react';

const ChoosePlan = () => {
  const [plans, setPlans] = useState();

  const request = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }; 
  const getPlans = () => {
    fetch('http://localhost:5000/api/plans', request)
      .then((response) => {
        // http response error
        response.json().then((data) => {
          if (data.error) console.log(data.error);
          else {
            console.log(data);
            setPlans(data);
          }
        })
      })
      .catch((error) => {
        console.log('An error happened', error);
      }) //network error 
  }

  return (
    <div>Choose your plan</div>
  );
};

export default ChoosePlan;

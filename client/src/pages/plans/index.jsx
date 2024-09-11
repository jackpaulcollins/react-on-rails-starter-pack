import { useState, useEffect, React } from 'react';
import Api from '../../api/Api';

function Plans() {
  const [plans, setPlans] = useState();

  useEffect(() => {
    Api.get('/plans')
      .then((response) => {
        setPlans(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      Plans
      <div>
        {/* eslint-disable */}
        {plans
          ? plans.map((plan) => (
              <div key={plan.id}>
                <h2>{plan.title}</h2>
                <p>{plan.description}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default Plans;

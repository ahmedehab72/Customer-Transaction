import  { useState } from 'react';
import Customer from './Customer/Customer';
import Transaction from './Transaction/Transaction';
 import TransactionAll from "./TransactionAll/TransactionAll";


const App = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState('');

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomerId(customerId);
  };

  return (
    <div>
      <Customer onSelectCustomer={handleSelectCustomer} />
      <Transaction selectedCustomerId={selectedCustomerId} />
      <TransactionAll />
    </div>
  );
};

export default App;

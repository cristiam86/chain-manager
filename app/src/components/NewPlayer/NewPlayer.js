import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './newPlayer.scss';

const NewPlayer = ({ contract, fromAddress }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [playerPrice, setPlayerPrice] = useState();

  useEffect(() => {
    getPlayerPrice();
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    setError('');

    if (!name || !lastName) {
      setError('Both fields are mandatory');
      return;
    }
    buyPlayer(name, lastName);
  };

  const buyPlayer = async (name, lastName) => {
    const playerPrice = await contract.methods.getPlayerPrice().call();
    const data = await contract.methods.buyPlayer(name, lastName).send({ from: fromAddress, value: playerPrice });
    if (data.status) {
      setName('');
      setLastName('');
      getPlayerPrice();
    }
  };

  const getPlayerPrice = async () => {
    const contractPlayerPrice = await contract.methods.getPlayerPrice().call();
    if (window.web3) {
      setPlayerPrice(window.web3.fromWei(contractPlayerPrice));
    }
  };

  return (
    <div className='new-player-form'>
      <form onSubmit={onSubmit}>
        <div className='form-field'>
          <TextField id='name' label='Name' value={name} onChange={e => setName(e.target.value)} fullWidth />
        </div>
        <div className='form-field'>
          <TextField id='lastname' label='Lastname' value={lastName} onChange={e => setLastName(e.target.value)} fullWidth />
        </div>
        <div className='form-field'>{error && <p className='form-error'>{error}</p>}</div>
        <Button type='submit' variant='contained' color='primary'>
          Buy player ({playerPrice} ETH)
        </Button>
      </form>
    </div>
  );
};

export default NewPlayer;

import React, { useState, useEffect } from 'react';
import { drizzleConnect } from 'drizzle-react';
import PlayerCard from './PlayerCard';

import './playerList.scss';

const PlayersList = ({ contract, ChainManager }) => {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    getPlayers();
  }, []);

  const getPlayers = async () => {
    try {
      const players = await contract.methods.getTeamPlayersIds().call();
      setPlayers(players);
    } catch (error) {
      console.log('TCL: PlayersList -> error', error);
    }
  };

  return (
    <div className='players-card-list'>
      {players.map(p => (
        <PlayerCard playerId={p} key={p} contract={contract} />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ChainManager: state.contracts.ChainManager
  };
};

export default drizzleConnect(PlayersList, mapStateToProps);

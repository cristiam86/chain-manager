import React, { useState, useEffect } from 'react';

import DNAHelper from '../../helpers/dnaHelper';

import PlayerPicture from './PlayerPicture';
import PlayerStat from './PlayerStat';
import './playerCard.scss';

const PlayerCard = ({ playerId, contract }) => {
  const [player, setPlayer] = useState(null);
  useEffect(() => {
    getPlayer();
  }, []);

  const getPlayer = async () => {
    try {
      const player = await contract.methods.getPlayer(playerId).call();
      console.log('TCL: getPlayer -> player', player);
      setPlayer(player);
    } catch (error) {
      console.log('TCL: PlayersList -> error', error);
    }
  };

  if (!player) return <div>Loading player info</div>;

  const athletics = DNAHelper.getAthleticsFeatures(player.dna);
  const technical = DNAHelper.getTechnicalFeatures(player.dna);
  const mental = DNAHelper.getMentalFeatures(player.dna);

  return player ? (
    <div className='player-card'>
      <div className='player-card-title'>
        {player.name} {player.lastName}
      </div>
      <div className='player-card-info'>
        <div className='player-card-picture'>
          <PlayerPicture dna={player.dna} />
        </div>
        <div className='player-card-info-stats'>
          <div className='player-card-stats-upper'>
            <div className='player-card-stats-upper-section'>
              <div className='player-card-stats-title'>Technical</div>
              <div className='player-stats-list vertical'>
                {technical &&
                  technical.length &&
                  technical.map(skill => <PlayerStat name={skill.name} level={skill.level} />)}
              </div>
            </div>
            <div className='player-card-stats-upper-section'>
              <div className='player-card-stats-title'>Athletics</div>
              <div className='player-stats-list vertical'>
                {athletics &&
                  athletics.length &&
                  athletics.map(skill => <PlayerStat name={skill.name} level={skill.level} />)}
              </div>
            </div>
          </div>
          <div className='player-card-stats-bottom'>
            <div className='player-card-stats-title'>Mental</div>
            <div className='player-stats-list horizontal'>
              {mental && mental.length && mental.map(skill => <PlayerStat name={skill.name} level={skill.level} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>loading</div>
  );
};

export default PlayerCard;

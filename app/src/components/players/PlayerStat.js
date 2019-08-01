import React from 'react';

import './playerStat.scss';

const PlayerStat = ({ name, level }) => (
  <div className='player-stat-item'>
    <div className='player-stat-item-title'>{name}</div>
    <div className='player-stat-item-bar-container'>
      <div className='player-stat-item-bar bg' />
      <div className='player-stat-item-bar level' style={{ width: `${level}%` }} />
    </div>
  </div>
);

export default PlayerStat;

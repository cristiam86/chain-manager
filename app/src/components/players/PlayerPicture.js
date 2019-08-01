import React from 'react';

import './playerPicture.scss';

const PlayerPicture = ({ dna }) => {
  return (
    <div className='player-picture team-1'>
      <div className='head'>
        <div className='eyes' />
      </div>
      <div className='body'>
        <div className='body-upper'>
          <div className='arm arm-left'>
            <div className='arm-shirt' />
          </div>
          <div className='shirt' />
          <div className='arm arm-right'>
            <div className='arm-shirt' />
          </div>
        </div>
        <div className='shorts' />
        <div className='body-legs'>
          <div className='leg' />
          <div className='leg' />
        </div>
      </div>
    </div>
  );
};

export default PlayerPicture;

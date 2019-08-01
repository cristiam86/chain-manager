import React from 'react';
import { drizzleConnect } from 'drizzle-react';
import { AccountData } from 'drizzle-react-components';

import './accountInfo.scss';

const AccountInfo = () => (
  <div className='account-info'>
    <AccountData
      accountIndex={0}
      units='ether'
      precision={3}
      render={({ address, balance, units }) => (
        <React.Fragment>
          <div className='account-info-address account-info-item'>
            <div className='account-info-item-title'>Your address</div>
            <div className='account-info-item-content'>{address}</div>
          </div>
          <div className='account-info-balance account-info-item'>
            <div className='account-info-item-title'>Balance</div>
            <div className='account-info-item-content'>
              {balance}
              {units}
            </div>
          </div>
        </React.Fragment>
      )}
    />
  </div>
);

const mapStateToProps = state => {
  return {
    accounts: state.accounts
  };
};

export default drizzleConnect(AccountInfo, mapStateToProps);

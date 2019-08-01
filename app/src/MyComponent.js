import React from 'react';
import PropTypes from 'prop-types';
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components';

import NewPlayer from './components/NewPlayer';
import AccountInfo from './components/AccountInfo';
import PlayersList from './components/players/PlayersList';

class MyComponent extends React.Component {
  constructor(props, context) {
    super(props);

    this.state = {
      playerPrice: 0
    };

    this.contracts = context.drizzle.contracts;
  }

  async componentDidMount() {
    // const playerPrice = await this.contracts.ChainManager.methods.buyPlayer().call();
  }

  withdraw = () => {
    this.contracts.ChainManager.methods.withdraw().send();
  };

  buyPlayer = async () => {
    const data = await this.contracts.ChainManager.methods.buyPlayer().call();
    console.log('TCL: MyComponent -> buyPlayer -> data', data);
  };

  getPlayers = async () => {
    const data = await this.contracts.ChainManager.methods.getTeamPlayersIds().call();
    console.log('TCL: MyComponent -> getPlayers -> data', data);
  };

  render() {
    const { accounts } = this.props;
    console.log('TCL: MyComponent -> render -> accounts', accounts);
    return (
      <React.Fragment>
        <div className='App'>
          <div>
            <h1>ChainManager</h1>
            <p>Buy unique crypto players, exchange them and make your own dream-team.</p>
          </div>
          <div>
            <NewPlayer contract={this.contracts.ChainManager} fromAddress={accounts[0]} />
            <div>
              You have: <ContractData contract='ChainManager' method='getTeamPlayersCount' /> players
            </div>
          </div>
          <div>
            <PlayersList contract={this.contracts.ChainManager} />
          </div>
        </div>
        <AccountInfo />

        {/* <div className="section">
          <h2>SimpleStorage</h2>
          <p>
            This shows a simple ContractData component with no arguments, along with
            a form to set its value.
          </p>
          <p>
            <strong>Stored Value: </strong>
            <ContractData contract="SimpleStorage" method="storedData" />
          </p>
          <ContractForm contract="SimpleStorage" method="set" />
        </div>
  
        <div className="section">
          <h2>TutorialToken</h2>
          <p>
            Here we have a form with custom, friendly labels. Also note the token
            symbol will not display a loading indicator. We've suppressed it with
            the <code>hideIndicator</code> prop because we know this variable is
            constant.
          </p>
          <p>
            <strong>Total Supply: </strong>
            <ContractData
              contract="TutorialToken"
              method="totalSupply"
              methodArgs={[{ from: accounts[0] }]}
            />{" "}
            <ContractData contract="TutorialToken" method="symbol" hideIndicator />
          </p>
          <p>
            <strong>My Balance: </strong>
            <ContractData
              contract="TutorialToken"
              method="balanceOf"
              methodArgs={[accounts[0]]}
            />
          </p>
          <h3>Send Tokens</h3>
          <ContractForm
            contract="TutorialToken"
            method="transfer"
            labels={["To Address", "Amount to Send"]}
          />
        </div>
        <div className="section">
          <h2>ComplexStorage</h2>
          <p>
            Finally this contract shows data types with additional considerations.
            Note in the code the strings below are converted from bytes to UTF-8
            strings and the device data struct is iterated as a list.
          </p>
          <p>
            <strong>String 1: </strong>
            <ContractData contract="ComplexStorage" method="string1" toUtf8 />
          </p>
          <p>
            <strong>String 2: </strong>
            <ContractData contract="ComplexStorage" method="string2" toUtf8 />
          </p>
          <strong>Single Device Data: </strong>
          <ContractData contract="ComplexStorage" method="singleDD" />
        </div> */}
      </React.Fragment>
    );
  }
}

MyComponent.contextTypes = {
  drizzle: PropTypes.object
};

export default MyComponent;

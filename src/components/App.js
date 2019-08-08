import React, { Component } from 'react';
import Web3 from 'web3';
import Marketplace from '../abis/Marketplace.json'
import './App.css';

import Navbar from './Navbar';
import Main from './Main';
import Loader from './Loader';

class App extends Component {

  state = {
    account: '',
    productCount: 0,
    products: [],
    marketplace: {},
    loading: true,
  }

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData()
  }

  // loadWeb3 = async () => { // from https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  //   // Modern dapp browsers...
  //   window.addEventListener('load', async () => {
  //     if (window.ethereum) {
  //       window.web3 = new Web3(window.thereum);
  //       try {
  //         // Request account access if needed
  //         await ethereum.enable();
  //         // Accounts no exposed
  //         web.eth.sendTransaction({  });
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     } else if (window.web3) { // Legacy dapp browsers...
  //       window.web3 = new Web3(web3.currentProvider);
  //       // Accounts always exposed
  //       web3.eth.sendTransaction({  });
  //     } else { // Non-dapp browsers...
  //       alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
  //     }
  //   })
  // }

  loadWeb3 = async () => { // from Dapp University Tutorial
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0]})
    const { abi, networks } = Marketplace;
    const networkId = await web3.eth.net.getId();
    const networkData = networks[networkId];
    if (networkData) {
      const address =networkData.address;
      const marketplace = web3.eth.Contract(abi, address);
      const productCount = await marketplace.methods.productCount().call()
      console.log(productCount.toString())
      this.setState({ marketplace, loading: false })
    } else {
      window.alert('Marketplace contract not deployed to detected network!')
    }
  }

  createProduct = (name, price) => {
    this.setState({ loading: true });
    const { marketplace, account } = this.state;
    marketplace.methods
      .createProduct(name, price)
      .send({ from: account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }

  render() {
    const { account, loading } = this.state;
    return (
      <div>
        <Navbar account={ account } />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { loading
                ? <Loader />
                : <Main createProduct={this.createProduct} />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

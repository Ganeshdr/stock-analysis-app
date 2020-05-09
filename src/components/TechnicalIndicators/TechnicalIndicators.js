import React, { Component } from 'react';
import axios from 'axios';

import './TechnicalIndicators.css';
import Loader from '../Loader/Loader';
const bullish = require('technicalindicators').bullish;
const bearishengulfingpattern = require('technicalindicators').bearishengulfingpattern;
const bullishengulfingpattern = require('technicalindicators').bullishengulfingpattern;
const doji =require('technicalindicators').doji;
const bullishharami =require('technicalindicators').bullishharami;
const bearishharami =require('technicalindicators').bearishharami;
const eveningstar =require('technicalindicators').eveningstar;
const morningstar =require('technicalindicators').morningstar;
const threewhitesoldiers =require('technicalindicators').threewhitesoldiers;
const threeblackcrows =require('technicalindicators').threeblackcrows;
const shootingstar = require('technicalindicators').shootingstar;

class TechnicalIndicators extends Component {
  constructor(props) {
    super(props);

    this.state = {
      technicalPatterns: {},
      displayRetryOption: false,
      loadingStockDetails: false
    };
    this.fetchTradingDataForStock = this.fetchTradingDataForStock.bind(this);
  }

  componentDidMount() {
    this.fetchTradingDataForStock(this.props.stock.code, 'daily');
  }

  fetchTradingDataForStock(stockCode, interval) {
    console.log('fetchTradingDataForStock', stockCode, interval);
    let term = `${stockCode}.NSE`;
    const keys = ['F41ON15LGCFM4PR7', 'SYTCQBUIU44BX2G4', '50M3AP1K3Y', 'RNZPXZ6Q9FEFMEHM', 'VZLZ58FTEXZW7QZ6'];
    const key = keys[Math.floor(Math.random() * keys.length)];
    let url;
    switch (interval) {
      case 'daily':
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&&symbol=${term}&outputsize=compact&apikey=${key}`;
        break;
      case 'intraday_5':
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&&symbol=${term}&interval=5min&outputsize=compact&apikey=${key}`;
        break;
      case 'intraday_15':
        url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&&symbol=${term}&interval=15min&outputsize=compact&apikey=${key}`;
        break;
      default:
        break;
    }

    this.setState({
      loadingStockDetails: true
    });
    axios.get(url)
    .then(res => {
      const key = res.data['Meta Data'] ? Object.keys(res.data)[1].startsWith('Time Series') ? Object.keys(res.data)[1] : null : null;
      if (key) {
        const allValues = [...Object.values(res.data[key])],
          openValues = allValues.map(val => parseFloat(val['1. open'])).slice(0, 2).reverse(),
          highValues = allValues.map(val => parseFloat(val['2. high'])).slice(0, 2).reverse(),
          lowValues = allValues.map(val => parseFloat(val['3. low'])).slice(0, 2).reverse(),
          closeValues = allValues.map(val => parseFloat(val['4. close'])).slice(0, 2).reverse();
          // volumes = allValues.map(val => parseFloat(val['5. volume'])).slice(0, 2).reverse();
        const inputValues1 = {
          open: openValues,
          high: highValues,
          low: lowValues,
          close: closeValues
        },
          inputValuesWith3dayInput = {
            open: allValues.map(val => parseFloat(val['1. open'])).slice(0, 3).reverse(),
            high: allValues.map(val => parseFloat(val['2. high'])).slice(0, 3).reverse(),
            low: allValues.map(val => parseFloat(val['3. low'])).slice(0, 3).reverse(),
            close: allValues.map(val => parseFloat(val['4. close'])).slice(0, 3).reverse()
          };
                      
        console.log('inputValues', inputValues1, inputValuesWith3dayInput, bearishengulfingpattern(inputValues1), bullishengulfingpattern(inputValues1));
        this.setState({
          technicalPatterns: {
            "Is Bearish engulfing pattern formed": bearishengulfingpattern(inputValues1),
            "Is Bullish engulfing pattern formed": bullishengulfingpattern(inputValues1),
            "Is Doji formed": doji({
              open: openValues[openValues.length - 1],
              high: highValues[highValues.length - 1],
              low: lowValues[lowValues.length - 1],
              close: closeValues[closeValues.length - 1]
            }),
            "Is Bearish harami pattern formed": bearishharami(inputValues1),
            "Is Bullish harami pattern formed": bullishharami(inputValues1),
            "Is Evening Star formed": eveningstar(inputValuesWith3dayInput),
            "Is Morning Star formed": morningstar(inputValuesWith3dayInput),
            "Is Three Black Crows pattern formed": threeblackcrows(inputValuesWith3dayInput),
            "Is Three White Soldiers pattern formed": threewhitesoldiers(inputValuesWith3dayInput),
            "Is Shooting Star pattern formed": shootingstar(inputValuesWith3dayInput),
            Overall: bullish(inputValues1)
          },
          displayRetryOption: false
        });
        console.log('this.state.technicalPatterns', this.state.technicalPatterns);
      } else {
        this.setState({
          displayRetryOption: true
        });
      }
    })
    .catch(error => {
      console.log(error);
      this.setState({
        displayRetryOption: true
      })
    })
    .finally(() => {
      this.setState({
        loadingStockDetails: false
      })
    })
  }

  changeInterval(event) {
    this.fetchTradingDataForStock(this.props.stock.code, event.target.value);
  }

  render() {
    return (
      <div>
        <div className="select-dropdown">
          <select id="interval" onChange={this.changeInterval.bind(this)} defaultValue="daily">
            <option value="daily">Daily</option>
            <option value="intraday_5">Intraday(5 min)</option>
            <option value="intraday_15">Intraday(15 min)</option>
          </select>
          <p></p>
          <p>{this.state.value}</p>
        </div>
        {
          this.state.displayRetryOption && !this.state.loadingStockDetails ? <div><div style={{color: 'red'}}>Couldn't retrieve latest data. Refresh the page again after 1 minute</div><div><button className="button" onClick={() => this.fetchTradingDataForStock(this.props.stock.code, 'daily')}>Refresh</button></div></div> : null
        }
        { 
          this.state.loadingStockDetails ? <Loader sizeStyle={{height: '30px', width: '30px', marginLeft: '40%', marginTop: '20px'}}/> :
          <div>
            {
              this.state.technicalPatterns && Object.keys(this.state.technicalPatterns).length ? Object.keys(this.state.technicalPatterns).map((key, index) => {
                return (
                  <div key={index}>{key} : {this.state.technicalPatterns[key] ? 'Yes': 'No'}</div>
                );
              }) : null
            }
          </div>
        }
      </div>
    );
  }
}

export default TechnicalIndicators;
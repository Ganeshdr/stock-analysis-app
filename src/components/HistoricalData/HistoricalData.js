import React, { Component } from 'react';
import axios from 'axios';
import Chart from 'chart.js';

import './HistoricalData.css';
import Loader from '../Loader/Loader';

class HistoricalData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rsiValuesForStock: [],
      intervalForRsi: '',
      macdValuesForStock: [],
      intervalForMacd: '',
      displayRetryOption: false,
      loadingStockDetails: false
    };
  }

  componentDidMount() {
    this.fetchRSIForStock(this.props.stock.code, 'daily');
    this.fetchMACDForStock(this.props.stock.code, 'daily');
  }

  refreshCharts() {
    this.fetchRSIForStock(this.props.stock.code, 'daily');
    this.fetchMACDForStock(this.props.stock.code, 'daily');
  }

  fetchRSIForStock(stockCode, interval) {
    let term = `${stockCode}.NSE`;
    const keys = ['F3YMXXSSB1DWAEWU', 'DDLGBF7C6UW50LSR', 'WXFOM7UBEMRGNOD5', 'PSIUYE1BYNK35V7D', 'Q2QD7JRMPER3VOYO'];
    const key = keys[Math.floor(Math.random() * keys.length)];
    const url = `https://www.alphavantage.co/query?function=RSI&symbol=${term}&interval=${interval}&time_period=10&series_type=open&apikey=${key}`;

    this.setState({
      loadingStockDetails: true
    });
    axios.get(url)
    .then(res => {
      if (res.data['Technical Analysis: RSI']) {
        const rsiObjectMap = Object.values(res.data['Technical Analysis: RSI']),
          rsiValues = rsiObjectMap.map(rsi => parseFloat(rsi.RSI)),
          ctx = document.getElementById(`rsiChart-${this.props.stock.code}`).getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: Object.keys(res.data['Technical Analysis: RSI']).slice(0, 10).reverse(),
            datasets: [
              {
                label: 'RSI',
                data: rsiValues.slice(0, 10).reverse(),
                borderColor: "#3e95cd",
                fill: false
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
        this.setState({
          rsiValuesForStock: rsiValues,
          displayRetryOption: false
        });
      } else {
        this.setState({
          displayRetryOption: true
        });
      }
    })
    .catch(error => {
      this.setState({
        displayRetryOption: true
      });
      console.log(error)
    })
    .finally(() => {
      this.setState({
        loadingStockDetails: false
      })
    })
  }

  fetchMACDForStock(stockCode, interval) {
    let term = `${stockCode}.NSE`;
    const keys = ['F3YMXXSSB1DWAEWU', 'DDLGBF7C6UW50LSR', 'WXFOM7UBEMRGNOD5', 'PSIUYE1BYNK35V7D', 'Q2QD7JRMPER3VOYO'];
    const key = keys[Math.floor(Math.random() * keys.length)];
    const url = `https://www.alphavantage.co/query?function=MACD&symbol=${term}&interval=${interval}&series_type=open&apikey=${key}`;

    this.setState({
      loadingStockDetails: true
    });
    axios.get(url)
    .then(res => {
      if (res.data['Technical Analysis: MACD']) {
        const macdObjectMap = Object.values(res.data['Technical Analysis: MACD']),
          macdValues = macdObjectMap.map(macd => parseFloat(macd.MACD)),
          macdSignalValues = macdObjectMap.map(macd => parseFloat(macd.MACD_Signal)),
          ctx = document.getElementById(`macdChart-${this.props.stock.code}`).getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: Object.keys(res.data['Technical Analysis: MACD']).slice(0, 10).reverse(),
            datasets: [
              {
                label: 'MACD',
                data: macdValues.slice(0, 10).reverse(),
                borderColor: "#3e95cd",
                fill: false
              },
              {
                label: 'MACD Signal',
                data: macdSignalValues.slice(0, 10).reverse(),
                borderColor: "#8e5ea2",
                fill: false
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
        this.setState({
          macdValuesForStock: macdValues,
          displayRetryOption: false
        });
      } else {
        this.setState({
          displayRetryOption: true
        })
      }
    })
    .catch(error => {
      this.setState({
        displayRetryOption: true
      });
      console.log(error);
    })
    .finally(() => {
      this.setState({
        loadingStockDetails: false
      })
    })
  }

  changeInterval(event) {
    let interval = '';
    switch (event.target.value) {
      case 'daily':
        interval = 'daily';
        break;
      case 'intraday_5':
        interval = '5min';
        break;
      case 'intraday_15':
      interval = '15min';
        break;
      default:
        break;
    }
    this.fetchRSIForStock(this.props.stock.code, interval);
    this.fetchMACDForStock(this.props.stock.code, interval);
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
        </div>
        { 
          this.state.loadingStockDetails ? <Loader sizeStyle={{height: '30px', width: '30px', marginLeft: '40%', marginTop: '20px'}}/> : null
        }
        {
          this.state.displayRetryOption && !this.state.loadingStockDetails ? <div><div style={{color: 'red'}}>Couldn't retrieve latest data. Refresh the page again after 1 minute</div><div><button className="button" onClick={this.refreshCharts.bind(this)}>Refresh</button></div></div> : null
        }
        <div className="charts">
          <div className={`rsi-chart-${this.props.stock.code}`} style={{height: '300px', width: '300px'}}>
            <canvas id={`rsiChart-${this.props.stock.code}`}></canvas>
          </div>
          <div className={`macd-chart-${this.props.stock.code}`} style={{height: '300px', width: '300px'}}>
            <canvas id={`macdChart-${this.props.stock.code}`}></canvas>
          </div>
        </div>
      </div>
    );
  }
}

export default HistoricalData;
import React, { Component } from 'react';
import axios from 'axios';
import './StockListItem.css';
import Loader from '../Loader/Loader';
import HistoricalData from '../HistoricalData/HistoricalData';
import FundamentalDetails from '../FundamentalDetails/FundamentalDetails';
import TechnicalIndicators from '../TechnicalIndicators/TechnicalIndicators';

class StockListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockDetails: {},
      displayRetryOption: false,
      loadingStockDetails: false
    };
    this.openTab = this.openTab.bind(this);
    this.fetchStockDetails = this.fetchStockDetails.bind(this);
  }

  componentDidMount() {
    this.fetchStockDetails(this.props.item.code);
    document.getElementById(`defaultOpen-${this.props.item.code}`).click();
  }

  openTab(ev, dataType) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName(`tabcontent-${this.props.item.code}`);
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName(`tablinks-${this.props.item.code}`);
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(dataType).style.display = "block";
    ev.currentTarget.className += " active";
  }

  fetchStockDetails(stockCode) {
    let term = `${stockCode}.NSE`;
    const keys = ['E3JQ79Z8TOZDXQ9O', '1MZEAXT6B2B52KXY', 'M8MTQHK38J65US1E', 'CDYFPHQYOGVYKYFL', 'TM6O1OH9WQIT6LIV'];
    const key = keys[Math.floor(Math.random() * keys.length)];
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${term}&apikey=${key}`;

    this.setState({
      loadingStockDetails: true
    });
    axios.get(url)
    .then(res => {
      if (res.data['Global Quote']) {
        this.setState({
          stockDetails: res.data['Global Quote'],
          displayRetryOption: false
        });
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
      });
    })
    .finally(() => {
      this.setState({
        loadingStockDetails: false
      })
    })
  }

  render() {
    const stockDetails = this.state.stockDetails;
    return (
      <div className="stock-details">
        <div>
          <div className="title">{ this.props.item.name }</div>
          <div className="tab">
            <button className={`tablinks-${this.props.item.code}`} onClick={ (ev) => this.openTab( ev, `latest-${this.props.item.code}`) } id={`defaultOpen-${this.props.item.code}`}>Latest Data</button>
            <button className={`tablinks-${this.props.item.code}`} onClick={ (ev) => this.openTab( ev, `fundamental-${this.props.item.code}`) }>Fundamental Details</button>
            <button className={`tablinks-${this.props.item.code}`} onClick={ (ev) => this.openTab(ev, `historical-${this.props.item.code}`) }>Historical</button>
            <button className={`tablinks-${this.props.item.code}`} onClick={ (ev) => this.openTab(ev, `technical-${this.props.item.code}`) }>Technical Indicators</button>
          </div>
          {
            this.state.displayRetryOption && !this.state.loadingStockDetails ? <div><div style={{color: 'red'}}>Couldn't retrieve latest data. Refresh the page again after 1 minute</div><div><button className="button" onClick={() => this.fetchStockDetails(this.props.item.code)}>Refresh</button></div></div> : null
          }
          { 
            this.state.loadingStockDetails ? <Loader sizeStyle={{height: '30px', width: '30px', marginLeft: '40%'}}/> :
            <div id={`latest-${this.props.item.code}`} className={`tabcontent-${this.props.item.code} details`}>
              <div>{ stockDetails && Object.keys(stockDetails).length ? Object.keys(stockDetails).map((key, index) => {
                return (
                <div key={index}>{ key === '05. price' ? <div>{key} : { Number(stockDetails['09. change']) > 0 ? <span style={{color: 'darkgreen'}}>{stockDetails[key]}</span> : <span style={{color: 'red'}}>{stockDetails[key]}</span>}</div>: <div>{key} : {stockDetails[key]}</div> }</div>
                );
              }) : null
              }</div>
            </div> 
          }
          <div id={`fundamental-${this.props.item.code}`} className={`tabcontent-${this.props.item.code} details`}>
            <FundamentalDetails stock={this.props.item}/>
          </div>
          <div id={`historical-${this.props.item.code}`} className={`tabcontent-${this.props.item.code} details`}>
            <HistoricalData stock={this.props.item}/>
          </div>
          <div id={`technical-${this.props.item.code}`} className={`tabcontent-${this.props.item.code} details`}>
            <TechnicalIndicators stock={this.props.item}/>
          </div>
        </div>
      </div>
    );
  }
}

export default StockListItem;
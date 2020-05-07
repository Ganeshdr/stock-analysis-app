import React, { Component } from 'react';
import axios from 'axios';
import './StockListItem.css';
import Loader from '../Loader/Loader';

class StockListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockDetails: {},
      loadingStockDetails: false
    };
    this.openTab = this.openTab.bind(this);
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
    const keys = ['F41ON15LGCFM4PR7', 'SYTCQBUIU44BX2G4', '50M3AP1K3Y', 'RNZPXZ6Q9FEFMEHM', 'VZLZ58FTEXZW7QZ6'];
    const key = keys[Math.floor(Math.random() * keys.length)];
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${term}&apikey=${key}`;

    this.setState({
      loadingStockDetails: true
    });
    axios.get(url)
    .then(res => {
      this.setState({
        stockDetails: res.data['Global Quote']
      });
    })
    .catch(error => console.log(error))
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
            <button className={`tablinks-${this.props.item.code}`} onClick={ (ev) => this.openTab( ev, 'latest') } id={`defaultOpen-${this.props.item.code}`}>Latest Data</button>
            <button className={`tablinks-${this.props.item.code}`} onClick={ (ev) => this.openTab(ev, 'historical') }>Historical</button>
            <button className={`tablinks-${this.props.item.code}`} onClick={ (ev) => this.openTab(ev, 'technical') }>Technical Indicators</button>
          </div>

          <div id="historical" className="tabcontent">
            <h3>Paris</h3>
            <p>Paris is the capital of France.</p> 
          </div>

          <div id="technical" className="tabcontent">
            <h3>Tokyo</h3>
            <p>Tokyo is the capital of Japan.</p>
          </div>
          { 
            this.state.loadingStockDetails ? <Loader sizeStyle={{height: '30px', width: '30px', marginLeft: '40%'}}/> :
            <div id="latest" className={`tabcontent-${this.props.item.code} details`}>
              { stockDetails && Object.keys(stockDetails).length ? Object.keys(stockDetails).map((key, index) => {
                return (
                  <div key={index}>{key} : {stockDetails[key]}</div>
                );
              }) : null
              }
            </div> 
          }
        </div>
      </div>
    );
  }
}

export default StockListItem;
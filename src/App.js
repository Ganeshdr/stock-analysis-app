import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import {ExcelRenderer} from './components/ReactExcelRenderer/ReactExcelRenderer';
import StockList from './components/StockList/StockList';
import ImportFile from './components/ImportFile/ImportFile';
import InputTag from './components/InputTag/InputTag';
import './App.css';

const INPUT_TIMEOUT = 600;
const filters = {};
let stocks = [];

// const SMA = require('technicalindicators').SMA;
// console.log(SMA.calculate({period : 5, values : [1,2,3,4,5,6,7,8,9]}));

class App extends Component {
  constructor() {
    super();

    this.state = {
      predictions: [],
      stocks: [],
      value: '',
      dataFetched: false,
      totalEntriesInfile: [],
      filters:{},
      selectedStocks: []
    };

    // this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSelectStock = this.onSelectStock.bind(this);
  }

  handleChange(e) {
    // clear timeout when input changes value
    clearTimeout(this.timeout);
    const value = e.target.value;
    this.setState({
      value
    });

    if (value.length > 1) {
      // make delayed api call
      this.timeout = setTimeout(() => {
        this.fetchAllPredictions(value);
      }, INPUT_TIMEOUT);
    } else {
      this.setState({
        predictions: []
      });
    }
  }

  fetchAllPredictions(text) {
    let term = `${text}.NSE`;
    const keys = ['F41ON15LGCFM4PR7', 'SYTCQBUIU44BX2G4', '50M3AP1K3Y', 'RNZPXZ6Q9FEFMEHM', 'VZLZ58FTEXZW7QZ6'];
    const key = keys[Math.floor(Math.random() * keys.length)];
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${term}&apikey=${key}`;

    this.setState({
      dataFetched: false
    })
    axios.get(url)
    .then(res => {
      let stocks = _.flattenDeep( Array.from(res.data['bestMatches']).map((stock) => [{code: stock['1. symbol'], name: stock['2. name']}]) );
      this.setState({
        predictions: stocks
      });
    })
    .catch(error => console.log(error))
    .finally(() => this.setState({
      dataFetched: true
    }))
  }

  onSelectStock(item, ev) {
    item.code = item.code.split('.')[0].toString();
    this.setState({
      value: '',
      predictions: [],
      selectedStocks: [ ...this.state.selectedStocks, item ]
    });
    ev.preventDefault();
  }

  onRemoveStock(item, ev) {
    const stockCode = item.code.split('.')[0].toString(),
      updatedSelectedStocks = this.state.selectedStocks.filter(stock => stock.code !== stockCode);
    this.setState({
      selectedStocks: updatedSelectedStocks
    });
  }

  filterValues(value, type, param) {
    if (!filters[param]) {
      filters[param] = {};
      filters[param][type] = value;
    } else {
      filters[param][type] = value;
    }
    if (!filters[param].min && !filters[param].max) {
      delete filters[param];
    }

    const columns = this.state.totalEntriesInfile[0],
      codeIndex = columns.indexOf('NSE Code'),
      nameIndex = columns.indexOf('Name');
    stocks = [...this.state.totalEntriesInfile.slice(0, this.state.totalEntriesInfile.length)];
    let newfilteredStocks = stocks.filter(item => Object.keys(filters).every(param => 
      filters[param].min && filters[param].max && (item[columns.indexOf(param)] >= Number(filters[param].min) && item[columns.indexOf(param)] <= Number(filters[param].max))
    ));
    newfilteredStocks = newfilteredStocks.slice(0, 5);
    const filteredStockNames = [ ...newfilteredStocks.map(stockData =>
      ({
        code: stockData[codeIndex],
        name: stockData[nameIndex]
      }))];
    this.setState({
      selectedStocks: filteredStockNames
    })
  }

  fileHandler(event) {    
    if(event.target.files.length){
      let fileObj = event.target.files[0];
      let fileName = fileObj.name;

      
      //check for file extension and pass only if it is .xlsx and display error message otherwise
      if(fileName.slice(fileName.lastIndexOf('.')+1) === "xlsx"){
        // this.setState({
        //   uploadedFileName: fileName,
        //   isFormInvalid: false
        // });
        this.renderFile(fileObj)
      }    
      else{
        // this.setState({
        //   isFormInvalid: true,
        //   uploadedFileName: ""
        // })
      }
    }               
  }

  renderFile(fileObj) {
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);            
      }
      else {
        this.setState({
          totalEntriesInfile: resp.rows
        });
      }
    }); 
}

  render () {
    // let stocks = this.state.stocks;
    const value = this.state.value;

    return (
      <div className="App">
        <h1 className="App__Title">Stock Search</h1>
        <InputTag entries={this.state.selectedStocks}
          value={ value }
          onChange={ this.handleChange }
          onClick={ this.handleClick }
          isDataFetched={this.state.dataFetched}
          predictions={ this.state.predictions }
          onSelect={ this.onSelectStock }
          onRemove={ this.onRemoveStock.bind(this) }/>
        <ImportFile onChange={this.fileHandler.bind(this)} onClick={(event)=> { event.target.value = null }}
          totalEntriesInfile={this.state.totalEntriesInfile} filterValues={this.filterValues.bind(this)}/> 
        <StockList stockItems={ this.state.selectedStocks }/>
      </div>
    );
  }
}

export default App;

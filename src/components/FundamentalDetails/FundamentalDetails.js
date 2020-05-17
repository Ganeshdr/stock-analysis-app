import React from 'react';
// import StockFundamentalData from '../../db/stock_details.json';

const fileData = require('../../db/stock_details.json');
const allStockData = fileData["3573 Stocks Detail"];
// var fs = require('fs');
// fs.readFile('../../db/stock_details.json', (err, data) => {
//   if (err)
//     console.log(err);
//   else {
//     const allStockData = JSON.parse(data["3573 Stocks Detail"]);
//   }
// })

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
 return prevProps.stock.code === nextProps.stock.code
}

const FundamentalDetails = (props) => {
  // console.log('json data', StockFundamentalData["3573 Stocks Detail"][0].Name, props);
  const searchedStockDetails = allStockData && allStockData.filter(stock => stock["NSE Code"] === props.stock.code)[0],
    keys = ['Price to Earning', 'Debt to equity', 'Return on capital employed', 'Return on equity', 'Price to Free Cash Flow', 'Free cash flow 3years', 'EPS',
    'Price to book value', 'Promoter holding', 'Pledged percentage', 'PEG Ratio', 'Average return on equity 3Years', 'Dividend yield', 
    'Industry PE', 'Profit growth 5Years'];
  return (
    searchedStockDetails ?
      <div>
        <div style={{paddingBottom: '10px'}}>Industry: { searchedStockDetails['Industry']} </div>
        <div>Market Capitalization(in crores): { searchedStockDetails['Market Capitalization']} </div>
        {
          keys.map((key, index) => <div key={index}>{key} : {searchedStockDetails[key]}</div>)
        }
      </div>
    : null
  );
};

export default React.memo(FundamentalDetails, areEqual);
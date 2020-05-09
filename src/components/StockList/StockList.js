import React from 'react';
import StockListItem from '../StockListItem/StockListItem';
import './StockList.css';


const StockList = (props) => {

  const stockItems = props.stockItems.map((stock, index) => {
    return (
      <StockListItem key={ index } item={stock}/>
    );
  });

  return (
    <div className="StockList">
      { stockItems }
    </div>
  )
}

export default StockList;

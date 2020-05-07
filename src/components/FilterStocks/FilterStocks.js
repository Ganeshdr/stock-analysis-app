import React from 'react';

import './FilterStocks.css';

function FilterStocks(props) {

  return  (
    <div className="filter_stocks">
      <div className="label" style={{paddingLeft:"10px"}}>Filter the stocks based on these parameters: </div>
      <div className="filters">
        { props.filterParams.map((item, index) => {
          return (
          <div className="FilterParams" key={index}>{item}: <input type="number" onChange={(ev) => props.filterValues(ev.target.value, 'min', item)}/> - <input type="number" onChange={(ev) => props.filterValues(ev.target.value, 'max', item)}/></div>
        )})}
      </div>
    </div>
  );
}

export default FilterStocks;

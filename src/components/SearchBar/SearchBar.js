import React from 'react';
import './SearchBar.css';

function SearchBar(props) {

    return  (
      <div className="SearchBar">
        <div className="SearchBar__InputBox">
          <input className="SearchBar__Input" placeholder="Enter NSE code for the stock"
                  value={ props.value }
                  onChange={ props.onChange } />
          <div className="SearchBar__Predictions"> 
            {
              props.predictions.length ? props.predictions.map((item, index) => (
                <div key={index} className="prediction" onClick={ (e) => props.onSelect(item, e) }>{item.symbol} : { item.name}</div>
              )) : props.value.length > 1 && props.isDataFetched ? <div className="error">No stocks with such keywords</div> : ''
            } 
          </div>
        </div>
        {/* <div className="SearchBar__Search">
          <button className="SearchBar__Button" onClick={ props.onClick }>search</button>
        </div> */}
      </div>
    );
}

export default SearchBar;

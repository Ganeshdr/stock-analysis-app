import React from 'react';
import FilterStocks from '../FilterStocks/FilterStocks';
import './ImportFile.css';

function ImportFile(props) {
  const filterParams = ['Market Capitalization', 'Return on equity', 'Price to Earning', 'Pledged percentage', 'PEG Ratio', 
  'Price to book value', 'Debt to equity'];
    return  (
      <div className="ImportFile">
        <div className="header optional">OR</div>
        <div className="header">You could even import .xlsx file to add the stocks in the search bar!(up to 5 stocks can be filtered at a time)</div>
        <input type="file" onChange={props.onChange} onClick={props.onClick} style={{"padding":"10px"}} />
        { props.totalEntriesInfile.length ? <div className="total_entries">{props.totalEntriesInfile.length - 1} entries found in the file</div> : '' }
        {props.totalEntriesInfile.length ?<FilterStocks filterParams={filterParams} filterValues={props.filterValues}/> : ''}
      </div>
    );
}

export default ImportFile;

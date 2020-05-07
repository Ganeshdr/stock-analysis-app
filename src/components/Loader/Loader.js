import React from 'react';
import './Loader.css';

function Loader(props) {
  return (
    <div className="loader" style={props.sizeStyle}></div>
  );
}

export default Loader;
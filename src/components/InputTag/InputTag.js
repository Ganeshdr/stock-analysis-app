import React, { Component } from 'react';
import './InputTag.css';
import Loader from '../Loader/Loader';

class InputTag extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tags: []
    };
  }
  
  componentDidMount() {
    this.setState({
      tags: this.props.entries
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.entries.length !== this.props.entries.length ) {
      this.setState({
        tags: [...new Set([...this.state.tags, ...this.props.entries])]
      })
    }
  }

  removeTag = (tag, i) => {
    const newTags = [ ...this.state.tags ];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
    this.props.onRemove(tag);
  }

  inputKeyDown = (item, e) => { 
    item.code = item.code.split('.')[0].toString();
    this.props.onSelect(item, e);
    if (this.state.tags.find(tag => tag.code.toLowerCase() === item.code.toLowerCase())) {
      return;
    }
    this.setState({ tags: [...this.state.tags, item]});
    this.tagInput.value = null;
  }

  render() {
    const { tags } = this.state;

    const predictions = this.props.predictions;
    return (
      <div>
        <div className="input-tag">
          <ul className="input-tag__tags">
            { tags.map((tag, i) => (
              <li key={i}>
                {tag.code}
                <button type="button" onClick={() => { this.removeTag(tag, i); }}>+</button>
              </li>
            ))}
            <li className="input-tag__tags__input">
              <input type="text"
                onChange={ this.props.onChange }
                placeholder="Enter proper NSE code for your stock"
                ref={c => { this.tagInput = c; }} />
            </li>
          </ul>
        </div>
        <div className="SearchBar__Predictions"> 
          <div>{ this.props.value.length > 1 && predictions && predictions.length ? predictions.map((item, index) => (
            <div key={index} className="prediction" onClick={ (e) => this.inputKeyDown(item, e) }>{item.code} : { item.name}</div>
          )) : <div>{ this.props.value.length > 1 && !this.props.isDataFetched && predictions && !predictions.length ? <div className="prediction"><Loader sizeStyle={{height: '12px', width: '12px', marginLeft: '40%'}}/></div>:null}</div>}</div>
          <div className="error">{ this.props.value.length > 1 && this.props.isDataFetched && predictions && !predictions.length ? 'No stock found with such keywords' : null }</div>
        </div>
      </div>
    );
  }
}

export default InputTag;

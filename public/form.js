import React from 'react';
import './form.css';
import axios from 'axios';
const e = React.createElement;


 class CreatePlaylistForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      axios.post("/createGroup",{hello:"max"});
      event.preventDefault();
    }
  
    render() {
      return e(
        'button',
        { onClick: () => this.setState({ liked: true }) },
        'Like'
      );
    }
  }

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(CreatePlaylistForm), domContainer);
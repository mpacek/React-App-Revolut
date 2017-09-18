import React, { Component } from 'react';
import { connect } from 'react-redux';

class ExchangeForm extends Component {
  constructor (props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        {console.log(this.props.exchange)}
      </div>
    )
  }
}

function mapStateToProps({ exchange }) {
  return { exchange };
}

export default connect(mapStateToProps)(ExchangeForm);

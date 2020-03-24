import React from 'react';
import Loader from 'react-loader-spinner';

import { axiosWithAuth } from '../utils/axiosWithAuth';
import AddFriend from './AddFriend';

class FriendsList extends React.Component {
  state = {
    gasPrices: []
  };

  componentDidMount() {
    this.getData();
  }


  getData = () => {
    // "/api/data"

    axiosWithAuth()
      .get('/api/friends')
      .then(res => {
        console.log(res.data);
        // res.data.data
        // filter out any object that is not "Gasoline - Regular" or is not "US" or "State of Hawaii"
        // TODO combine the two filters into a single filter
        this.setState({
          gasPrices: res.data  
        });
      });
  };


  render() {
    const gasPrices = this.state.gasPrices;
    //console.log(gasPrices);
    return (
      <div className="gas-prices">
        <div className="title-wrapper">
          Friends <AddFriend/>
        </div>
        {gasPrices.map(price => (
             
                      <p>{price.name} {price.age} {price.email} </p>
        ))}
                        
        {this.props.fetchingData && (
          <div className="key spinner">
            <Loader type="Puff" color="#204963" height="60" width="60" />
            <p>Loading Data</p>
          </div>
        )}
      </div>
    );
  }
}

export default FriendsList;

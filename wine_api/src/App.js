import React, { Component } from 'react';
import axios from 'axios';

const API_URL=process.env.REACT_APP_API_URL;
console.log(API_URL)
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: []
    }
  }
  componentDidMount(){
    this.getWineApi();
  }

  async getWineApi(){
       try{
          const response = await axios.get(API_URL);
          //console.log(API_URL);
          console.log("Response: ", response.data);
          const dataName=response.data;
          console.log(dataName[0]);
          this.setState({
            name:dataName.map((winename,i) => 
            (<li key={i} className='wine-name-list'>{winename.name}</li>))
          });
        }
       catch(e){
         console.error(e);
       }
  }
  render() {
    return (
      <div>
      <ul className="wine-name-list">{this.state.name}</ul>
      </div>
    );
  }
}


//Reference: To Display the array in list - https://stackoverflow.com/questions/47658765/objects-are-not-valid-as-a-react-child-found-object-promise
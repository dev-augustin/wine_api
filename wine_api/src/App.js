import React, { Component } from 'react';
import axios from 'axios';

const API_URL=process.env.REACT_APP_API_URL;
console.log(API_URL)
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: [],
      winepicture:[]
    }
  }
  componentDidMount(){
    this.getWineApi();
  }

  async getWineApi(){
       try{
          const response = await axios.get(API_URL);
          //console.log(API_URL);
          //console.log("Response: ", response.data);
          const dataName=response.data;
          // console.log(dataName[0]);
          //const dataName=response.data.map(listitem => console.log(listitem.name))
          let winePic=dataName.map(listitem =>listitem.picture);
         console.log("hello",winePic[0]);
          //console.log(response.data.picture)
          // this.setState({
          //   name:dataName.map((winename,i) => 
          //   (<li key={i} className='wine-name-list'>{winename.name}</li>))},
          this.setState({
            name:dataName.map((winename,i) => 
            (<li key={i} className='wine-name-list'>{winename.name}</li>))},
          );
          this.setState ({winepicture: winePic});
        }
       catch(e){
         console.error(e);
       }
  }
  render() {
    return (
      <React.Fragment>

      <div>
      <ul className="wine-name-list">{this.state.name}</ul>
      <div>
      <img src= {this.state.winepicture[0]} alt="wine1"/>
      <img src= {this.state.winepicture[1]} alt="wine1"/>
      <img src= {this.state.winepicture[2]} alt="wine1"/>
      <img src= {this.state.winepicture[3]} alt="wine1"/>
      <img src= {this.state.winepicture[4]} alt="wine1"/>
      <img src= {this.state.winepicture[5]} alt="wine1"/>
      </div>
      </div>
        </React.Fragment>
        
    );
  }
}


//Reference: To Display the array in list - https://stackoverflow.com/questions/47658765/objects-are-not-valid-as-a-react-child-found-object-promise
//How setState works - https://stackoverflow.com/questions/54974488/react-native-invariant-violation-invalid-argument-passed-as-callback-expected
//How to store data from json API response into array in ReactJS?
//https://stackoverflow.com/questions/56783262/how-to-store-data-from-json-api-response-into-array-in-reactjs
//React: Displaying images from api call - https://stackoverflow.com/questions/54314689/react-displaying-images-from-api-call
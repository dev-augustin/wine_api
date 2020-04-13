import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const API_URL=process.env.REACT_APP_API_URL; //API Url is stored as environment variable and .env file is added to .gitignore
console.log(API_URL);
export default class App extends Component {
      constructor(props){
      super(props);
      this.state = {
        wineNamePicList:[],
        name:"",
        year: "",
        grapes: "",
        country: "",
        region:"",
        description:"",
        picture:"",
        price:""
      
      };
      this.handleChange=this.handleChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
  }
      componentDidMount(){
      this.getWineApi();
  }

  // display of wine information using http get request with async await Axios
  async getWineApi(){
       try{
        const response = await axios.get(API_URL);
        //console.log(API_URL);
        //console.log("Response: ", response.data);
        const dataName=response.data;
        // console.log("nestedData: " ,response.data[0]);
        //console.log("wine name: ", dataName[0].name)
          let winePic=dataName.map((winename, id)=>(<div id="wineDisplay" key={winename.id}><img id="images" src={winename.picture} 
        alt = "wine name" height='100px'/><h5>Wine Name :</h5> {winename.name} <h5>
        Year:  {winename.year} 
        </h5>
       
        <h5>Grapes: {winename.grapes} </h5>
        
        <h5>Region:{winename.region} </h5>
        <h5>Description: </h5>{winename.description} <br/> <br/>
       <button id="button" onClick={ () => this.deleteWine(winename.id)}>Delete </button><br/></div>));
      
        //console.log(winePic)
        this.setState({wineNamePicList:winePic});
        }
       catch(e){
        console.error(e);
       }
  }

  // to delete a wine with wine id as input
  deleteWine(id){
        console.log("id to delete ", id)
        axios.delete(API_URL+"/"+id)
        .then(()=>{
        this.getWineApi();
          
        })
  }
  // handleChange - when user inputs data to create new wine
  handleChange=event => {
        this.setState({[event.target.name] : event.target.value});
  }
  // handleSubmit - when user submit create new wine form
  handleSubmit = event =>{
        event.preventDefault();
        let newWine = {
          name: this.state.name,
          year: this.state.year,
          grapes: this.state.grapes,
          country: this.state.country,
          region: this.state.region,
          description: this.state.description,
          picture: this.state.picture,
          price: this.state.price
  };
        console.log("newWine: ", newWine);
        console.log(API_URL);
        this.postApi(newWine);
  }

  // http post request for new wine
  async postApi(wineData){
        console.log("windata", wineData)
  try{
        const res = await axios.post(API_URL, wineData)
        console.log(res);
        console.log(res.data)
  } 
  catch (error){
        console.log(error);
  } 
        this.getWineApi();

  }
 
  render() {
    return (
        <React.Fragment>
        <h1 style={{alignItems:"center"}}>Wine List</h1>
        <div className="App">
        {this.state.wineNamePicList}
        </div>
        <hr/>
        <h2>Create new Wine form </h2>
        <form id="wineForm" onSubmit={this.handleSubmit}>
          <label>
          Wine Name:
          <input type = "text" name="name" onChange={this.handleChange} />
          </label>
          <br/>
          <label>
          Year: 
          <input type ="text"
          name="year" 
          onChange={this.handleChange}/>
          <br/>
          </label>
          <label>
          Grapes: 
          <input type ="text" name="grapes" 
          onChange={this.handleChange}/>
          </label>
          <br/>
          <label>
          Country: 
          <input type ="text" name="country"
          onChange={this.handleChange}/>
          </label>
          <br/>
          <label>
          Region: 
          <input type ="text" name="region"
          onChange={this.handleChange}/>
          </label>
          <br/>
          <label>
          Description: 
          <input type ="text" name="description"
          onChange={this.handleChange}/>
          </label>
          <br/>
          <label>
          Picture : 
          <input type ="text" name="picture"
          onChange={this.handleChange}/>
          </label>
          <br/>
          <label>
          Price: 
          <input type ="text" name="price"
          onChange={this.handleChange}/>
          </label>
          <br/>
          <button type="submit" id="deleteButton"> Create Wine </button>
          </form>
         
          
        </React.Fragment>       
    );
  }
}


// Reference: 
// To Display the array in list - https://stackoverflow.com/questions/47658765/objects-are-not-valid-as-a-react-child-found-object-promise
// How setState works - https://stackoverflow.com/questions/54974488/react-native-invariant-violation-invalid-argument-passed-as-callback-expected
// How to store data from json API response into array in ReactJS?
// https://stackoverflow.com/questions/56783262/how-to-store-data-from-json-api-response-into-array-in-reactjs
// React: Displaying images from api call - https://stackoverflow.com/questions/54314689/react-displaying-images-from-api-call
// Merge two array as key value pair - https://riptutorial.com/javascript/example/8628/merge-two-array-as-key-value-pair
// Rendering an Array of Data with map() and JSX - http://www.hackingwithreact.com/read/1/13/rendering-an-array-of-data-with-map-and-jsx
// https://alligator.io/react/axios-react/
// Handling Multiple Form Inputs in React : https://medium.com/better-programming/handling-multiple-form-inputs-in-react-c5eb83755d15, https://www.w3schools.com/react/react_forms.asp
// Delete data from API : https://stackoverflow.com/questions/53981989/delete-data-from-api-with-axios-and-reactjs
import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const API_URL=process.env.REACT_APP_API_URL;
console.log(API_URL)
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      wineNames: [],
      winePictures:[],
      wineNamePicList:[]
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
          console.log("test",dataName.length);
            let winePic=dataName.map((winename, index)=>(
            <ul className="ulIndex"><li className="listIndex" key={index}>{winename.name} <img src={winename.picture} alt = "wine names" height='100px'/> </li>
            </ul>));
          // let winePic=dataName.map((winename, index)=>(<p className="ulIndex" key={index}>{winename.name} <img src={winename.picture} alt = "hi"/> </p>));
          //  console.log("WinePic: ",winePic)
        //   let wineNamesArray=[];
        //   let wineImagesArray=[];
        //   for (let i=0; i< dataName.length; i++){
        //     wineNamesArray.push(dataName[i].name);
        //     //console.log("Wine: ", wineNamesArray);
        //     wineImagesArray.push(dataName[i].picture);
        //    // console.log("ImageUrl: ", wineImagesArray);
        //   }
     
        // let imagesList=  wineImagesArray.map((image, index) =>( 
        //     <img src= {image} key={index} alt ="" />
        //     ))

          //console.log(imagesList);

          // let mergeResult= imagesList.reduce(function(mergeResult, field, index){
          //   mergeResult[wineNamesArray[index]]=field;
          //   return mergeResult;
          // }, {})
          // console.log("mergeResult: ", mergeResult)
        // this.setState({wineNames: wineNamesArray});
        // this.setState({winePictures: imagesList});
        // this.setState({wineNamePicList: [wineNamesArray, imagesList]})
//setState({wineNamePicList: mergeResult})
this.setState({wineNamePicList:winePic})
       }
       catch(e){
         console.error(e);
       }
  }


 
  render() {
    return (
      <React.Fragment>

      <div className="display" >

        {this.state.wineNamePicList}
        }
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
//Merge two array as key value pair - https://riptutorial.com/javascript/example/8628/merge-two-array-as-key-value-pair
//Rendering an Array of Data with map() and JSX
//- http://www.hackingwithreact.com/read/1/13/rendering-an-array-of-data-with-map-and-jsx
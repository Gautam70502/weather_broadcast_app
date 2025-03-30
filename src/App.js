
import React, {useState } from "react";
import './App.css';
// import image from './assets/images/cloudy.png';

function App() {

  let [city, SetCity] = useState({});
  let [searchcity, Setsearchcity] = useState("");
  let [isButtonClicked, SetisButtonClicked] = useState(false);
  
  const handleButtonClick = (event) => {

    const data = event.target.value;
    console.log(event.target.value)
    Setsearchcity(data);
    console.log(searchcity);
    

  };


  

  const fetchcity = async () => {


    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchcity}&appid=ed3d67172e4c359689e0f0cb7b4dbd69`, {

      method: "GET",

    })
    
    city = await res.json();
    
    
    if (res.status === 400) {
      
      window.alert("Please Enter City Name");
      SetisButtonClicked(false);
      return;
      
    }
    
    if (res.status === 404) {
      
      window.alert("Please Enter Correct City Name")
      SetisButtonClicked(false);
      return;
    }
    
    SetCity(city);
    console.log(city);
    SetisButtonClicked(true);
   
  }

  // useEffect(() => {

  //   intialfetchcity()
  // })
  
  return (
    <>
    <center><h2>Weather Boardcast App v2</h2></center>
      <div className="container text-center mt-5">

          <div className="card">

            <div className="row no-gutters">

                  <div className="col card-text">
                    
                    <input className="mx-3 mt-4 mb-4" type="text" name="searchcity" placeholder="search" onChange={handleButtonClick}></input>
                    <span><button className="decor2" onClick={fetchcity}><i className="fa fa-search"></i></button></span>

                  </div>
           </div>


      {isButtonClicked && (
        <>
      

          <div className="row mt-5">

                <div className="col">

                  {/* <img className="imageedit" src={image} alt="" /> */}
                  <h3>{searchcity}</h3>
                  <h3>{Math.round(city.main.temp - 273,0,0)} C</h3>
                  
                </div>
                

          </div>
         
            
          
         <div className="row">

                <div className="col"> 
                    <p>max temp {Math.round(city.main.temp_max - 273,0,0)}</p>
                    <p>min temp {Math.round(city.main.temp_min - 273,0,0)}</p>
                </div>

                <div className="col"> 
                    <p>weather</p>
                    <p>{city.weather[0].description}</p>
                </div>

                <div className="col"> 
                    <p>visibility</p>
                    <p>{city.visibility}</p>
                </div>
                
         </div>   
         </>       
         )}  
        </div>
          
      </div>
          


    </>




  );
}

export default App;

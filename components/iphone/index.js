import { h, render, Component } from 'preact';
import style from './style';
import $ from 'jquery';
import Forecast from './Forecast';

export default class Iphone extends Component {
  constructor(props) {
    super(props);
    this.state = {
    temp: "",
    windSpeed: "",
    display: true,
    conditions: "",
    visibility: "",
    clicked: false,
    swap: false,
    showPopup: true, // set initial value for showPopup to true
    showExplain: false,
    rainVolume: 0,
  };
  this.fetchWeatherData(); // call function to fetch weather data

}

handleClick = () => {
  // function to run when the button is clicked
  this.setState({ showExplain: true }); // set showExplain state to true
}

fetchWeatherData = () => {
  // function to fetch weather data using OpenWeatherMap API
  var url = "http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=bca08f921773067db6b7fd5a292ba3fb";
  $.ajax({
    url: url,
    dataType: "jsonp",
    success: this.parseResponse, // call function to parse the response
    error: function(req, err) { console.log('API call failed ' + err); }
  });
}



getallSafetyIcon = () => {

  return (
    <div class={style.iconContainer}>
      <div>
        <img src="../../assets/icons/jacket.png" alt="Jacket icon" />
        <p class={style.iconDescription}>Wear windproof <br />jacket</p>
      </div>
      <div>
        <img class={style.gloveIcon} src="../../assets/icons/glove.png" alt="Glove icon" />
        <br></br>
        <p class={style.iconDescriptionglove}>Wear wind-proof<br /> gloves</p>
      </div>
      <div>
        <img src="../../assets/icons/sunglasses.png" alt="Sunglasses icon" />
        <p class={style.iconDescription}>Wear polarized<br />sunglasses</p>
      </div>
      <div>
        <img src='https://i.imgur.com/mWOqA3y.png' alt='visibility' style={{height:"30px",top:"46%",position:"absolute", margin:"1px"}} />
        <br></br>
        <p style={{font:"19px arial,serif",position:"relative",top:"23px"}}>Visibility<br />of the cyclist</p>
      </div>
      <div>
        <img src='https://cdn.discordapp.com/attachments/1084935663796895867/1085707310120304821/icons8--100.png' alt='suggest' style={{height:"70px",top:"44%",position:"absolute", margin:"6px"}}/>
        <br></br>
        <p style={{font:"19px arial,serif",position:"relative",top:"30px"}}>recommended<br />speed according weather</p>
      </div>
      <br></br>

    </div>

  )

};

checkSun = () => {
  // Check if the weather conditions are clear/sunny
  const { conditions } = this.state;
  if (conditions.includes("clear")) {
    // Display sunglasses icon and description
    return (
      <div class={style.iconContainer}>
      <div>
          <img src="../../assets/icons/sunglasses.png" alt="Sunglasses icon" />
          <p class={style.iconDescription}>Wear sunglasses</p>
      </div>
      </div>
    );
  }
}

checkWindSpeed = () => {
  // Check if the wind speed is greater than 6 meter per second
  const { windSpeed } = this.state;
  if (windSpeed > 2) {
    // Display wind-proof gloves and mask icons with descriptions
    return (
        <div class={style.iconContainer}>
        
        <div>
            <img class={style.gloveIcon} src="../../assets/icons/glove.png" alt="Glove icon" />
            <br></br>
            <p class={style.iconDescriptionglove}>Wear wind-proof<br /> gloves</p>
        </div>
        <div>
            <img class={style.gloveIcon} src="../../assets/icons/mask.png" alt="mask icon" />
            <br></br>
            <p class={style.iconDescriptionglove}>Wear a wind-proof<br /> mask</p>
        </div>
        </div>
    );
  }
}

checkJacket = () => {
  // Check if the weather conditions include rain
  const { windSpeed, conditions } = this.state;
  if (conditions.includes("rain")) {
    // Display rain jacket icon and description
    return (
      <div class={style.iconContainer}>
        <div>
          <img src="../../assets/icons/jacket.png" alt="Rain jacket icon" />
          <p class={style.iconDescription}>Wear  <br />jacket</p>
        </div>
      </div>
    );
    // Check if wind speed is greater than or equal to 6 meters per second
  } else if (windSpeed >= 2) {
    // Display wind-proof jacket icon and description
    return (
      <div class={style.iconContainer}>
        <div>
          <img src="../../assets/icons/jacket.png" alt="Jacket icon" />
          <p class={style.iconDescription}>Wear a water-proof<br />jacket</p>
        </div>
      </div>
    );
  }
}

getallSafeCautionInfo = () => {

  return (
    <div class={style.safetyContainer}>
      <div class={style.safetyCautionInfo}>
        <img src="../../assets/icons/jacket.png" alt="Jacket icon" />
        <p class={style.iconDescription}>Riding in cold (around 3 to -10 celsius), rainy or windy weather  
        could cause discomfort, it is advised that they wear a windproof or waterproof jacket</p>
      </div> 
      <div class={style.safetyCautionInfo}>
        <img class={style.gloveIcon} src="../../assets/icons/glove.png" alt="Glove icon" />
        <br></br>
        <p class={style.iconDescriptionglove}>Similar to the reasoning of needing a windproof jacket, 
         windproof gloves would also help with cold weather.
         </p>
      </div> 
      <div class={style.safetyCautionInfo}>
        <img src="../../assets/icons/mask.png" alt="Mask icon" />
        <p class={style.iconDescription}>Masks should also be worn during cold weather because it is very 
        uncomfortable to cycle without one.
        </p>
      </div>
      <div class={style.safetyCautionInfo}>
        <img src="../../assets/icons/sunglasses.png" alt="Sunglasses icon" />
        <p class={style.iconDescription}>On sunny days, sunlight could lead to the cyclist 
        being blinded, so it is advised to wear polarized sunglasses. 
        </p>
      </div>
     
      <br></br>

    </div>

  )

};

  // the main render method for the iphone component
  render() {
    const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
    const windStyles = this.state.windSpeed ? `${style.wind} ${style.filled}` : style.wind;
    const backgroundStyle = {
      backgroundImage: `url(${this.getBackgroundImageUrl()})`,
  
    };
    return (
      <div class={style.container} style={backgroundStyle}>
      {this.state.showPopup && ( // conditional rendering for pop-up window
        <div class={style.popup}>
            <button
                class={style.exitButton}
                onClick={() => this.setState({ showPopup: false })}
            >
                close
            </button>
            <div class={style.popupContent}>
            <h2>Welcome to Weather App <br />for cyclist!</h2>
            <div class={style.roundedContainersafetydemo}>
            <p class={style.text}></p>
                {this.getallSafetyIcon()}
            </div>
            <p>
            
            We provide real-time weather information that can impact your ride, including safety cautions, visibility updates, and recommended speed based on factors such as wind speed, rain volume, and visibility.

            </p>

            </div>
        </div>
        )}
        {this.state.showExplain && ( // conditional rendering for showExplain window
          <div class={style.popupSafety}>
              <button
                  class={style.exitButton}
                  onClick={() => this.setState({ showExplain: false })}
              >
                  close
              </button>

              <div class={style.popupContent}>
              <h2>Information <br />about safety caution</h2>
              <div class={style.explainContainer}>
            
                  {this.getallSafeCautionInfo()}
              </div>
            

              </div>
              
          </div>
          )}
        <div class={style.header}>
                  <button
                      class={style.learnButton}
                      onClick={() => this.setState({ showPopup: true })}
                  >
                    i
                  </button>
              <div class={style.city}>{this.state.locate}</div>
              <div class={style.conditions}>{this.state.conditions}</div>
              <span class={tempStyles}>{this.state.temp}</span>
              <span class={windStyles}>Wind-speed
              : {this.state.windSpeed} m/s</span>
              </div>
              <div class={style.details}>
              <div class={style.roundedContainersafety} onClick={this.handleClick}>
                <p style={{ margin: '15px', font: '25px arial,serif', bottom: '75%', left: '34%', position: 'absolute', opacity: '0.5' }}>
                  Safety Caution
                </p>
                {this.checkSun()}
                {this.checkWindSpeed()}
                {this.checkJacket()}
                <p style={{ margin: '15px', font: '25px arial,serif', top: '76%', left: '30%', position: 'absolute', opacity: '0.5' }}>
                  Click to learn more
                </p>
              </div>
          
              <div class={style.roundedContainerforecast}>
                <p style={{margin:"15px",font:" 25px arial,serif",bottom:"86%",position:"absolute",opacity: "0.5"}}>
                7 Days Forecasting
                </p>
                <div><Forecast/ ></div>
              </div>


          <div class={style.roundedContainer3}>
          <div class={style.roundedContainer1}>
          <div >
          <p style={{font:"25px arial,serif",bottom:"65%",left:"40%",opacity: "0.5",position:"absolute"}}>today</p>
              <img
                src="https://i.imgur.com/mWOqA3y.png"
                alt=""
          style={{height:"45px",bottom:"40%",left:"38%",position:"absolute"}}
              />
              <p class="word" style={{margin:"15px",font:" 25px arial,serif ",bottom:"10%",left:"20%",position:"absolute"}}>Visibility:{this.state.visibility} km</p>
              </div>
        </div>
        <div class={style.roundedContainer2}>
          <p style={{margin:"15px",font:" 25px arial,serif",top:"0%",position:"absolute",opacity: "0.5"}}>
          recommended:
          </p>
        <img
                src="https://cdn.discordapp.com/attachments/1084935663796895867/1085707310120304821/icons8--100.png"
                alt=""
          style={{height:"100px",position:"absolute",top:"25%"}}
              />
        <p style={{margin:"15px",font:" 25px arial,serif",top:"63%",position:"absolute"}}>
          
          speed:{this.speedsuggest()}km/h</p>
          </div>
        </div>
        </div>
        
        </div>
      
      
    );
    }
  
    parseResponse = (parsed_json) => {
    var location = parsed_json['name'];
    var temp_c = parsed_json['main']['temp'];
    var conditions = parsed_json['weather'][0]['description'];
    var wind_speed = parsed_json['wind']['speed'];
    var rainVolume = parsed_json.rain ? parsed_json.rain["1h"] || parsed_json.rain["3h"] || 0 : 0; // extract rain volume in mm

    this.setState({
      locate: location,
      temp: Math.round(temp_c) + "°C",
      conditions: conditions,
      windSpeed: wind_speed,
      rainVolume: rainVolume, // update rainVolume state variable
    });
    }
  
    getBackgroundImageUrl = () => {
    const conditions = this.state.conditions.toLowerCase();
    if (conditions.includes("clear")) {
      return "../../assets/backgrounds/sunny.jpg";
    } 
    else if (conditions.includes("cloud")) {
      return "../../assets/backgrounds/windy.jpg";
    } 
    else if (conditions.includes("rain")) {
      return "../../assets/backgrounds/rainy.jpg";
    }
    else {
      return "../../assets/backgrounds/default.jpg";
    }
    }


    componentDidMount() {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=b175bc9fc1a0075e0c37b5240bb1280e"
    )
      .then((response) => response.json())
      .then((data) =>
      this.setState({
        visibility: data.visibility /1000
      })
      );
    }
    speedsuggest() {
      // Get state variables
      const { windSpeed, visibility, rainVolume, conditions } = this.state;
    
      // Initialize suggested speed with base value
      let suggestedSpeed = 35;
    
      // Reduce suggested speed based on wind speed and rain volume
      suggestedSpeed -= windSpeed * 2;
      suggestedSpeed -= Math.min(rainVolume, 5);
    
      // Adjust suggested speed for specific weather conditions
      if (conditions === "foggy") {
        suggestedSpeed -= 10;
      } else if (conditions === "snowy") {
        suggestedSpeed -= 20;
      }
    
      // Adjust suggested speed based on visibility
      suggestedSpeed = Math.round(suggestedSpeed * visibility / 10);
    
      // Return final suggested speed
      return suggestedSpeed;
    }

  }
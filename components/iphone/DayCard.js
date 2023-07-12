import {h} from "preact";



var moment = require("moment");
function setImg(icon) {
  const icons = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
  return <img style={{ height: "70px" }} src={icons} alt="" />;
}

function DayCard(props) {
  let newDate = new Date();
  const weekday = props.data.dt * 1000;
  newDate.setTime(weekday);

  
  return (
        <div class="Card" style={{
        margin: "6.9px",
        height: "20%",
        width: "12%",
        borderRadius: "30px 30px",
        display: "inline-block",
        left: "50%"}}>
          <p style={{ textAlign: "center", left: "50%" ,font:" 25px arial,serif"}}>
            {moment(newDate).format("ddd")}
          </p>
          <p style={{ textAlign: "center", left: "50%" ,font:" 17px arial,serif"}}>
            {moment(newDate).format("Do MMMM")}
          </p>
          <p style={{ textAlign: "center", left: "50%",font:" 20px arial,serif" }}>
            {Math.round(props.data.temp.day)}°C
          </p>
          {setImg(props.data.weather[0].icon)}
          <p style={{ textAlign: "center" ,font:" 20px arial,serif"}}>{props.data.weather[0].main}</p>
        </div>
  );
}

export default DayCard;
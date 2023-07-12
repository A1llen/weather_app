import { h,Component } from "preact";
import DayCard from "./DayCard";

class Forecast extends Component {
  constructor() {
    super();
    this.state = {
      dailyData: []
    };
  }
  componentDidMount() {
    fetch(
      "https://api.openweathermap.org/data/2.5/onecall?lat=51.5074&lon=0.1278&exclude=current,minutely,hourly,alerts&units=metric&appid=b175bc9fc1a0075e0c37b5240bb1280e"
    )
      .then((Response) => Response.json())
      .then((data) => {
        this.setState({
          dailyData: data.daily.slice(1, 8)
        });
      });
  }
  formatDayCards = () => {
    return this.state.dailyData.map((data, index) => (
      <DayCard data={data} key={index} />
    ));
  };

  render() {
    return <div>{this.formatDayCards()}</div>;
  }
}

export default Forecast;
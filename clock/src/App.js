import React, {Component} from 'react';
import './styles/styles.css'
import Info from './Info'

import Refresh from './assets/img/icon-refresh.svg'

// import DayMobile from './assets/img/bg-image-daytime-mobile'
// import NightMobile from './assets/img/bg-image-nighttime-mobile'
// import DayTablet from './assets/img/bg-image-daytime-tablet'
// import NightTablet from './assets/img/bg-image-nighttime-tablet'
// import DayDesktop from './assets/img/bg-image-daytime-desktop'
// import NightDesktop from './assets/img/bg-image-nighttime-desktop'

class App extends Component {

  state = {
    hours: '',
    minutes: '',
    background: '',
    timeOfDay: '',
    timeZone: '',
    timeZoneAbbr: '',
    dayOfYear: '',
    dayOfWeek: '',
    weekNumber: '',
    location: '',
    quote: '',
    author: '',
    clicked: false
  }
  getQuote = async () => {
    await fetch('https://api.quotable.io/random', {
      method: 'GET'
    }).then(res => {
      return res.json()
    })
    .then(data => {
      this.setState({quote: data.content})
      this.setState({author: data.author})
    })
  }

  getTime = async () => {
    await fetch("https://worldtimeapi.org/api/ip", {
    method: 'GET'
  }).then(res => {
    return res.json()
  })
    .then(data => {
      const datetime = new Date(data.datetime)
      const timeZone = data.abbreviation
      const dayOfWeek = data.day_of_week
      const dayOfYear = data.day_of_year
      const weekNumber = data.week_number
      this.setState({timeZoneAbbr: timeZone})
      this.setState({dayOfWeek: dayOfWeek})
      this.setState({dayOfYear: dayOfYear})
      this.setState({weekNumber: weekNumber})
      this.setState({hours: datetime.getHours().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })})
      this.setState({minutes: datetime.getMinutes().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })})
      if (this.state.hours >= 4 && this.state.hours <= 11) {
        this.setState({timeOfDay: 'MORNING'})
      } else if (this.state.hours >= 12 && this.state.hours <= 17) {
        this.setState({timeOfDay: 'AFTERNOON'})
      } else if (this.state.hours >= 18 || this.state.hours <= 3) {
        this.setState({timeOfDay: 'EVENING'})
      }
    })
    .catch(error => console.log('Error'))
  }

  getLocation = async () => {
    await fetch('https://freegeoip.app/json/', {
      method: 'GET'
    }).then(res => {
      return res.json()
    })
    .then(data => {
      const currentLocation = data.city.toUpperCase() + ' ' + data.region_code + ', ' + data.country_code 
      const timeZone = data.time_zone
      this.setState({location: currentLocation})
      this.setState({timeZone: timeZone.replace(/_/g, ' ')})
    })
  }

  setTime = () => {
    this.interval = setInterval(() => this.getTime, 1000)
  }

  setBackground = () => {
    if (this.state.hours < 18 && this.state.hours >= 4) {
      this.setState({background: 'DayTime'})
    } else {
      this.setState({background: 'NightTime'})
    }
  }

  componentDidMount() {
    this.getQuote()
    this.interval = setInterval(this.getTime, 1000)
    this.setBackground()
    this.getLocation()
  }

  componentDidUpdate() {
    if (this.state.background === 'DayTime' && (this.state.hours > 18 || this.state.hours <= 3)) {
      this.setBackground()
    }
    else if (this.state.background === 'NightTime' && this.state.hours < 18 && this.state.hours >= 4) {
      this.setBackground()
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleClick = () => {
    if (this.state.clicked === true) {
      this.setState({clicked: false})
    } else {
      this.setState({clicked: true})
    }
  }

  render() {
    return (
      <div className={"App" + ' ' + this.state.background}>
        {this.state.clicked ? (<div></div>) : 
          (<div className="ProgrammingQuote">
            <div>
              <p>"{this.state.quote}"</p>
              <h5>{this.state.author}</h5>
            </div>
            <a href='#' onClick={() => this.getQuote()}><img src={Refresh} alt="Refresh Quote" /></a>
          </div>)
        }
        <div className="Time">
          <div className="GreetingContainer">
            <h4 className="Greeting">GOOD {this.state.timeOfDay}</h4>
            <h4 className="NoDisplayMobile">, IT'S CURRENTLY</h4>
          </div>
          <div className="Clock">
            <h1>{this.state.hours}:{this.state.minutes}</h1>
            <h4>{this.state.timeZoneAbbr}</h4>
          </div>
          <h3>IN {this.state.location}</h3>
        </div>
        <button onClick={() => this.handleClick()} className={this.state.clicked ? ("ToggleLess") : ("ToggleMore")}>{this.state.clicked ? ('LESS') : ('MORE')}</button>
        {this.state.clicked ? (<Info  background={this.state.background}
                                      timeZone={this.state.timeZone} 
                                      dayOfWeek={this.state.dayOfWeek} 
                                      dayOfYear={this.state.dayOfYear} 
                                      weekNumber={this.state.weekNumber} 
                              />) : 
                              (<div></div>)}
      </div>
    );
  }
}

export default App;

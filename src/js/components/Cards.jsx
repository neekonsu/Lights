import React, {Component} from "react";
var scrollToElement = require('scroll-to-element')
var delayer = require('delayed')

class Cards extends Component {
  render() {
    return (
        <div id="wrapper-div">
          <Card>
            <span id="card-title">Happy Father's day Bubba!</span>
            <div id="card-title-footer"/>
            <DownPage/>
          </Card>
          <CardBubba>
            <span id="Bubba">روز پدر مبارک! ما شما رو دوست داریم! خوش بگذره!</span>
          </CardBubba>
          <Lights/>
        </div>
    )
  }
}

class Card extends Component {
  render() {
    return(
      <div className="card-container">
        {this.props.children}
      </div>
    )
  }
}

class Lights extends Component {
  receivedState(room, isOn) {
    console.log("This was received by the wrapper")
    console.log(room + ": " + isOn)
  }
  render() {
    return(
      <div className="Lights">
        <div className="link-wrapper">
          {[
            {
              room: 'Office'
            },
            {
              room: 'Office Bathroom'
            },
            {
              room: 'Neekon Bedroom'
            },
            {
              room: 'Ryan Room'
            },
            {
              room: 'Homework Room'
            },
            {
              room: 'Living Room'
            },
            {
              room: 'Gallery'
            },
            {
              room: 'Guest Bathroom'
            },
            {
              room: 'Dining Room'
            },
            {
              room: 'Kitchen'
            },
            {
              room: 'Master Bedroom'
            },
            {
              room: 'Family Room'
            }
          ].map((item, i) => {
            return (
              <Room stateChange={this.receivedState.bind(this)} lumer={"s" + item.room.replace(" ", "")} key={i}>
                {item.room}
              </Room>
            )
          })}
        </div>
        <div id="card-title-footer" />
        <div className="link-wrapper">
          <Room stateChange={this.receivedState.bind(this)} lumer={"all"}>
            All Lights
          </Room>
        </div>
      </div>
    )
  }
}

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,

      sOffice: false,

      sOfficeBathroom: false,

      sNeekonBedroom: false,

      sRyanRoom: false,

      sHomeworkRoom: false,

      sLivingRoom: false,

      sGallery: false,

      sGuestBathroom: false,

      sDiningRoom: false,

      sKitchen: false,

      sMasterBedroom: false,

      sFamilyRoom: false
    };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
    this.props.stateChange(this.props.lumer, this.state.isToggleOn)
    console.log(this.props.lumer + " clicked")
  }

  render() {
    return (
      <span onClick={this.handleClick} className={this.state.isToggleOn ? "toggle-text-on" : "toggle-text-off"}>
        {this.state.isToggleOn ? this.props.children + ': ON' : this.props.children + ': OFF'}
      </span>
    );
  }
}

class CardBubba extends Component {
  render() {
    return(
      <div className="BubbaPage">
        {this.props.children}
      </div>
    )
  }
}

class ReactLogo extends Component {
  render() {
    return(
      <div className="viewBox">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 438.05 497.05">
          <defs>
            <title>logo</title>
          </defs>
          <path class="svg-2nd" d="M444.47,363.27c-36.37,8-76.91,13.77-120.17,16.84a829.29,829.29,0,0,1-74.45,94.35c-25.1-27.19-50.41-59.12-74.77-94.81-13.86-20.3-27.4-41.82-40.43-64.37-12.59-21.81-24.08-43.54-34.46-65-18.76-38.76-33.83-76.49-45-111.74,36-8.27,76.31-14.33,119.41-17.67C199.11,84.8,224.56,52.52,249.85,25c25.17,27.38,50.53,59.52,74.89,95.42,13.42,19.74,26.54,40.64,39.15,62.49,13.05,22.62,25,45.17,35.62,67.39C418.39,289.54,433.46,327.72,444.47,363.27Z" transform="translate(-30.79-1)"/>
          <path class="svg-2nd" d="M444.86,137.32c-11.17,35.6-26.38,73.78-45.35,113-10.38,21.43-21.87,43.17-34.46,65-13.12,22.73-26.77,44.4-40.75,64.83a829.29,829.29,0,0,1-74.45,94.35c-25.1-27.19-50.41-59.12-74.77-94.81C132,376.32,91.66,370.28,55.62,362c11-35.2,25.92-73,44.56-111.74,10.66-22.22,22.57-44.77,35.62-67.39,12.52-21.69,25.52-42.43,38.83-62C199.11,84.8,224.56,52.52,249.85,25c25.17,27.38,50.53,59.52,74.89,95.42C368,123.51,408.52,129.31,444.86,137.32Z" transform="translate(-30.79 -1)"/>
          <path class="svg-2nd" d="M399.51,250.3c18.88,39.24,34,77.42,45,113-36.37,8-76.91,13.77-120.17,16.84-23.15,1.65-47.07,2.51-71.55,2.51-26.66,0-52.64-1-77.68-3C132,376.32,91.66,370.28,55.62,362c11-35.2,25.92-73,44.56-111.74-18.76-38.76-33.83-76.49-45-111.74,36-8.27,76.31-14.33,119.41-17.67,25.17-2,51.32-3,78.12-3,24.64,0,48.7.86,72,2.53,43.24,3.09,83.78,8.89,120.13,16.91C433.69,172.92,418.48,211.1,399.51,250.3Z" transform="translate(-30.79 -1)"/>
          <circle class="svg-first" cx="220.8" cy="249.25" r="41.8"/>
          <line class="svg-2nd" x1="218.71" y1="24.5" x2="413.71" y2="136.5"/>
          <line class="svg-2nd" x1="24.71" y1="361.5" x2="218.71" y2="473.5"/>
          <line class="svg-2nd" x1="24.71" y1="137.5" x2="218.71" y2="24.5"/>
          <line class="svg-2nd" x1="218.71" y1="473.5" x2="413.71" y2="362.5"/>
          <circle class="svg-first" cx="24.02" cy="138.02" r="19.02"/>
          <circle class="svg-first" cx="414.02" cy="362.02" r="19.02"/>
          <circle class="svg-first" cx="219.02" cy="473.02" r="19.02"/>
          <circle class="svg-first" cx="219.02" cy="24.02" r="19.02"/>
          <text x="-30.79" y="-1">
          </text>
        </svg>
      </div>
    )
  }
}

class DownPage extends React.Component {
  constructor() {
    super()
    this.state = {
      clicked: false
    }
  }
  scrollPageToCard() {
    this.setState(
      {
        clicked: true
      }
    )
    scrollToElement('.BubbaPage', {
    offset: 0,
    align: 'middle',
    ease: 'in-out-circ',
    duration: 750
    });
    delayer.delay(function() {
    scrollToElement('.Lights', {
    offset: 0,
    align: 'middle',
    ease: 'in-out-circ',
    duration: 750
    });
  }, 5000)
  console.log(this.props)
  }
  render() {
    return (
      <div boyo={"sup"} className={this.state.clicked ? "DownViewBox box_clicked" : "DownViewBox"}>
        <svg id="Layer_1" onClick={this.scrollPageToCard.bind(this)} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 295.8 156.5">
          <title>down</title>
          <polyline class="downerSVG" points="290.8 12.21 151.5 151.5 5 5"/>
        </svg>
      </div>
    )
  }
}

export default Cards

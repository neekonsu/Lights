import React, {Component} from "react"
import * as firebase from "firebase"

class Cards extends Component {
  render() {
    return (
      <div>
        <div id="toolbar-spacer"/>
        <div id="wrapper-div">
          <Lights/>
        </div>
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
  constructor() {
    super()
    var config = {
    apiKey: "AIzaSyDJ31YrXt8JAPUZHYGNRS8WNjoHaz8ssuE",
    authDomain: "home-b7104.firebaseapp.com",
    databaseURL: "https://home-b7104.firebaseio.com",
    projectId: "home-b7104",
    storageBucket: "home-b7104.appspot.com",
    messagingSenderId: "42864256502"
  };
  firebase.initializeApp(config);
  }
  receivedState(room, isOn) {
    var database = firebase.database()
    firebase.database().ref().child('/rooms/' + room).set(isOn);
    console.log(room + ": " + isOn)
  }
  render() {
    return(
      <Card>
        <div className="link-wrapper">
          {[
            {room: 'Office'},
            {room: 'Office Bathroom'},
            {room: 'Neekon Bedroom'},
            {room: 'Ryan Room'},
            {room: 'Homework Room'},
            {room: 'Living Room'},
            {room: 'Gallery'},
            {room: 'Guest Bathroom'},
            {room: 'Dining Room'},
            {room: 'Kitchen'},
            {room: 'Master Bedroom'},
            {room: 'Family Room'}
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
      </Card>
    )
  }
}

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false
    };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
    this.props.stateChange(this.props.lumer, this.state.isToggleOn)
  }

  render() {
    return (
        <span onClick={this.handleClick} className={this.state.isToggleOn ? "toggle-text-on" : "toggle-text-off"}>
          {this.state.isToggleOn ? this.props.children + ': ON' : this.props.children + ': OFF'}
        </span>
    )
  }
}

export default Cards

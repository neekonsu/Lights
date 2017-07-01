import React, {Component} from "react"
import * as firebase from "firebase"
import colors from "colors"

var config = {
  apiKey: "AIzaSyDJ31YrXt8JAPUZHYGNRS8WNjoHaz8ssuE",
  authDomain: "home-b7104.firebaseapp.com",
  databaseURL: "https://home-b7104.firebaseio.com",
  projectId: "home-b7104",
  storageBucket: "home-b7104.appspot.com",
  messagingSenderId: "42864256502"
}
firebase.initializeApp(config)

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
  constructor(props) {
    super(props)
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
              <Room lumer={"s" + item.room.replace(" ", "")} key={i}>
                {item.room}
              </Room>
            )
          })}
        </div>
        <div id="card-title-footer" />
        <div className="link-wrapper">
          <Room lumer={"all"}>
            All Lights
          </Room>
        </div>
      </Card>
    )
  }
}

class Room extends Component {
  constructor(props) {
    super(props)
    this.state = { isToggleOn: false }
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    var room = this.props.lumer
    var state
    firebase.database()
            .ref()
            .child('/rooms/' + room)
            .once('value')
            .then( (snapshot) => {
      state = snapshot.val()
      this.setState({
        isToggleOn: state
      })
    })
    if(room == 'sOffice') {
      firebase.database().ref().child('rooms/sOffice').once('value').then( (snapshot) => {
        this.setState({
          isToggleOn: snapshot.val()
        })
      })
    }
    var oioi = firebase.database().ref().child('/rooms/' + room)
    oioi.on("value", (snapshot) => {
      console.log(room + ': ' + snapshot.val())
      state = snapshot.val()
      this.setState({
        isToggleOn: state
      })
    })
    var all = firebase.database().ref().child('/rooms/all')
    all.on('value', (snapshot) => {
      var state = snapshot.val()
      this.setState({
        isToggleOn: state
      })
    })
    console.log(this.props.lumer + ': mounted!')
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
    firebase.database().ref().child('/rooms/' + this.props.lumer).set(!this.state.isToggleOn)
    console.log(this.props.lumer + ": " + !this.state.isToggleOn)
  }

  render() {
    return (
        <a onClick={this.handleClick} className={this.state.isToggleOn ? "toggle-text-on" : "toggle-text-off"}>
          {this.state.isToggleOn ? this.props.children + ': ON' : this.props.children + ': OFF'}
        </a>
    )
  }
}

export default Cards

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
    var oioi = firebase.database().ref().child('/rooms/' + room)
    oioi.on("value", (snapshot) => {
      console.log('no one cares' + snapshot.val())
      state = snapshot.val()
      this.setState({
        isToggleOn: state
      })
    })
    console.log(this.props.lumer + ': mounted!')
  }
  handleClick() {
    var room = this.props.lumer
    var database = firebase.database().ref()
    if(room == "all") {
        database.child('/rooms/all').set(!this.state.isToggleOn)
        database.child('/rooms/sDiningRoom').set(!this.state.isToggleOn)
        database.child('/rooms/sFamilyRoom').set(!this.state.isToggleOn)
        database.child('/rooms/sGallery').set(!this.state.isToggleOn)
        database.child('/rooms/sGuestBathroom').set(!this.state.isToggleOn)
        database.child('/rooms/sHomeworkRoom').set(!this.state.isToggleOn)
        database.child('/rooms/sKitchen').set(!this.state.isToggleOn)
        database.child('/rooms/sLivingRoom').set(!this.state.isToggleOn)
        database.child('/rooms/sMasterBedroom').set(!this.state.isToggleOn)
        database.child('/rooms/sNeekonBedroom').set(!this.state.isToggleOn)
        database.child('/rooms/sOffice').set(!this.state.isToggleOn)
        database.child('/rooms/sOfficeBathroom').set(!this.state.isToggleOn)
        database.child('/rooms/sRyanRoom').set(!this.state.isToggleOn)
        this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn
        }))
    }
    this.setState( prevState => ({
      isToggleOn: !prevState.isToggleOn
    }) )
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

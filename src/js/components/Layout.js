import React from "react"
import Toolbar from "./Toolbar.jsx"
import Cards from "./Cards.jsx"

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Toolbar/><div className="toolbar-spacer"/>
        <Cards/>
      </div>
    );
  }
}

import React, {Component} from "react"

class Toolbar extends Component {
  render() {
    return (
      <div>
        <div className="toolbar">
          <Logo/>
        </div>
      </div>
    )
  }
}

class Logo extends Component {
  render() {
    return(
      <svg className="logo" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 293.44">
        <title>react</title>
        <circle class="svg1" cx="164.5" cy="147.22" r="18"/>
        <ellipse class="svg2" cx="249.5" cy="250" rx="57" ry="158.5" transform="translate(-177.57 54.96) rotate(-30)"/>
        <ellipse class="svg2" cx="250" cy="250" rx="158.5" ry="57" transform="translate(-177.51 238.23) rotate(-60)"/>
        <ellipse class="svg2" cx="165" cy="147.22" rx="158.5" ry="57"/>
      </svg>
    )
  }
}

export default Toolbar

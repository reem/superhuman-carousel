import React, { Component } from 'react'
import './App.css'

import {Carousel} from "./carousel.js"
import {ImagesLoader} from "./loaders.js"
import {fetchImages} from "./fetch.js"

class App extends Component {
  state = {
    search: "fireworks"
  }

  render() {
    return <div>
      <input
        type="text"
        value={this.state.search}
        onChange={(ev) => this.setState({ search: ev.target.value })}
      />

      <ImagesLoader
        search={this.state.search}
        fetchImages={fetchImages}
        render={({images, fetchMore}) => <Carousel images={images} onDisplayLastImage={fetchMore}/>}
      />
    </div>
  }
}

export default App

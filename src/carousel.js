import React, { Component } from "react"
import {ImageLoader} from "./loaders.js"
import {fetchImage} from "./fetch.js"

export class Carousel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: 0
    }
  }

  goPrev() {
    this.setState((state) => ({ selected: state.selected - 1 }))
  }

  goNext() {
    this.setState((state) => {
      console.log(state)
      if (this.props.images[state.selected + 2] === undefined) {
        this.props.onDisplayLastImage()
      }

      return { selected: state.selected + 1 }
    })
  }

  render() {
    return (
      <div style={{display: "flex"}}>
        <PreviewPhoto onClick={() => this.goPrev()} image={this.props.images[this.state.selected - 1]}/>
        <MainPhoto image={this.props.images[this.state.selected]}/>
        <PreviewPhoto onClick={() => this.goNext()} image={this.props.images[this.state.selected + 1]}/>
      </div>
    )
  }
}

class ImageMetadata extends Component {
  render() {
    if (!this.props.imageId) {
      return null
    }

    return <ImageLoader
      imageId={this.props.imageId}
      fetchImage={fetchImage}
      render={({imageData}) =>
        imageData && <div >
          Likes {imageData.likes}<br/>
          Views {imageData.views}<br/>
          Downloads {imageData.downloads}
        </div>}
     />
  }
}

class MainPhoto extends Component {
  render() {
    if (!this.props.image) {
      return null
    }

    return <div>
      <img src={this.props.image.urls.small}/>
      <ImageMetadata imageId={this.props.image.id}/>
    </div>
  }
}

class PreviewPhoto extends Component {
  render() {
    if (!this.props.image) {
      return null
    }

    return <div onClick={this.props.onClick}>
      <img src={this.props.image.urls.thumb}/>
      <ImageMetadata imageId={this.props.image.id}/>
    </div>
  }
}

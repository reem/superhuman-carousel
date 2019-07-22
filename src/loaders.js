import { Component } from 'react'

export class ImageLoader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imageData: null
    }
  }

  refreshData(imageId) {
    this.setState({ imageData: null })
    this.props.fetchImage(imageId).then((imageData) => this.setState({ imageData }))
  }

  componentDidMount() {
    this.refreshData(this.props.imageId)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.imageId !== this.props.imageId) {
      this.refreshData(this.props.imageId)
    }
  }

  render() {
    return this.props.render({ imageData: this.state.imageData })
  }
}

export class ImagesLoader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      images: [],
      pageNumber: 1
    }
  }

  componentDidUpdate(prevProps) {
    // Reset if the search term changes
    if (prevProps.search !== this.props.search) {
      this.setState({
        images: [],
        pageNumber: 1
      })

      this.fetchInitial()
    }
  }

  componentDidMount() {
    this.fetchInitial()
  }

  fetchInitial() {
    this.props.fetchImages(this.props.search)
      .then((images) => this.setState({images}))
  }

  fetchMore() {
    // NOTE(reem): Racy - need to cancel previous request or otherwise
    // ensure no stale update if we fetch multiple pages at once
    this.props.fetchImages(this.props.search, this.state.pageNumber + 1)
      .then((images) => {
        this.setState((state) => ({
          ...state,
          pageNumber: state.pageNumber + 1,
          images: state.images.concat(images)
        }))
      })
  }

  render() {
    return this.props.render({
      images: this.state.images,
      fetchMore: () => this.fetchMore()
    })
  }
}

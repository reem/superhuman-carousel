const CLIENT_TOKEN = "6bb5bb78cfde81736048d37f2d3399d5024a6a5be277ad88a4b1a366a5e4f77f"

export function fetchImages(search, page = 0) {
  const params = new URLSearchParams({
    page,
    query: search,
    client_id: CLIENT_TOKEN
  })

  return fetch("https://api.unsplash.com/search/photos?" + params.toString(), {
    method: "GET",
  }).then((response) => response.json())
    .then((response) => response.results)
}

export function fetchImage(imageId) {
  const params = new URLSearchParams({
    client_id: CLIENT_TOKEN
  })

  return fetch("https://api.unsplash.com/photos/" + imageId + "?" + params.toString(), {
    method: "GET",
  }).then((response) => response.json())
}

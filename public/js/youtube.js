function getVideos(event) {
    // Prevent form from refreshing the page
    event.preventDefault()

    // Clear previous results
    let videoContainer = document.querySelector('#results-grid')
    videoContainer.innerHTML = "";

    // Get user input
    const search = document.getElementById("searchQuery").value || "lofi"
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${search}&type=video&key=AIzaSyCTqlIRt9VXidpCuZWo7oo6oWdzHgsY-bc`,
      {method:'GET',
        headers:{Accept: 'application/json',
        'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .then((data) => {
    console.log(data.items)
    let videos = data.items
    for (let video of videos) {
        // console.log(video.snippet.title)
        // console.log(video.id.videoId)

        //Create video cards
        videoContainer.innerHTML += grid (
            `${video.id.videoId}`,
            `https://i.ytimg.com/vi/${video.id.videoId}/maxresdefault.jpg`,
            `${video.snippet.title}`
        )
    }

    function grid(id, thumbnail, title){
        return `
        <div class="col g-3">
            <a href="#" onclick="playVideo(event, '${id}')">
                <div class="card">
                    <img src="${thumbnail}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <p class="card-title">${title}</p>
                    </div>
                </div>
            </a>
        </div>`;
    }
    })
    .catch((error) => console.error(error))
}

//Open video

function playVideo(event, id){
    // Prevent form from refreshing the page
    event.preventDefault()

    // Clear results
    let frame = document.querySelector('#results-frame');
    frame.innerHTML = 
    ` <iframe src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}
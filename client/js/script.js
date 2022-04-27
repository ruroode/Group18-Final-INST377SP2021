

(async function() {

    const songListElement = document.querySelector(".glide__slides");

    // fetch songs from the API
    const resp = await fetch("/api/songs");
    const respJSON = await resp.json();

    // For each song... we create a new slide
    respJSON.data.forEach(song => {
        const newSongElement = document.createElement("li");
        newSongElement.classList.add("glide__slide")
        newSongElement.innerHTML = `<img class="placeholder" src="placeholder.png" alt="Placeholder Image">${song.title}`;
        songListElement.appendChild(newSongElement);
    });

    // Runs the carousel
    new Glide('.glide', {
        type: 'carousel',
        startAt: 0,
        perView: 4,
      }).mount();

})()
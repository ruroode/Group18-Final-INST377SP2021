// Contribute Page 
const contributeForm = document.querySelector('#contribute_form');
const topSongList = document.querySelector('.song_carousel');

// TODO
// Dictionary with {song_id : cover art URL} ??
const coverArt = 
{1:
    'httpshttps://upload.wikimedia.org/wikipedia/en/e/e7/Moneybagg_Yo_-_A_Gangsta%27s_Pain.png://m.media-amazon.com/images/I/819Yr1zpyEL._SS500_.jpg',
2: 
    'https://upload.wikimedia.org/wikipedia/en/8/8d/Holy_-_Justin_Bieber.png'
}



function formToObject(htmlFormElement) {
    const formItem = new FormData(htmlFormElement).entries();
    const formArray = Array.from(formItem);
    const formObject = formArray.reduce((collection, item, index) => {
    if (!collection[item[0]]) {
        collection[item[0]] = item[1];
    }
    return collection;
    }, {});
    return formObject;
};

console.log(contributeForm)

contributeForm.addEventListener('submit', async (submitEvent) => {
    submitEvent.preventDefault();
    console.log(submitEvent)
    const formObj = formToObject(contributeForm);

    
    const postResult = await fetch('api/artist', {
        
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObj)

    
    });
    
    const postResultJSON = await postResult.json();
    console.log('return from POST', postResult);
    console.log('return from POST JSON', postResultJSON)
    

});
//CHarts Maxim Galkin

// Cover Art //
function addSongs() {
    n = coverArt.length;
    var artList = "";

    for(i=0; i < n - 1; i++) {
        var cover = coverArt[i];
        console.log(cover);
    }
}

addSongs();

/* Inside this function, we need to call the API for each of the songs that are going to appear
    on our front page.
    Then we need to inject HTML into the web page that has the song title, and perhaps
    gets the song image from the song dictionary. 
    
    This is going to be hard.
    */

// Search Bar
// I say we just make the search bar change what is on the page just like in the labs
/* function inTuneSearch() {
    const searchBar = document.querySelector("#search_bar")
    console.log(searchBar.textContent)
} 

// export function inTuneSearch();


export function inTuneSearch();
 */

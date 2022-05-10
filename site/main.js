// key listener for the enter key for the text box
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('userInput').addEventListener('keyup', function (event) {
        event.preventDefault();
        if (event.key === 'Enter') {
            whatSaid();
        }
    });
});

//this is the chat log
const chatLog = [];

// holds street view api key
const streetKey = 'key';

// language picker button functions
function toggleDrop() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


function changeLang(lang) {
    fetch('http://localhost:4000/api/lang', {
        method: 'POST',
        body: JSON.stringify({lang: lang}),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
}

// change location of map image being displayed
function changeMapSrc(loc){
    var streetImage = document.getElementById("streetDef");
    streetImage.src = "https://maps.googleapis.com/maps/api/streetview?size=500x300&heading=0&location="+loc+"&key="+streetKey;
    if (streetImage.style.display == ""){
        streetImage.style.display = "block";
    }
}

//since all the vocabulary is on the server, query the server for an idea
function fillidea() {
    fetch('http://localhost:4000/api/idea')
        .then(res => res.json())
        .then(data => {
            var input = document.getElementById('userInput');
            input.value = data.idea;
        });
}

function whatSaid() {
    var input = document.getElementById('userInput');
    var userInput = input.value.toLowerCase();

    //print out user message
    addToChatLog('user', userInput);

    // clear the input box
    input.value = '';

    //send string to server and get response
    fetch('http://localhost:4000/api', {
        method: 'POST',
        body: JSON.stringify({ input: userInput }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
        .then(res => res.json())
        .then(data => {
            var respo = data.output;
            if (respo.includes(":LatLong")){
                var respLoc = respo.split(":LatLong");
                respo = respLoc[0];
                console.log("Location: ", respLoc[1]);
                changeMapSrc(respLoc[1]);
            }
            fetch('http://localhost:4000/api/translate', {
                method: 'POST',
                body: JSON.stringify({ input: respo }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' }
            })
                .then(res => res.json())
                .then(data => {
                    respo = data.output;
                    //print it out
                    addToChatLog('bot', respo);
                    spinImage();
                })
        });
}

{ var spun = false; }
// spin image over a time of 1 second
function spinImage() {
    var image = document.getElementById('Ai');
    if (!spun)
        image.classList.add('spin');
    else
        image.classList.remove('spin');
    spun = !spun;
}


const addToChatLog = (poster, message) => {
    //add to list in Reverse order
    chatLog.unshift({ poster: poster, message: message });

    // replace first h1 tag with h2 for BotRespo
    var h1 = document.getElementById('botRespo');


    var swap;
    //print out
    document.getElementById('botRespo').innerHTML = chatLog.reduce(
        (str, current_message, _) => {
            if (current_message.poster === 'bot') {
                swap = `<h2 class="${current_message.poster}_message">${current_message.poster}: ${current_message.message}</h2>`;
                return str;
            }
            else
                return str + `<p class="${current_message.poster}_message">${current_message.poster}: ${current_message.message}</p>` + swap;
        },
        ''
    );
    document.getElementById('botRespo').innerHTML = document.getElementById('botRespo').innerHTML.replace('h2', 'h1');
}

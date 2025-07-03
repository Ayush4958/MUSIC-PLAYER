const audio = new AudioContext()
const media = document.querySelector("audio")
const btn = document.getElementById("btn")
const frw = document.getElementById("forward")
const bwd = document.getElementById("backward")
const vol = document.querySelector("#vol")
const prg = document.getElementById("progress");
const crtime = document.getElementById("current-time");
const dur = document.getElementById("duration");

const audiosrc = audio.createMediaElementSource(media);

// Updtaing the progress bar as it continues
media.addEventListener("timeupdate" , () =>{
    prg.value = media.currentTime
    crtime.textContent = formatTime(media.currentTime)
})

// Maxing the progress bar value
media.addEventListener("loadedmetadata" , () =>{
    prg.max = media.duration
    dur.textContent = formatTime(media.duration)
})

// Seek when progress bar changes
prg.addEventListener("input", () => {
    media.crtime = prg.value;
});

// Converting it into time
function formatTime(time){
    const min = Math.floor(time/60)
    const sec = Math.floor(time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
}


// Play & Pause function 
btn.addEventListener("click" , ()=>{

// Helps in autoplay the music
    if(audio.state === "suspended"){
        audio.resume()
    }

// To play the audio 
    if(btn.className == "pause"){
        media.play()
        btn.setAttribute("class" , 'play')
        btn.textContent = "PAUSE"
    }

    else{
        media.pause()
        btn.setAttribute("class" , "pause")
        btn.textContent = "PLAY"
    }
})

// If the track is ended
media.addEventListener("ended" , ()=>{
    btn.setAttribute("class" , "pause")
    btn.textContent = "PLAY"
    crtime.textContent = '0:00'
    prg.value = 0
})

// Forwarding the music
frw.addEventListener("click" , ()=>{
    media.currentTime += 5
})

// Backwarding the music
bwd.addEventListener("click" , ()=>{
    media.currentTime -= 5
})

// For Volume 
const node = audio.createGain()
vol.addEventListener("input" , () =>{
    node.gain.value = vol.value
})

// For commecting the sound to any default destination (ex:- hardware)
audiosrc.connect(node).connect(audio.destination)
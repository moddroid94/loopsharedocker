var audio = document.querySelector("audio")
var playButton = document.querySelector("#audio-play")
var pauseButton = document.querySelector("#audio-pause")
var progress = document.getElementById("audio-playbar")
var volumeRange = document.getElementById('volume-range')

const play = () =>{
  if(audio.paused){
    console.log("play");
    playButton.classList.add("hidden");
    pauseButton.classList.remove("hidden")
    audio.play();
  }else{
    console.log("pause");
    playButton.classList.remove("hidden");
    pauseButton.classList.add("hidden")
    audio.pause();
  }
};

const bwd = () =>{
  console.log("bwd");
  audio.currentTime = 0;
};

const fwd = () =>{
  console.log("fwd");
  audio.currentTime += 5;
};


volumeRange.addEventListener("input",(event)=>{
  audio.volume = event.target.value / 100;
});


audio.ontimeupdate = (e) => {
    value = String(e.target.currentTime / e.target.duration * 100) + String('%')
    progress.style.width = value;
    }

audio.onended = (e) => {
    audio.pause()
    playButton.classList.remove("hidden");
    pauseButton.classList.add("hidden")
    audio.currentTime = 0;
}

playButton.addEventListener("click",play);
pauseButton.addEventListener("click",play);

document.querySelector("#audio-fwd")
  .addEventListener("click",fwd);

document.querySelector("#audio-bwd")
  .addEventListener("click",bwd);

var activeSample = null
function SelectSample(parentElement, audiosrc, filename){
    audio = document.querySelector("audio")
    audio.src = audiosrc
    audio.load()
    if (activeSample) {
        activeSample.parentNode.classList.remove('active')
    }
    parentElement.parentNode.classList.add('active')
    activeSample = parentElement
    document.getElementById("title").innerText = filename
    play()
}
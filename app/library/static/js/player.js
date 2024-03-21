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
function SelectSample(parentElement){
    var audiosrc = parentElement.getAttribute('data-url')
    
    parentElement.focus()
    audio = document.querySelector("audio")
    audio.src = audiosrc
    audio.load()
    if (activeSample) {
        activeSample.parentNode.classList.remove('active')
    }
    parentElement.parentNode.classList.add('active')
    activeSample = parentElement
    filename = parentElement.title
    document.getElementById("title").innerText = filename
    play()
}

jQuery(document).keydown(function(e){
  switch(e.which) {
      case 37: // left
          return;
      break;

      case 40: // up
        var element = document.querySelector(".active")
        var newelement = document.querySelector(".active").nextElementSibling.nextElementSibling
        newelement.focus()
        element.classList.remove('active')
        newelement.classList.add('active')
        SelectSample(newelement.querySelector("#trackdiv"))
      break;

      case 39: // right
          return;
      break;

      case 38: //down
        var element = document.querySelector(".active")
        var newelement = document.querySelector(".active").previousElementSibling.previousElementSibling
        newelement.focus()
        element.classList.remove('active')
        newelement.classList.add('active')
        SelectSample(newelement.querySelector("#trackdiv"))
      break;

      default: return; // exit this handler for other keys
  }
  e.preventDefault();
});
var audio = document.querySelector("audio")
var playButton = document.querySelector("#audio-play")
var progress = document.querySelector("#audio-playbar")
var volumeRange = document.getElementById('volume-slider')

const play = () =>{
  if(audio.paused){
    console.log("play");
    playButton.classList.add("paused");
    audio.play();
  }else{
    console.log("pause");
    playButton.classList.remove("paused");
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

audio.addEventListener("timeupdate",(e)=>{
progress.value = (e.target.currentTime / e.target.duration) * 100;
if(e.target.currentTime/e.target.duration === 1){
  play();
  audio.currentTime = 0;
}
});

audio.onended = (e) => {
    audio.pause()
}

playButton.addEventListener("click",play);

document.querySelector("#audio-fwd")
  .addEventListener("click",fwd);

document.querySelector("#audio-bwd")
  .addEventListener("click",bwd);

var activeSample = null
function SelectSample(parentElement, audiosrc){
    audio = document.querySelector("audio")
    audio.src = audiosrc
    audio.load()
    if (activeSample) {
        activeSample.classList.remove('active')
    }
    parentElement.classList.add('active')
    activeSample = parentElement

}
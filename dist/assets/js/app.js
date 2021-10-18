const voiceSelect = document.getElementById("voices");
const readBtn = document.getElementById("read-btn");
const textArea = document.getElementById("text-to-read");

//Toggle text box
document.getElementById("toggle").addEventListener("click", ()=>{
    document.getElementById("text-box").classList.toggle("show")
})

//Close text box
document.querySelector(".close").addEventListener("click", ()=>{
    document.getElementById("text-box").classList.remove("show");
})


let voices = [];
function populateVoiceList() {
  
    voices = speechSynthesis.getVoices();
    
    voices.forEach(voice=>{
        const option = document.createElement("option");
        option.value = voice.name;
        option.innerHTML = `${voice.name} ${voice.lang}`

        voiceSelect.appendChild(option)
    })
}
populateVoiceList(); 
speechSynthesis.addEventListener("voiceschanged", populateVoiceList);


//Initializing speech Synthesis utterance
const message = new SpeechSynthesisUtterance();

//Set text message
function setTextMessage(text){
    message.text = text;
}
//Speak Text
function speakText(){
    speechSynthesis.speak(message);
}

//Changing the voice
voiceSelect.addEventListener("change", setVoice)

function setVoice(e){
    message.voice = voices.find(voice=>voice.name === e.target.value)
}

//Read text
readBtn.addEventListener("click", ()=>{
    setTextMessage(textArea.value);
    speakText();
})

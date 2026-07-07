const transitionLink = document.getElementById('inner');
const playSFX = (audio) => audio.play().catch(() => {});
const sunhover= new Audio();
sunhover.src= "sounds/sunsound.wav";
sunhover.playbackRate=1.3;
const doorsound= new Audio("sounds/door.mp3");
if (transitionLink) {
    transitionLink.addEventListener('click', function(event) {
        event.preventDefault(); // Stop the browser from instantly changing pages
        
        // Add the class to slam the doors shut
        document.body.classList.add('doors-closed');
        doorsound.currentTime=0;
        doorsound.play();
        
        // Wait exactly 1000ms (1 second) for the doors to finish closing
        setTimeout(() => {
            window.location.href = transitionLink.href;
        }, 1000); 
    });

transitionLink.addEventListener("mouseover", ()=> {
    sunhover.currentTime=0;
    sunhover.play();
});
}
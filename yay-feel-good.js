const transitionLink = document.getElementById('inner');
const playSFX = (audio) => audio.play().catch(() => {});
const sunhover= new Audio();
sunhover.src= "https://res.cloudinary.com/oih4u0sn/video/upload/v1783448747/sunsound_y3p3q5.wav";
sunhover.playbackRate=1.3;
const doorsound= new Audio("https://res.cloudinary.com/oih4u0sn/video/upload/v1783448747/door_qmw1xj.mp3");
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

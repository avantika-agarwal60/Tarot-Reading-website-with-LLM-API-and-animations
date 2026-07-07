// --- 1. CORE SHUFFLE ENGINE ---
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// --- 2. GLOBAL ELEMENT SELECTORS ---
const deck = document.getElementById("deck");
const slider = document.getElementById("slider");
const stackedDeck = document.querySelector(".stackedDeck");
const shuffleButton = document.getElementById("shuffleButton");
const showLabel = document.getElementById("show-label");
const thirdpgbutton = document.getElementById("thirdpgbutton");
const fourthpgbutton = document.getElementById("fourthpagebutton");
const fortuneDisplayText = document.getElementById("fortune-display-text");

// --- 3. SYSTEM STATE VARIABLES ---
const cardNames = [
    "death_upright", "fool_upright", "magician_upright", "judgement_upright", "moon_upright", "world_upright", 
    "hierophant_upright", "wheel-of-fortune_upright", "empress_upright", "emperor_upright", "lovers_upright", 
    "hanged-man_upright", "chariot_upright", "devil_upright", "hermit_upright", "high-priestess_upright", 
    "justice_upright", "star_upright", "strength_upright", "sun_upright", "temperance_upright", "tower_upright", 
    "aceOfCups_upright", "2OfCups_upright", "3OfCups_upright", "4OfCups_upright", "5OfCups_upright", 
    "6OfCups_upright", "7OfCups_upright", "8OfCups_upright", "9OfCups_upright", "10OfCups_upright", 
    "pageOfCups_upright", "knightOfCups_upright", "queenOfCups_upright", "kingOfCups_upright", 
    "aceOfPentacles_upright", "2OfPentacles_upright", "3OfPentacles_upright", "4OfPentacles_upright", 
    "5OfPentacles_upright", "6OfPentacles_upright", "7OfPentacles_upright", "8OfPentacles_upright", 
    "9OfPentacles_upright", "10OfPentacles_upright", "pageOfPentacles_upright", "knightOfPentacles_upright", 
    "queenOfPentacles_upright", "kingOfPentacles_upright", "aceOfSwords_upright", "2OfSwords_upright", 
    "3OfSwords_upright", "4OfSwords_upright", "5OfSwords_upright", "6OfSwords_upright", "death_reversed", 
    "fool_reversed", "magician_reversed", "judgement_reversed", "moon_reversed", "world_reversed", 
    "hierophant_reversed", "wheel-of-fortune_reversed", "empress_reversed", "emperor_reversed", 
    "lovers_reversed", "hanged-man_reversed", "chariot_reversed", "devil_reversed", "hermit_reversed", 
    "high-priestess_reversed", "justice_reversed", "star_reversed", "strength_reversed", "sun_reversed", 
    "temperance_reversed", "tower_reversed", "aceOfCups_reversed", "2OfCups_reversed", "3OfCups_reversed", 
    "4OfCups_reversed", "5OfCups_reversed", "6OfCups_reversed", "7OfCups_reversed", "8OfCups_reversed", 
    "9OfCups_reversed", "10OfCups_reversed", "pageOfCups_reversed", "knightOfCups_reversed", 
    "queenOfCups_reversed", "kingOfCups_reversed", "aceOfPentacles_reversed", "2OfPentacles_reversed", 
    "3OfPentacles_reversed", "4OfPentacles_reversed", "5OfPentacles_reversed", "6OfPentacles_reversed", 
    "7OfPentacles_reversed", "8OfPentacles_reversed", "9OfPentacles_reversed", "10OfPentacles_reversed", 
    "pageOfPentacles_reversed", "knightOfPentacles_reversed", "queenOfPentacles_reversed", "kingOfPentacles_reversed", 
    "aceOfSwords_reversed", "2OfSwords_reversed", "3OfSwords_reversed", "4OfSwords_reversed", 
    "5OfSwords_reversed", "6OfSwords_reversed"
];

let cards = [];
let leftover = [];
let isShuffling = false;
let savedChoices = [];

// --- 4. AUDIO SYSTEM CONFIGURATION ---
const door2 = new Audio("sounds/door2.mp3");
const flippingSound = new Audio("sounds/flipping-sound.mp3");
const shufflesound = new Audio("sounds/shufflesound4.mp3");
const carddeal = new Audio("sounds/carddeal2.mp3");
const showslide = new Audio("sounds/carddeal.mp3");
const cardhover = new Audio("sounds/paperslide.mp3");
const shufflehover = new Audio("sounds/shufflehover.mp3");
const doorsound = new Audio("sounds/door.mp3"); 
const page3audio = new Audio("sounds/page3audio.mp3");
const page4audio = new Audio("sounds/fortuneTellersShopMusic.mp3");

// Tuning audio assets playback speeds
flippingSound.playbackRate = 1.5;
shufflesound.playbackRate = 0.7;
carddeal.playbackRate = 0.7;
showslide.playbackRate = 0.9;
cardhover.playbackRate = 1.3;
shufflehover.playbackRate = 1.7;

const playSFX = (audio) => audio.play().catch(() => {});

// --- 5. INITIALIZATION ROUTER (ON LOAD) ---
window.addEventListener('load', () => {
    
    // CONDITION A: Page 2 (The Selection Deck Board)
    if (deck) {
        deck.innerHTML = ``;
        cardNames.forEach((name) => {
            const wrapper = document.createElement("div");
            wrapper.className = "cardwrapper";
            wrapper.innerHTML = ` 
                <input type="checkbox" id="${name}-checkbox" class="cardcheckbox">
                <label for="${name}-checkbox" id="${name}-label" class="thecard">
                    <div class="faces ${name}-front" style="background-image: url('images/tarotback.jpg')"></div>
                    <div class="faces ${name}-back" style="background-image: url('cards/${name}.jpg'); transform: rotateY(180deg)"></div>
                </label>`;
            deck.appendChild(wrapper);
        });

        cards = Array.from(deck.querySelectorAll(".cardwrapper"));
        deck.innerHTML = ``;
        let initialPool = [...cards];
        shuffle(initialPool);
        
        deck.append(...initialPool.slice(0, 11));
        leftover = initialPool.slice(11, 22);
        leftover.forEach(stack => {
            if (stackedDeck) {
                stackedDeck.appendChild(stack);
                stack.classList.add("pos");
            }
        });

        setTimeout(() => {
            document.body.classList.remove('doors-closed');
            playSFX(door2);
        }, 150);
    } 

    // CONDITION B: Page 3 (The Carousel Ring)
    else if (slider) {
        playSFX(page3audio);
        page3audio.loop = true;
        savedChoices = JSON.parse(localStorage.getItem("selectedTarotCards")) || [];
        
        if (savedChoices.length === 0) {
            slider.innerHTML = `<h2 style="color: #f8c276; font-family: 'Old English Text MT', serif; text-align: center; margin-top: 20vh;">The cards are silent. Please return and make a choice.</h2>`;
            return;
        }

        const quantity = savedChoices.length;
        slider.style.setProperty("--quantity", quantity);

        fetch('tarot-meanings.json')
            .then(response => response.json())
            .then(meaning => {
                const container = document.getElementById("container");
                
                savedChoices.forEach((name, i) => {
                    const wrapper = document.createElement("div");
                    wrapper.className = "cardwrapper items";
                    wrapper.style.setProperty("--position", i + 1);
                    wrapper.innerHTML = `
                        <div class="thecard">
                            <div class="faces ${name}-front" style="background-image: url('images/tarotback.jpg')"></div>
                            <div class="faces ${name}-back" style="background-image: url('cards/${name}.jpg'); transform: rotateY(180deg)"></div>
                        </div>`;
                    slider.appendChild(wrapper);

                    const meaningLabel = document.createElement("div");
                    meaningLabel.className = "meaning-label";
                    meaningLabel.innerHTML = `
                        <h4 class="title">${meaning[name]?.title || "Unknown Card"}</h4>
                        <h6 class="orientation">${meaning[name]?.orientation || ""}</h6>
                        <p class="meaning">${meaning[name]?.meaning || ""}</p>
                    `;
                    meaningLabel.style.setProperty("--position", i);
                    container.appendChild(meaningLabel);
                });
            })
            .catch(err => console.error("Error loading JSON file:", err));

        window.addEventListener('scroll', () => {
            const scrollBy = window.scrollY;
            const trackHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = trackHeight <= 0 ? 0 : scrollBy / trackHeight;
            const cardsList = document.querySelectorAll('.items');
            const qty = cardsList.length;
            if (qty === 0) return;

            let rawIndex = Math.round(progress * (qty - 1));
            let activeIndex = (qty - (rawIndex % qty)) % qty; 

            const labels = document.querySelectorAll('.meaning-label');
            labels.forEach((label, index) => {
                if (index === activeIndex) {
                    label.classList.add('show');
                } else {
                    label.classList.remove('show');
                }
            });
        });

        window.dispatchEvent(new Event('scroll'));
        
        setTimeout(() => {
            document.body.classList.remove('doors-closed');
            playSFX(door2);
        }, 150);
    }

    // CONDITION C: Page 4 (The Fortune Display Page)
    else {
        const displayElement = document.getElementById("fortune-display-text");
        if (displayElement) {
            setTimeout(() => {
                document.body.classList.remove('doors-closed');
                playSFX(door2);
            }, 150);

            triggerOracleStream(displayElement);
        }
    }
    if(fortuneDisplayText)
    {
        playSFX(page4audio);
    }
});

// --- 6. PAGE 2: INTERACTIVE SHUFFLING ENGINE ---
if (shuffleButton) {
    shuffleButton.addEventListener('click', () => { 
        if (isShuffling || !deck || !stackedDeck) return;
        isShuffling = true;
        
        const currentCards = Array.from(deck.children);
        const unselectedCards = currentCards.filter(card => !card.querySelector(".cardcheckbox").checked);
        
        // 1. Get the target stack position cleanly
        const stackRect = stackedDeck.getBoundingClientRect();
        
        // 2. READ PHASE: Gather all starting positions before moving anything
        const moves = unselectedCards.map(card => {
            const cardRect = card.getBoundingClientRect();
            return {
                card,
                deltaX: stackRect.left - cardRect.left,
                deltaY: stackRect.top - cardRect.top
            };
        });
        
        // 3. WRITE PHASE: Animate them safely to the stack
        moves.forEach(({ card, deltaX, deltaY }) => {
            card.style.zIndex = "100";
            card.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
            card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });

        setTimeout(() => {
            const CardsInDeck = cards.filter(card => !currentCards.includes(card));
            let shufflePool = [...unselectedCards, ...CardsInDeck];
            shuffle(shufflePool);
            
            let finalSelection = [];
            let poolIndex = 0;
            for (let i = 0; i < 11; i++) {
                const currentCARD = currentCards[i];
                if (currentCARD && currentCARD.querySelector(".cardcheckbox").checked) {
                    finalSelection.push(currentCARD);
                } else {
                    finalSelection.push(shufflePool[poolIndex]);
                    poolIndex++;
                }
            } 
            
            stackedDeck.innerHTML = ``;
            deck.innerHTML = ``;
            finalSelection.forEach(card => card.classList.remove("pos"));
            deck.append(...finalSelection);
            
            leftover = shufflePool.slice(poolIndex);
            leftover.forEach(stack => {
                stackedDeck.appendChild(stack);
                stack.classList.add("pos");
            });

            // Recalculate stack position after DOM elements change
            const freshStackRect = stackedDeck.getBoundingClientRect();

            const newCurrentCards = Array.from(deck.children);
            const newUnselectedCards = newCurrentCards.filter(card => !card.querySelector(".cardcheckbox").checked);

            // 4. RETURN ANIMATION: READ PHASE
            const returnMoves = newUnselectedCards.map(card => {
                const cardRect = card.getBoundingClientRect();
                return {
                    card,
                    deltaX: freshStackRect.left - cardRect.left,
                    deltaY: freshStackRect.top - cardRect.top
                };
            });

            // 5. RETURN ANIMATION: WRITE PHASE
            returnMoves.forEach(({ card, deltaX, deltaY }) => {
                card.style.transition = 'none';
                card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                card.style.zIndex = "100";
            });

            deck.offsetHeight; // Force layout calculation
            
            newUnselectedCards.forEach(card => {
                card.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
                card.style.transform = "translate(0px, 0px)";
            });

            setTimeout(() => {
                newUnselectedCards.forEach(card => {
                    card.style.transition = '';
                    card.style.transform = '';
                    card.style.zIndex = '';
                });
                isShuffling = false;
            }, 500);
        }, 500);
    });
}

// --- 7. DATA PERSISTENCE PACKAGER (PAGE 2 TO PAGE 3) ---
if (thirdpgbutton) {
    thirdpgbutton.addEventListener("click", (event) => {
        if (!deck) return;
        event.preventDefault();
        
        const selectedBoxes = Array.from(deck.querySelectorAll(".cardcheckbox:checked"));
        const selectedNames = selectedBoxes.map(box => box.id.replace("-checkbox", ""));
        
        localStorage.setItem("selectedTarotCards", JSON.stringify(selectedNames));
        
        document.body.classList.add('doors-closed');
        doorsound.currentTime = 0;
        playSFX(doorsound);
        
        setTimeout(() => {
            window.location.href = thirdpgbutton.href;
        }, 1000); 
    });
}

// --- 8. TRANSITION PACKAGER (PAGE 3 TO PAGE 4) ---
if (fourthpgbutton) {
    fourthpgbutton.addEventListener("click", (event) => {
        event.preventDefault(); 
        
        document.body.classList.add('doors-closed');
        doorsound.currentTime = 0;
        playSFX(doorsound);

        setTimeout(() => {
            window.location.href = "aireading.html";
        }, 1000);
    });
}

// --- 9. SEPARATE STREAMING PROCESSOR ENGINE ---
// Separate Streaming Processor Function
// Separate Streaming Processor Function
// --- 9. SEPARATE STREAMING PROCESSOR ENGINE WITH TYPEWRITER EFFECT ---

async function triggerOracleStream(displayElement) {
    // 1. Force the browser to respect spaces and line breaks
    displayElement.style.whiteSpace = "pre-wrap"; 
    displayElement.textContent = "The cards are aligning... "; 

    const oracleButton = document.getElementById("fourthpagebutton");
    if (oracleButton) oracleButton.disabled = true;

    const currentChoices = JSON.parse(localStorage.getItem("selectedTarotCards")) || [];
    if (currentChoices.length === 0) {
        displayElement.textContent = "The spirits are lost. Return and pick your cards first.";
        if (oracleButton) oracleButton.disabled = false;
        return;
    }

    try {
        const response = await fetch('https://tarot-reading-website-with-llm-api-and.onrender.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ choices: currentChoices }) 
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || `Server returned status ${response.status}`);
        }

        if (!response.body) throw new Error("Stream not supported by endpoint.");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        
        displayElement.textContent = ""; // Clear loader text instantly

        let textQueue = "";
        let networkDone = false;

        const typingInterval = setInterval(() => {
            if (textQueue.length > 0) {
                // 2. Switched to textContent so spaces are never skipped or eaten up
                displayElement.textContent += textQueue[0];
                textQueue = textQueue.substring(1);
            } else if (networkDone) {
                clearInterval(typingInterval);
                if (oracleButton) oracleButton.disabled = false;
            }
        }, 80); 

        while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;
            
            if (value) {
                const chunk = decoder.decode(value, { stream: true });
                textQueue += chunk; 
            }
        }

        networkDone = true; 

    } catch (error) {
        console.error("Failed to fetch stream:", error);
        displayElement.textContent = `The spirits are silent. (${error.message})`;
        if (oracleButton) oracleButton.disabled = false;
    }
}
// --- 10. ISOLATED SOUND SENSOR HOOKS ---
if (shuffleButton) {
    shuffleButton.addEventListener("click", () => { shufflesound.currentTime = 0; playSFX(shufflesound); });
    shuffleButton.addEventListener("mouseover", () => { shufflehover.currentTime = 0; playSFX(shufflehover); });
}

if (deck) {
    deck.addEventListener("click", () => { carddeal.currentTime = 0; playSFX(carddeal); });
    deck.addEventListener("mouseover", () => { cardhover.currentTime = 0; playSFX(cardhover); });
}

if (showLabel) {
    showLabel.addEventListener("click", () => { flippingSound.currentTime = 0; playSFX(flippingSound); });
    showLabel.addEventListener("mouseover", () => { showslide.currentTime = 0; playSFX(showslide); });
}

if (thirdpgbutton) {
    thirdpgbutton.addEventListener("mouseover", () => { shufflehover.currentTime = 0; playSFX(shufflehover); });
}
if (fourthpgbutton) {
    fourthpgbutton.addEventListener("mouseover", () => { shufflehover.currentTime = 0; playSFX(shufflehover); });
}

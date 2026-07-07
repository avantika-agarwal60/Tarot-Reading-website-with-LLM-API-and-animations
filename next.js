window.addEventListener("load", () => {
    const deck = document.getElementById("deck");
    if (!deck) return;

    // 1. Define your card identifiers (Add all 78 string names here)
    const cardNames = [
        "death", "fool", "magician", "judgement", "moon","world","hierophant","wheel-of-fortune","empress","emperor","lovers","hanged-man","chariot","devil","hermit","high-priestess","justice","star","strength","sun","temperance","tower"
        // ... add the rest of your 78 card names here
    ];

    // 2. Clear out any static HTML placeholders
    deck.innerHTML = '';

    // 3. Dynamically build and inject the HTML structures
    cardNames.forEach((name) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'card-wrapper';
        wrapper.innerHTML = `
            <input type="checkbox" id="${name}-checkbox" class="cardcheckbox">
            <label class="thecard" for="${name}-checkbox">
                <div class="faces ${name}-front" style="background-image: url('images/tarotback.jpg'); z-index: 2;"></div>
                <div class="faces ${name}-back" style="background-image: url('cards/${name}.jpg'); transform: rotateY(180deg);"></div>
            </label>
        `;
        deck.appendChild(wrapper);
    });

   /* // 4. Calculate center-alignment targets for the physical shuffle layout trick
    const wrappers = Array.from(deck.querySelectorAll('.card-wrapper'));
    const deckCenter = deck.offsetWidth / 2;*/

    // 5. Sequence the Animations: Clear doors, then trigger visual shuffle
    setTimeout(() => {
        // Swing doors open smoothly
        document.body.classList.remove('doors-closed');
        
        // Start the visual sliding card animation
      /*  deck.classList.add('shuffling-deck');*/

        // 6. Halfway through the card stack slide, randomize their data index positions
        setTimeout(() => {
            const cards = Array.from(deck.querySelectorAll('.card-wrapper'));
            for (let i = cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [cards[i], cards[j]] = [cards[j], cards[i]];
            }
            deck.innerHTML = '';
            cards.forEach(card => deck.appendChild(card));
        }, 500); // 500ms marks the center overlap point of the animation

        /*// Clean up the visual tracking classes when done
        setTimeout(() => {
            deck.classList.remove('shuffling-deck');
        }, 1200);*/

    }, 150); // Small initial rest buffer to make sure layout calculations match
});
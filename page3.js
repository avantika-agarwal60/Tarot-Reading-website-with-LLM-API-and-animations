const quantity= finalSelectedCards.length;
for(let i=0; i<quantity; i++)
{
    finalSelectedCards[i].style.setProperty("--position",i);
    finalSelectedCards[i].classList.add("items");
}
const slider= document.getElementById("slider");
slider.style.setProperty("--quantity",quantity);

const overlay = document.getElementById('overlay');
const btn__reset = document.querySelector('.btn__reset');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const ul = document.querySelector('ul');
const tries = document.querySelectorAll('.tries');
const phrases = [
  'Do the Funky Chicken Noodle Soup',
  'The Good the Bad and The Ugly Duckling',
  'Where the Deer and the Antelope Play Video Games',
  'Gluten Free Speech',
  'Peppermint Stick Shift'
];
let missed = 0;

// Gets Random Phrases from an array
getRandomPhrasesAsArray = (arr) => {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  const split = randomPhrase.split('');
  return split;
 }

let phraseArray= getRandomPhrasesAsArray(phrases);

//Loops through array, creates li element
//Adds className "letter" & "space" to identify contents of li
//Appends li to parentNode --- in this case Ul element
addPhraseToDisplay = (arr) => {
  arr.forEach((arr, i) => {
    const li = document.createElement('li');
    li.textContent = arr;
    if(arr !== " "){
      li.className = "letter";
    } else {
      li.className = 'space';
    }
    phrase.firstElementChild.appendChild(li);
  });
}

addPhraseToDisplay(phraseArray);

//Matches li with classname "letter" with user button input,
//Adds class "show" if match found and letter is returned
//Returns null if no match found
checkLetter = (button) => {
  const li = document.getElementsByClassName('letter');
  let valueFound;
  for(let i = 0; i < li.length; i ++){
    let liText = li[i].textContent;
    let buText= button.textContent;
    if(liText.toLowerCase() === buText){
       li[i].classList.add("show");
       valueFound = buText;
     }
   }
   if (valueFound === undefined ) {
     return null;
   }
   else {
     return valueFound;
   }
}

//Adds win/lose to li classlist
//Creates and appends H3 tag displaying winner status (win or lose) to overlay
//Changes btn__reset text content to "Try Again"
winOrLose = (status, h3TxtCnt) => {
  overlay.classList.add(status);
  overlay.style.display = "";
  btn__reset.textContent = "Try Again";
  const h3 = document.createElement('h3');
  h3.textContent = h3TxtCnt;
  overlay.append(h3);

}

//Compares lengths of li with class letter to li with show
//If letter equals shows then player wins
//If missed  equals then player loses
checkWin = () => {
  const li = document.getElementsByClassName("letter");
  const show = document.getElementsByClassName('show');
  if(show.length === li.length) {
    winOrLose('win',"You Win!");
  }
  if(missed >= 5){
    winOrLose('lose', "You Lose!");
  };
}

//keyboard click event, adds class chosen,
//If no match heart(tries) is deducted and missed count increases by 1
qwerty.addEventListener('click', (e) => {
   const btn = event.target;
   if(btn.tagName ==="BUTTON"){
     btn.className = "chosen";
     btn.disabled = true ;
     const letterFound = checkLetter(btn);
     if(letterFound === null){
       tries[missed].style.display ='none';
       missed +=1;
   }
   checkWin();
 }
});

//Reset Keyboard

//Resets qwerty, removes all btn classes, transitions and btn status
resetQwerty = () => {
  const btn = document.querySelectorAll('button');
  for(let i = 0; i < btn.length; i++) {
      btn[i].removeAttribute("class");
      btn[i].disabled = false;
      btn[i].style.transition = 0;
    }
}

//Resets phrase by removing li from Ul
//Generates new phrases
resetPhrase = () => {
  const li = ul.querySelectorAll('li')
  for(let i = 0; i <li.length; i++) {
    li[i].remove();
  }

  addPhraseToDisplay(getRandomPhrasesAsArray(phrases));
}

//resets user tries(hearts)
resetTries = () => {
  for(let i = 0; i <tries.length; i++) {
    tries[i].style.display = '';
  }
}

resetOverlay = () => {
  overlay.removeAttribute("class");
  const removeH3 = overlay.querySelectorAll('h3');
  for(let i = 0; i <removeH3.length; i++) {
    removeH3[i].remove();
  }
}


resetGame = () => {
  resetPhrase();
  resetQwerty();
  resetTries();
  resetOverlay();
  missed = 0;
}
//resets Games
//removes overlay
btn__reset.addEventListener('click', () => {
  if(btn__reset.textContent === "Try Again"){
    resetGame();
  }
  overlay.style.display = "none";
});

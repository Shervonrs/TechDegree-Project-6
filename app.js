const overlay = document.getElementById('overlay');
const btn__reset = document.querySelector('.btn__reset');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

btn__reset.addEventListener('click', () => {
  overlay.style.display = "none";
});

const phrases = [
  'Do the Funky Chicken Noodle Soup',
  'The Good the Bad and The Ugly Duckling',
  'Where the Deer and the Antelope Play Video Games',
  'Gluten Free Speech',
  'Peppermint Stick Shift'
];

 function getRandomPhrasesAsArray(arr) {
  const newarr = [];
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  for(let i = 0; i < randomPhrase.length; i++){
    const split = randomPhrase[i];
    newarr.push(split)
  } return newarr;
 }

function addPhraseToDisplay(arr) {
  for(let i = 0; i < arr.length; i++){
    const li = document.createElement('li');
    li.textContent = arr[i];
    phrase.firstElementChild.appendChild(li);
    if(arr[i] !== " "){
      li.className = "letter";
    } else {
      li.className = '';
    }
  }
}
const phraseArray= getRandomPhrasesAsArray(phrases);
addPhraseToDisplay(phraseArray);

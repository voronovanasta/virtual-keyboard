const body = document.querySelector('body');
body.className = 'wrapper';

const title = document.createElement('h1');
title.textContent = 'RSS Виртуальная клавиатура';
title.className = 'title';
body.append(title);

const textarea = document.createElement('textarea');
textarea.className = 'textarea use-keyboard-input';
textarea.rows = 5;
textarea.cols = 50;
textarea.setAttribute('autofocus', 'autofocus')

body.append(textarea);

/*//wrapper for keyboard

const keyboardWrapper = document.createElement('div');
keyboardWrapper.className = 'keyboard-wrapper';
body.append(keyboardWrapper);

const keyboardKeys = document.createElement('div');
keyboardKeys.className = 'keyboard-keys';
keyboardWrapper.append(keyboardKeys);

button for check styles

//regular button
const button = document.createElement('button');
button.textContent = 'a'
button.className = 'keybord-key'

//Backspace
const button2 = document.createElement('button');
button2.className = 'keybord-key keybord-key-wide'
button2.innerHTML = 'Backspace'

//Enter
const button3 = document.createElement('button');
button3.className = 'keybord-key keybord-key-middle'
button3.innerHTML = 'Enter'

//TAb
const button4 = document.createElement('button');
button4.className = 'keybord-key keybord-key-tab-del'
button4.innerHTML = 'Tab'

keyboardKeys.append(button)
keyboardKeys.append(button2)
keyboardKeys.append(button3)
keyboardKeys.append(button4)*/

const Keyboard = {

  elements: {
    wrapper: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
},

  properties: {
    value: "",
    capsLockMode: false,
    lang: false,
  },

  init() {
    //create wrappers
    this.elements.wrapper = document.createElement('div');
    this.elements.wrapper.className = 'keyboard-wrapper'

    this.elements.keysContainer = document.createElement('div');
    this.elements.keysContainer.className = 'keyboard-keys';

    this.elements.keysContainer.append(this.createKeys())
    this.elements.keys= this.elements.keysContainer.querySelectorAll('.keyboard-key')

    this.elements.wrapper.append(this.elements.keysContainer);
    document.body.append(this.elements.wrapper)

    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
          this.open(element.value, currentValue => {
              element.value = currentValue;
          });
      });
  });
  },

  triggerEvent(handlerName){
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
  }

  },

  createKeys(){
    let countKey = 0;
    const fragment = document.createDocumentFragment();
    const keyLayoutEn = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
            "Tab","q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del",
            "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'",  "Enter",
            "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "&#9650;", "Shift",
            "Ctrl", "Win", "Alt", "Space", "Alt", "&#129080;", "&#9660;", "&#129082;", "Ctrl"
        ];

    const keyLayoutRu = [
          "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
          "Tab","й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", "Del",
          "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э",  "Enter",
          "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "&#9650;", "Shift",
          "Ctrl", "Win", "Alt", "Space", "Alt", "&#129080;", "&#9660;", "&#129082;", "Ctrl"
      ];

    let keyLayout = [] 

    if(this.properties.lang ){

      keyLayout = keyLayoutRu
    }
    else{
      keyLayout = keyLayoutEn
    }

    keyLayout.forEach(key=>{
      const keyBtn = document.createElement('button');
      keyBtn.setAttribute('type', 'button')
      keyBtn.classList.add('keyboard-key');
      const newLine = ["Backspace", "Del", "Enter"].indexOf(key)

      switch(key){
        case "Ctrl":
          keyBtn.innerHTML= "Ctrl"
          break;
        case "Win":
            keyBtn.innerHTML= "Win"
          break;
        case "Alt":
            keyBtn.innerHTML= "Alt"
        break;
        case "Backspace":
          keyBtn.classList.add('keyboard-key-wide')
          keyBtn.innerHTML= "Backspace"

          keyBtn.addEventListener('click', ()=>{
            this.properties.value=this.properties.value.substring(0, this.properties.value.length-1)
            this.triggerEvent('oninput')
          })
          break;

        case "CapsLock":
            keyBtn.classList.add('keyboard-key-wide')
            keyBtn.innerHTML= "CapsLock";
            keyBtn.addEventListener('click', ()=>{
              this.activateCapsLock();
              console.log("capslock on switch")
            })
          break;

          case "Shift":
            keyBtn.classList.add('keyboard-key-wide')
            keyBtn.innerHTML= "Shift";
            keyBtn.addEventListener('mousedown', ()=>{
              this.activateCapsLock();
            })
            keyBtn.addEventListener('mouseup', ()=>{
              this.activateCapsLock();
            })
          break;

        case "Enter":
            keyBtn.classList.add('keyboard-key-middle')
            keyBtn.innerHTML= "Enter";
            keyBtn.addEventListener('click', ()=>{
              this.properties.value+='\n';
              this.triggerEvent('oninput')
            })
        break;

        case "Space":
            keyBtn.classList.add('keyboard-key-the-widest')
            keyBtn.innerHTML= "";
            keyBtn.addEventListener('click', ()=>{
              this.properties.value+=' ';
              this.triggerEvent('oninput')
            })
        break;

        case "Tab":
          keyBtn.classList.add('keyboard-key-tab-del')
          keyBtn.innerHTML= "Tab";
          keyBtn.addEventListener('click', ()=>{
            this.properties.value+=' ';
            this.triggerEvent('oninput')
          })
      break;
        default:
          keyBtn.innerHTML = key;

          keyBtn.addEventListener('click',()=>{
            if(this.properties.capsLockMode){
              this.properties.value+=key.toUpperCase();
              console.log("capslock on default")
            }
            else{
              this.properties.value+=key.toLowerCase();
            }
            this.triggerEvent('oninput')

          })
      }
      fragment.append(keyBtn)

      if(newLine>=0){
        fragment.append(document.createElement('br'))
      }

      countKey++
      if(countKey === 55){
        fragment.append(document.createElement('br'))
      }
    })

    return fragment


  },

  activateCapsLock() {
    this.properties.capsLockMode = !this.properties.capsLockMode;
    const letters = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
    "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"]

    const allKeys = Array.from(this.elements.keysContainer.querySelectorAll('.keyboard-key'))
      for(let i=0; i< allKeys.length; i++){
        if(this.properties.capsLockMode && letters.includes(allKeys[i].textContent)){
          allKeys[i].textContent = allKeys[i].textContent.toUpperCase()
          console.log(allKeys[i].textContent)
            console.log("capslock on activate")

        }
        else{
            allKeys[i].textContent = allKeys[i].textContent.toLowerCase()
        }
       }
  },

  open(initialValue, oninput) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
},

}

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
  addInfo()
});

/*document.querySelector(".keyboard-wrapper").addEventListener('click',()=>{
  document.querySelectorAll(".use-keyboard-input").tabIndex = '1'
})*/

document.addEventListener('keydown', (event)=>{
  if(event.ctrlKey && event.altKey){
    Keyboard.properties.lang = !Keyboard.properties.lang
    document.querySelectorAll('.keyboard-keys').forEach(el=>{
      el.remove()
    })
    const keyboardKeys = document.createElement('div');
    keyboardKeys.className = 'keyboard-keys';
    document.querySelector('.keyboard-wrapper').append(keyboardKeys)
    document.querySelector('.keyboard-keys').append(Keyboard.createKeys())
    
  }
})

function setLocalStorage() {

  localStorage.setItem('lang', Keyboard.properties.lang);
}

window.addEventListener('beforeunload',()=>{
  setLocalStorage()

})

function getLocalStorage() {

  if(localStorage.getItem('lang')) {
    Keyboard.properties.lang = localStorage.getItem('lang');

  }
}

window.addEventListener('load', ()=>{
  getLocalStorage()
})

function addInfo(){
  const language = document.createElement('p')
language.className = 'text'
const system = document.createElement('p')
language.className = 'text'
system.textContent = 'Клавиатура создана в операционной системе Windows'
language.textContent = 'Для переключения языка комбинация: левыe ctrl + alt'
document.body.append(system)
document.body.append(language)

}

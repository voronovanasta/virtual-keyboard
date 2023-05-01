const body = document.querySelector('body');
body.className = 'wrapper';

const title = document.createElement('h1');
title.textContent = 'RSS Виртуальная клавиатура';
title.className = 'title';
body.append(title);

const textarea = document.createElement('textarea');
textarea.className = 'textarea';
textarea.rows = 5;
textarea.cols = 50;

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
    onclose: null
},

  properties: {
    value: "",
    capsLockMode: false,
  },

  init() {
    //create wrappers
    this.elements.wrapper = document.createElement('div');
    this.elements.wrapper.className = 'keyboard-wrapper'

    this.elements.keysContainer = document.createElement('div');
    this.elements.keysContainer.className = 'keyboard-keys';

    this.elements.keysContainer.append(this.createKeys())
    this.elements.keys= this.elements.keysContainer.querySelectorAll('button')
    console.log(this.elements.keys)
    this.elements.wrapper.append(this.elements.keysContainer);
    document.body.append(this.elements.wrapper)
  },

  triggerEvent(EventName){

  },
  
  createKeys(){
    let countKey = 0;
    const fragment = document.createDocumentFragment();
    const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
            "Tab","q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", "Del",
            "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'",  "Enter",
            "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "&#9650;", "Shift",
            "Ctrl", "Win", "Alt", "Space", "Alt", "&#129080;", "&#9660;", "&#129082;", "Ctrl"
        ];

    keyLayout.forEach(key=>{
      const keyBtn = document.createElement('button');
      keyBtn.classList.add('keybord-key');
      //if not -1- insert a new line
      const newLine = ["Backspace", "Del", "Enter"].indexOf(key)

      switch(key){
        case "Backspace":
          keyBtn.classList.add('keybord-key-wide')
          keyBtn.innerHTML= "Backspace"

          keyBtn.addEventListener('click', ()=>{
            this.properties.value=this.properties.value.substring(0, this.properties.value.length-1)
            this.triggerEvent('oninput')
          })
          break;

        case "CapsLock":
            keyBtn.classList.add('keybord-key-wide')
            keyBtn.innerHTML= "CapsLock";
            keyBtn.addEventListener('click', ()=>{
              this.activateCapsLock();
            })
          break;
        
          case "Shift":
            keyBtn.classList.add('keybord-key-wide')
            keyBtn.innerHTML= "Shift";
            keyBtn.addEventListener('mousedown', ()=>{
              this.activateCapsLock();
            })
            keyBtn.addEventListener('mouseup', ()=>{
              this.activateCapsLock();
            })
          break;

        case "Enter":
            keyBtn.classList.add('keybord-key-middle')
            keyBtn.innerHTML= "Enter";
            keyBtn.addEventListener('click', ()=>{
              this.properties.value+='\n';
              this.triggerEvent('oninput')
            })
        break;

        case "Space":
            keyBtn.classList.add('keybord-key-the-widest')
            keyBtn.innerHTML= "";
            keyBtn.addEventListener('click', ()=>{
              this.properties.value+=' ';
              this.triggerEvent('oninput')
            })
        break;

        case "Tab":
          keyBtn.classList.add('keybord-key-tab-del')
          keyBtn.innerHTML= "Tab";
          keyBtn.addEventListener('click', ()=>{
            this.properties.value+=' ';
            this.triggerEvent('oninput')
          })
      break;
        default:
          keyBtn.textContent = key;

          keyBtn.addEventListener('click',()=>{
            if(this.properties.capsLockMode){
              this.properties.value+=key.toUpperCase();
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
        console.log(keyLayout.indexOf(key))
        console.log(key)
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

    for(let i=0; i< this.elements.keys.length; i++){
      console.log(this.elements.keys[i].textContent.toUpperCase())
      if(letters.includes(this.elements.keys[i].textContent)){
        if(this.properties.capsLockMode){
          this.elements.keys[i].textContent.toUpperCase()
        }
        else{
          this.elements.keys[i].textContent.toLowerCase()
        }


      }
    }

  },
  
}

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.init();
});


console.log('&#129080;')
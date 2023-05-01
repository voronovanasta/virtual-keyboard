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

//wrapper for keyboard

const keyboardWrapper = document.createElement('div');
keyboardWrapper.className = 'keyboard-wrapper';
body.append(keyboardWrapper);

const keyboardKeys = document.createElement('div');
keyboardKeys.className = 'keyboard-keys';
keyboardWrapper.append(keyboardKeys);

/*//button for check styles

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

  properties: {
    value: "",
    capsLockMode: false,
  },

  init() {
    //create wrappers
    this.elements.wrapper = document.createElement('div');
    this.elements.wrapper.className = 'keyboard-wrapper'

    this.elements.keysContainer = document.createElement('div');
    this.elements.keysContainer.className = 'keyboard-keys'

    this.elements.wrapper.append(this.elements.keysContainer);
    document.body.append(this.elements.wrapper)
  },
  
  createKeys(){

  },

  activateCapsLock() {
    
  },
  
}

const init = Keyboard.init.bind('Keyboard')

document.addEventListener('DOMContentLoaded', init())
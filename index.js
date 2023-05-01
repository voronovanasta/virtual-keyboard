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

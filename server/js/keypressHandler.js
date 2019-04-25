const _ = require('underscore');
const keypress = require('keypress');

///////////////////////////////////////////////////////////////////////////////
// Utility Function ///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

const validMessages = ['left', 'right', 'up', 'down'];
const mappedChars = { space: ' ' }; // special mappings

const isValidMessage = (message) => {
  return _.contains(validMessages, message);
};

const logKeypress = (key) => {
  // in raw-mode it's handy to see what's been typed
  // when not in raw mode, the terminal will do this for us
  if (process.stdin.isRaw) {
    process.stdout.write(key);
  }
};

///////////////////////////////////////////////////////////////////////////////
// Keypress Handler ///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

var message = ''; // a buffer to collect key presses

module.exports.initialize = () => {

  // setup an event handler on standard input
  process.stdin.on('keypress', (chunk, key) => {
    // ctrl+c should quit the program
    if (key && key.ctrl && key.name === 'c') {
      process.exit();
    }

    // check to see if the keypress itself is a valid message
    if (isValidMessage(key.name)) {
      console.log(`Message received: ${key.name}`);
      return; // don't do any more processing on this key
    }
    
    // otherwise build up a message from individual characters
    if (key && (key.name === 'return' || key.name === 'enter')) {
      // on enter, process the message
      logKeypress('\n');
      if (message.length > 0) {
        console.log(`Message received: ${message}`);
      }
      // clear the buffer where we are collecting keystrokes
      message = '';
    } else {
      // collect the individual characters/keystrokes
      message += (mappedChars[key.name] || key.name);
      logKeypress(key.name);
    }

  });
};

///////////////////////////////////////////////////////////////////////////////
// Configuration -- do not modify /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

keypress(process.stdin);
if (process.stdin.setRawMode) {
  // configure stdin for raw mode, if possible
  process.stdin.setRawMode(true);
}

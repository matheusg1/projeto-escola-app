import React from 'react';

export default function guidGenerator() {
  function randomDigit() {
    if (crypto && crypto.getRandomValues) {
      var rands = new Uint8Array(1);
      crypto.getRandomValues(rands);
      return (rands[0] % 16).toString(16);
    } else {
      return ((Math.random() * 16) | 0).toString(16);
    }
  }

  var crypto = window.crypto || window.msCrypto;
  var result = "xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx".replace(/x/g, randomDigit);
  console.log(result);
  return result;
}
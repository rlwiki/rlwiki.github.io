"use strict";
var form = document.querySelectorAll('[data-id="form"]');
var password = document.querySelectorAll('[data-id="password"]');

function login(secret) {
  var hash = sha1(secret);
  var url = hash;
  var alert = document.querySelectorAll('[data-id="alert"]');

  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      window.location = url;
    } else {
      parent.location.hash = hash;
      alert[0].style.display = 'block';
      password[0].value = '';
    }
  }
  request.onerror = function () {
    parent.location.hash = hash;
    alert[0].style.display = 'block';
    password[0].value = '';
  }
  request.send();
}

form[0].addEventListener("submit", function (e) {
  e.preventDefault();
  login(password[0].value);
});

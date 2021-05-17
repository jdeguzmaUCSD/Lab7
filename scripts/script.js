// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
// const setState = router.setState;
let postCount = 1;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;

        let currentCount = postCount;
        // add eventlistener to post
        newPost.addEventListener('click', () => {
          router.setState('single-entry', newPost.entry, currentCount, true);
        });
        postCount = postCount + 1;

        document.querySelector('main').appendChild(newPost);
      });
    });
    let currentState = ['home', null, null];
    history.pushState(currentState, 'home', ' ', false);
  });

document.querySelector('img').addEventListener('click', () => {
  router.setState('settings', null, null, true);
});

document.querySelector('h1').addEventListener('click', () => {
  router.setState('home', null, null, true);
});

window.addEventListener('popstate', function(event) {
  console.log(event.state);
  if(event.state == null) {
    router.setState('home', null, null, false);
  } else {
    router.setState(event.state[0], event.state[1], event.state[2], false);
  }
});
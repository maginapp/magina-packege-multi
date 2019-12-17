// Greeter.js
// import './Greeter.scss';

module.exports = function() {
  var box = document.createElement('div');
  box.className = 'root'
  var greet = document.createElement('div');
  greet.textContent = "Hi there and greetings!---magina";
  box.appendChild(greet)
  return box;
};
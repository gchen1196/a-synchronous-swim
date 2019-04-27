$('body').on('keydown', (event) => {
  var arrowPress = event.key.match(/Arrow(Up|Down|Left|Right)/);
  if (arrowPress) {
    var direction = arrowPress[1].toLowerCase();
    postSwimCommand(direction);
  }
});

console.log('Client is running in the browser!');

const serverUrl = 'http://127.0.0.1:3000';

//
// TODO: build the swim command fetcher here
//

const getSwimCommand = () => {
  $.ajax({
    type: 'GET',
    url: `${serverUrl}/messages`,
    success: (res) => {
      console.log('GET DIRECTION:', res);
      SwimTeam.move(res);
    }
  })
}

const getBackground = () => {
  $.ajax({
    type: 'GET',
    url: `${serverUrl}/background.jpg`,
    success: (res) => {
      console.log(res);
    }
  })
}

const postSwimCommand = (direction) => {
  $.ajax({
    type: 'POST',
    url: `${serverUrl}/commands`,
    data: direction, //REFACTOR
    success: console.log(`Direction ${direction} Posted`)
  });
}

// setInterval(getSwimCommand, 1500);
/////////////////////////////////////////////////////////////////////
// The ajax file uplaoder is provided for your convenience!
// Note: remember to fix the URL below.
/////////////////////////////////////////////////////////////////////

const ajaxFileUplaod = (file) => {
  var formData = new FormData();
  formData.append('file', file);
  $.ajax({
    type: 'POST',
    data: formData,
    url: `${serverUrl}/background`,
    cache: false,
    contentType: false,
    processData: false,
    success: () => {
      // reload the page
      window.location = window.location.href;
    }
  });
};

$('form').on('submit', function(e) {
  e.preventDefault();

  var form = $('form .file')[0];
  if (form.files.length === 0) {
    console.log('No file selected!');
    return;
  }

  var file = form.files[0];
  if (file.type !== 'image/jpeg') {
    console.log('Not a jpg file!');
    return;
  }

  ajaxFileUplaod(file);
});


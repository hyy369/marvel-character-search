var PRIV_KEY = "0a40841836e0697f38a8f3e8362cd42c5184a9ec";
var PUBLIC_KEY = "446bee50b1db8ed995dd97a138395991";

function search() {
  var ts = new Date().getTime();
  var hash = md5(ts+PRIV_KEY + PUBLIC_KEY).toString();
  console.log(hash);
  var url = 'http://gateway.marvel.com:80/v1/public/comics';

  var title = $('#seach_box').val();
  // var startYear = $('#startYear').val();

  $.getJSON(url, {
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash,
    limit: 100,
    title: title,
    // startYear: startYear
  })
  .done(function(data) {
    console.log(data);
    for (var i = 0; i < data.data.count; i++) {
      $('#result').append('<p>'+data.data.results[i].title+'</p>')
    }
  })
  .fail(function(err) {
    console.log(err);
  })
}

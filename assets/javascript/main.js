var PRIV_KEY = "0a40841836e0697f38a8f3e8362cd42c5184a9ec";
var PUBLIC_KEY = "446bee50b1db8ed995dd97a138395991";

function search()
{
  $([document.documentElement, document.body]).animate
  ({
      scrollTop: $("#result").offset().top
  }, 2000);
  $('#result').empty().append('Searching...');

  var ts = new Date().getTime();
  var hash = md5(ts+PRIV_KEY + PUBLIC_KEY).toString();
  var comics_url = 'http://gateway.marvel.com:80/v1/public/comics';
  var char_url = 'http://gateway.marvel.com:80/v1/public/characters';

  var title = $('#seach_box').val();
  // var startYear = $('#startYear').val();

  $.getJSON(comics_url,
  {
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash,
    limit: 100,
    title: title,
    // startYear: startYear
  })
  .done(function(data)
  {
    // console.log(data);
    for (var i = 0; i < data.data.count; i++)
    {
      if (data.data.results[i].characters.returned > 0)
      {
        // console.log(data.data.results[i].characters.items);
        var sorted_result = data.data.results[i].characters.items.sort(sort_name);
        // console.log(sorted_result);
        getChar(sorted_result[0].name);
      }
    }
  })
  .fail(function(err)
  {
    console.log(err);
  })
}

function getChar(name) {
  var ts = new Date().getTime();
  var hash = md5(ts+PRIV_KEY + PUBLIC_KEY).toString();
  var char_url = 'http://gateway.marvel.com:80/v1/public/characters';
  $.getJSON(char_url, {
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash,
    limit: 100,
    name: name,
    // startYear: startYear
  })
  .done(function(data) {
    console.log(data);
    for (var i = 0; i < data.data.count; i++) {
      // console.log(data.data.results[i]);
      $('#result').append
      (
        '<div class="row"><div class="col-md-4">'+
        '<img src="'+data.data.results[i].thumbnail.path +'.'+ data.data.results[i].thumbnail.extension+'"/></div>'+
        '<div class="col-md-8"><h3>'+
        data.data.results[i].name+
        '</h3>'+
        '<p>'+data.data.results[i].description+
        '</p></div></div>'
      );
    }
  })
  .fail(function(err) {
    console.log(err);
  })
}

function sort_name (a, b) {
  var x = a['name']; var y = b['name'];
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

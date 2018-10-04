var PRIV_KEY = "0a40841836e0697f38a8f3e8362cd42c5184a9ec";
var PUBLIC_KEY = "446bee50b1db8ed995dd97a138395991";
var RESULT = [];
var COUNT = 0;
var PAGE = 1;
var MAX_PAGE = 1;

function changeSearchType(){
  $('#title_box').toggle();
  $('#initial_box').toggle();
}

function search()
{
  $([document.documentElement, document.body]).animate({scrollTop: $("#result").offset().top}, 2000);
  $('#result').empty().append('Searching...');
  if ($('#title_radio').is(':checked'))
  {
    console.log("title: "+$('#title_box').val()+$('select[name="start_year"]').val()+"order by: "+$('select[name="order_by"]').val());
    getComicByTitle();
  }
  if ($('#initial_radio').is(':checked'))
  {
        console.log("initial: "+$('#title_box').val()+$('select[name="start_year"]').val()+"order by: "+$('select[name="order_by"]').val());
    getComicByInitial();
  }
}

function getComicByTitle(_callback)
{
  var ts = new Date().getTime();
  var hash = md5(ts+PRIV_KEY + PUBLIC_KEY).toString();
  var comics_url = 'http://gateway.marvel.com:80/v1/public/comics';
  var char_url = 'http://gateway.marvel.com:80/v1/public/characters';

  var title = $('#title_box').val();
  var start_year = $('select[name="start_year"]').val();
  var order_by = $('select[name="order_by"]').val();
  var query =   {
      ts: ts,
      apikey: PUBLIC_KEY,
      hash: hash,
      limit: 100,
      title: title
    };
  if (start_year) {query[startYear]=start_year;}
  if (order_by) {query[orderBy]=order_by;}

  $.getJSON(comics_url, query)
  .done(function(data)
  {
    $('#result').empty()
    for (var i = 0; i < data.data.count; i++)
    {
      if (data.data.results[i].characters.returned > 0)
      {
        var sorted_result = data.data.results[i].characters.items.sort(sort_name);
        getChar(sorted_result[0].name, data.data.results[i].title);
      }
    }
  })
  .fail(function(err)
  {
    console.log(err);
  })
}

function getComicByInitial()
{
  var ts = new Date().getTime();
  var hash = md5(ts+PRIV_KEY + PUBLIC_KEY).toString();
  var comics_url = 'http://gateway.marvel.com:80/v1/public/comics';
  var char_url = 'http://gateway.marvel.com:80/v1/public/characters';

  var initial = $('#initial_box').val();
  var start_year = $('select[name="start_year"]').val();
  var order_by = $('select[name="order_by"]').val();
  var query =   {
      ts: ts,
      apikey: PUBLIC_KEY,
      hash: hash,
      limit: 100,
      title: title
    };
  if (start_year) {query[startYear]=start_year;}
  if (order_by) {query[orderBy]=order_by;}

  $.getJSON(comics_url, query)
  .done(function(data)
  {
    for (var i = 0; i < data.data.count; i++)
    {
      if (data.data.results[i].characters.returned > 0)
      {
        var sorted_result = data.data.results[i].characters.items.sort(sort_name);
        getChar(sorted_result[0].name, data.data.results[i].title);
      }
    }
  })
  .fail(function(err)
  {
    console.log(err);
  })
}

function getChar(name, title)
{
  var ts = new Date().getTime();
  var hash = md5(ts+PRIV_KEY + PUBLIC_KEY).toString();
  var char_url = 'http://gateway.marvel.com:80/v1/public/characters';
  $.getJSON(char_url, {
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash,
    limit: 100,
    name: name,
  })
  .done(function(data)
  {
    // RESULT.push({'title':title,'thumbnail':data.data.results[0].thumbnail.path +'.'+ data.data.results[0].thumbnail.extension, 'name':data.data.results[0].name,'description':data.data.results[0].description ? data.data.results[0].description : 'No description available.'});
    var description = data.data.results[0].description ? data.data.results[0].description : 'No description available.';
    $('#result').append
    (
      '<div class="row"><div class="col-md-4">'+
      '<img class="thumbnail" src="'+data.data.results[0].thumbnail.path +'.'+ data.data.results[0].thumbnail.extension+'"/></div>'+
      '<div class="col-md-8"><h3>'+data.data.results[0].name+'</h3>'+
      '<h6>in <em>'+title+'</em></h6>'+
      '<p class="description">'+description+
      '</p></div></div>\n'
    );
    slicePage();
  })
  .fail(function(err){console.log(err);})
}

function showResult()
{
  console.log(RESULT);
  $('#result').empty();
  for (var i = (PAGE-1)*10; i < RESULT.length && i < PAGE*10; i++)
  {
    $('#result').append
    (
      '<div class="row"><div class="col-md-4">'+
      '<img class="thumbnail" src="'+RESULT[i]['thumbnail']+'"/></div>'+
      '<div class="col-md-8"><h3>'+RESULT[i]['name']+'</h3>'+
      '<h6>in <em>'+RESULT[i]['title']+'</em></h6>'+
      '<p class="description">'+RESULT[i]['description']+
      '</p></div></div>'
    );
  }
}

function nextPage()
{
  PAGE ++;
  if (PAGE === MAX_PAGE) {}
  if (PAGE > 1) {}
  console.log("Next page");
  showResult();
}

function prevPage()
{
  PAGE--;
  if (PAGE === 1) {}
  console.log("Previous page");
  showResult();
}

function sort_name (a, b)
{
  var x = a['name']; var y = b['name'];
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}

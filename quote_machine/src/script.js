var quotes=[
  {"by":"Quentin Tarantino","text":"If I've made it a little easier for artists to work in violence, great! I've accomplished something."},
  {"by":"Quentin Tarantino","text":"When people ask me if I went to film school, I tell them \"No, I went to films.\""},
  {"by":"Quentin Tarantino","text":"On using surfing music, when hating the surfing culture: It's like surf music, I've always like loved that but, for me, I don't know what surf music has to do with surf boards. To me, it just sounds like rock and roll, even Morricone music. It sounds like rock and roll Spaghetti Western music, so that's how I kind of laid it in."},
  {"by":"Quentin Tarantino","text":"On media criticisms of violence in his movies.Sure, Kill Bill's a violent movie. But it's a Tarantino movie. You don't go to see Metallica and ask the fuckers to turn the music down."},
  {"by":"Quentin Tarantino","text":"On becoming famous: Going into a video store and going through the videos, looking at every title they have, trying to find some old Spaghetti Western, that's gone."},
  {"by":"Quentin Tarantino","text":"I will never do 'Pulp Fiction 2', but having said that, I could very well do other movies with these characters."},
  {"by":"Quentin Tarantino","text":"I've come to a point where I like Pauline Kael's reviews of Godard more than Godard's films."},
  {"by":"Quentin Tarantino","text":"There's only one list that's more illustrious than the list of directors who won the Palme d'Or. It's the list of directors who didn't."},
  {"by":"Quentin Tarantino","text":"I don't believe in putting in music as a band aid to get you over some rough parts or bad film making. If it's there it's got to add to it or take it to another level."},
  {"by":"Quentin Tarantino","text":"When I give props to these movies, you have to understand - it's not like they were all good. There's an expression: You have to drink a lot of milk before you can appreciate cream. Well, with exploitation movies, you have to drink a lot of milk-gone-bad before you can even appreciate milk! That's what part of the love of these movies is - going through the rummage bin and finding the jewels."}
];
function randomRange() {
  return Math.floor(Math.random()*(quotes.length));
}

$(document).ready(function(){
  $('#newquote').on('click',function(){
    var index = randomRange();
    $('#quote').html('"'+quotes[index].text+'"');
    $('#quoteby').html(quotes[index].by);
  })
  $('#quote').html('"'+quotes[randomRange()].text+'"');
  $('#quoteby').html(quotes[randomRange()].by);
})

// Inititialize LIRI and console.log Instructions



// Requires

var fs = require("fs");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");

// Initialize Variables

var input = process.argv;
var action = input[2];
var value = input[3];
var feed = new Twitter(keys.twitterKeys);
var userTwitter = "StagnerDev";
var spotify = new Spotify(keys.spotifyKeys);


// 

// Determine What LIRI is getting asked to do.

switch(action){
  case "my-tweets":
    getTweets();
    break;
  case "spotify-this-song":
    getSong(value);
    break;
  case "movie-this":
    getMovie(value);
    break;
  case "do-what-it-says":

    break;
  case "help":
    help();
    break;
  case "about":
    about();
    break;
}

// Functions
function help(){
  console.log(
`
Help File
---------------------------------------------------------------------------------------------------
LIRI is similar to SIRI in the fact that it can find out information for you. You can check songs, 
movies, define words, check the weather, and check your twitter feed. I will be adding more skills 
later on. But enjoy your experience with LIRI.

Here is how to use LIRI:
---------------------------------------------------------------------------------------------------

When you run the liri.js file using the console. You just have to type the following into the
terminal:

liri.js <ACTION> <ARGUMENTS>

IMPORTANT ---- If you pass in an any arguments that have multple words (eg. Bad Blood or Shawshank 
Redemption) surround them with quotations (eg. "Bad Blood" or "Shawshank Redemption"). Otherwise
on the first word will be searched (eg. Bad or Shawshank)

The <ACTION> is what you need it to do, and the <ARGUMENTS> are the parameters that you need to 
pass to LIRI to get what you are looking for. The <ARGUMENTS> will change determine on what you are
looking for.

Examples:

node liri.js get-tweets
  This will return your last 20 tweets that you have tweeted.

node liri.js spotify-this-song "Galway Girl"
  This will return the song titled Galway Girl and will also give the artist, album, and a URL that
  will give you a 30 second preview of the song.

node liri.js movie-this Cinderella
  This will return a movie with the title Cinderella and give you a quick synopsis of the movie and 
  a link where there to find out more information about the movie.
`); // end template string
} // end help()

function about(){
  console.log(
`
Welcome to LIRI bot 
Version 1.0.0
  -by Corey Stagner

`); // end template string
} // end about()

function log(input){
  console.log(input);
  fs.appendFile("log.txt",(input + `\n`));
} //end log()

function getTweets(){
  fs.appendFile("log.txt", ("-------- Log Entry --------\n" + Date() + "\n" + "User used getTweets()\n"));
  feed.get('statuses/user_timeline', userTwitter, function(err, tweets,response){
    if(err){
      return log(err);
    }// end if()

    if(response.statusCode === 200) {
      for(i = 0; i < tweets.length; i++){
        var counter = i + 1;
        var text = tweets[i].text;
        var time = tweets[i].created_at;
        log(`Tweet ${counter}: At ${time} you tweeted "${text}"`)
      } // end for()
    } // end if
  }); //end feed
} //end getTweets()

function getSong(input){
  fs.appendFile("log.txt", ("-------- Log Entry --------\n" + Date() + "\n" + "User used getSong()\n"));
  var valType = "track";
  var song = input;

  if(input == null) {
    song = "The Sign";
  }

  spotify.search({ type:valType, query:song}, function(err, data){
    if (err){
      log("Error Occurred: " + err);
    } else {
      var response = data.tracks.items[0];
      var artist = response.artists[0].name;
      var title = response.name;
      var album = response.album.name;
      var url = response.preview_url;
      log(`You searched Spotify for: ${song}
---As I scoured the intrawebs, here is what I found---
The song ${song} was performed by ${artist}.
${artist} released this song on the album "${album}".
You can listen to ${song} here - ${url}`);
    }
  }); // end spotify.search()
} // end spotifySong()

function getMovie(input){
  fs.appendFile("log.txt", ("-------- Log Entry --------\n" + Date() + "\n" + "User used getMovie()\n"));
  var requestedMovie = input;
  request(`http://www.omdbapi.com/?t=${requestedMovie}&y=&plot=short&apikey=40e9cece`, function(err, response, body) {
    if (!err && response.statusCode === 200) {
      var data = JSON.parse(body);
      var title = data.Title;
      var year = data.Year;
      var rated = data.Rated;
      var imdbRating = data.Ratings[0].value;
      var rottenRating = data.Ratings[1].value;
      var country = data.Country;
      var language = data.Language;
      var plot = data.Plot;
      var actors = data.Actors;
      var url = data.Website;
      log(`You have searched for ${requestedMovie} and here is what I have found:
${title} (${rated}) was released in ${year}.
This movie was released in ${country} in ${language} and featured ${actors}.
A quick plot of the film is:
  ${plot}

Critic Ratings for ${title}:
  IMDB: ${imdbRating}
  Rotten Tomatoes: ${rottenRating}

To learn more about this film you can visit 
  ${url}`);
    } // end if()
  }); // end request()
} // end getMovie()














// Sandbox

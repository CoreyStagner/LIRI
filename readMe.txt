Help File
---------------------------------------------------------------------------------------------------
LIRI is similar to SIRI in the fact that it can find out information for you. You can check songs, 
movies, define words, check the weather, and check your twitter feed. I will be adding more skills 
later on. But enjoy your experience with LIRI.

Here is how to use LIRI:
---------------------------------------------------------------------------------------------------

When you run the liri.js file using the console. You just have to type the following into the
terminal:

node liri.js <ACTION> <ARGUMENTS>

node liri.js prompt
node liri.js my-tweets
node liri.js spotify-this-song <ARGUMENTS>
node liri.js movie-this <ARGUMENTS>
node liri.js get-weather <ARGUMENTS>
node liri.js count-to <ARGUMENTS>
node liri.js do-what-it-says

IMPORTANT ---- If you pass in an any arguments that have multple words (eg. Bad Blood or Shawshank 
Redemption) surround them with quotations (eg. "Bad Blood" or "Shawshank Redemption"). Otherwise
on the first word will be searched (eg. Bad or Shawshank)

The <ACTION> is what you need LIRI to do, and the <ARGUMENTS> are the parameters that you need to 
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
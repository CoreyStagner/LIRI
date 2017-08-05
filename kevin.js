var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");

var action = process.argv[2];
var value = process.argv[3];
var spotify = new Spotify(keys.spotifyKeys);


switch (action) {
    case "spotify-this-song":
    case "spotify":
    case "spotify-this":
        getSong(value);
        break;
} // end switch

function getSong(input) {
    fs.appendFile("log.txt", ("-------- Log Entry --------\n" + Date() + "\n" + "User used getSong()\n"));
    var valType = "track";
    var song = input;

   if (input == null) {
        song = "The Sign";
    }

    spotify.search({ type: 'track', query: song }, function(err, data) {
if (err){
      console.log("Error Occurred: " + err);
    } else {
        console.log(JSON.stringify(data, null, 2));
//       var response = data.tracks.items[0];
//       var artist = response.artists[0].name;
//       var title = response.name;
//       var album = response.album.name;
//       var url = response.preview_url;
//       console.log(`You searched Spotify for: ${song}
// ---As I scoured the intrawebs, here is what I found---
// The song ${song} was performed by ${artist}.
// ${artist} released this song on the album "${album}".
// You can listen to ${song} here - ${url}`);
};
 }) // end getSong()
}
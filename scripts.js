var quoteLibrary = [
  ["A ship in harbor is safe, but that is not what ships are built for.", "Anonymous"],
  ["The dangerous man is the one who has only one idea, because he'll fight and die for it. The way real science goes is that you come up with lots of ideas, and most of them will be wrong.", "Francis Crick"],
  ["Everyone wants to live on top of the mountain, but not very many want to climb to get there", "Anonymous"],
  ["Terrible ideas, reprehensible ideas, do not disappear if you ban them, they go underground. They acquire a kind of glamour of taboo. In the harsh light of day, they are out there and, like vampires, they die in the sunlight", "Salmon Rushdie"],
  ["The shackles that hold us down aren't really staked to the ground, so shake them off and watch them disappear", "Larry, and His Flask"],
  ["It's your adventure.", "Mates"],
  ["The difference between ordeal and adventure is attitude","Anonymous"],
  ["Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.", "Martin Luther King, Jr."],
  ["Fish on!", "Hoyt"],
  ["Keep your rod tip up!", "Hoyt"],
  ["Stay tight!", "Hoyt"]
];

var RQG = function() {
  var quotes =[]; // array of quotes
  var recentQuotesIndexes = []; // array of 3 recent indexes

  this.logAllQuotes = function() {
    for (x in quotes) {
      console.log(quotes[x]);
    }
  };

  this.logAllRecentIndexes = function() {
    if (recentQuotesIndexes.length > 0) {
      console.log(recentQuotesIndexes);
      return true;
    } else {
      console.log("There are no recent quotes");
      return false;
    }
  };

  this.addQuotes = function(arr) {
    // arr = [[quote,author], [x , y], ...]
    console.log("# old quotes: " + quotes.length);

    for (x in arr) {
      quotes.push(arr[x]);
      console.log("Pushed: " + arr[x][0] + " -"+arr[x][1]);
    }

    console.log("# quotes after adding "+ arr.length + " more: " + quotes.length);
  };

  this.randomIndex = function() {
    var randomI = Math.floor(Math.random() * quotes.length);
    return randomI;
  };

  // Returns a JSON object with quote and author
  this.getRandomQuote = function() {
    var i = this.randomIndex();
    while (recentQuotesIndexes.includes(i)) {
      i = this.randomIndex();
      console.log("Duplicate Quote");
    }
    if (recentQuotesIndexes.length > 2){
      var shifted = recentQuotesIndexes.shift();
      //console.log("Shifted: " + shifted);
    }
    this.recentQuotesIndexes = recentQuotesIndexes.push(i);
    //console.log("Pushed: " + i);
    console.log(this.recentQuotesIndexes);
    return {
      "quote": quotes[i][0],
      "author": quotes[i][1]
    };
  };
};

var RQG = new RQG();
RQG.addQuotes(quoteLibrary);
var quote = RQG.getRandomQuote();

$('document').ready( function() {
  $bucket = $('.quote-bucket');
  $bucket.html(quote["quote"]);
  $author = $('.quote-author');
  $author.html(quote["author"]);
  $('.new-quote').on('click', function() {
    quote = RQG.getRandomQuote();
    console.log(RQG.logAllRecentIndexes());
    $bucket.html(quote["quote"]);
    $author.html(quote["author"]);
  })
});

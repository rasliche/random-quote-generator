var quoteLibrary = [
  ["A ship in harbor is safe, but that is not what ships are built for.", "Anonymous"],
  ["The dangerous man is the one who has only one idea, because he'll fight and die for it. The way real science goes is that you come up with lots of ideas, and most of them will be wrong.", "Francis Crick"],
  ["Everyone wants to live on top of the mountain, but not very many want to climb to get there.", "Anonymous"],
  ["Terrible ideas, reprehensible ideas, do not disappear if you ban them, they go underground. They acquire a kind of glamour of taboo. In the harsh light of day, they are out there and, like vampires, they die in the sunlight.", "Salmon Rushdie"],
  ["The shackles that hold us down aren't really staked to the ground, so shake them off and watch them disappear.", "Larry, and His Flask"],
  ["It's your adventure.", "Mates"],
  ["The difference between ordeal and adventure is attitude.","Anonymous"],
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

  // This is code from twitter's website
  // It is basically just intercepting click
  // events by adding a listener to 'document'
  // and then checking to see if the clicked
  // element was <a>. If it was, and the href
  // attribute was targeting the twitter domain
  // with the Web Intent URL, it creates a new
  // window and complete's the request there.
  (function() {
  if (window.__twitterIntentHandler) return;
  var intentRegex = /twitter\.com\/intent\/(\w+)/,
      windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
      width = 550,
      height = 420,
      winHeight = screen.height,
      winWidth = screen.width;

  function handleIntent(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        m, left, top;

    while (target && target.nodeName.toLowerCase() !== 'a') {
      target = target.parentNode;
    }

    if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
      m = target.href.match(intentRegex);
      if (m) {
        left = Math.round((winWidth / 2) - (width / 2));
        top = 0;

        if (winHeight > height) {
          top = Math.round((winHeight / 2) - (height / 2));
        }

        window.open(target.href, 'intent', windowOptions + ',width=' + width +
                                           ',height=' + height + ',left=' + left + ',top=' + top);
        e.returnValue = false;
        e.preventDefault && e.preventDefault();
      }
    }
  }

  if (document.addEventListener) {
    document.addEventListener('click', handleIntent, false);
  } else if (document.attachEvent) {
    document.attachEvent('onclick', handleIntent);
  }
  window.__twitterIntentHandler = true;
}()); // End Twitter code

  // Function to build a URL given some text to quote and tweet out

  var buildURL = function(quoteText) {
    var urlBase = "https://twitter.com/intent/tweet?";
    var text = "text=" + encodeURIComponent('"'+quoteText+'"');
    var via = "&via=rasliche";
    var url = "&" + encodeURIComponent("http://rasliche.github.io/random-quote-generator/");
    return urlBase+text+via+url;
  };

  $tweet = $('.twitter-share-button');
  $bucket = $('.quote-bucket');
  $bucket.html(quote["quote"]);
  $author = $('.quote-author');
  $author.html(quote["author"]);
  $tweet.attr( "href", buildURL(quote["quote"]));
  $('.new-quote').on('click', function() {
    quote = RQG.getRandomQuote();
    console.log(RQG.logAllRecentIndexes());
    $bucket.html(quote["quote"]);
    $author.html(quote["author"]);
    $tweet.attr( "href", buildURL(quote["quote"]));
    console.log(buildURL(quote["quote"]));
  })
});

'use strict';

var articles = [];


function Article (rawDataObject) {
  this.title = rawDataObject.title;
  this.category = rawDataObject.category;
  this.author = rawDataObject.author;
  this.authorUrl = rawDataObject.authorUrl;
  this.pubDate = rawDataObject.pubDate;
  this.body = rawDataObject.body;
}




Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  console.log();
  $newArticle.removeClass('.template');

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.data('category', this.category);

  /* TODO: Now use jQuery traversal and setter methods to fill in the rest
  of the current template clone with properties from this particular Article instance.
  We need to fill in:
    1. author name,
    2. author url,
    3. article title,
    4. article body, and
    5. publication date. */

// var h1= $( ".template" ).append( "<h1>" );

  $newArticle.find('h1').html(this.title);
  $newArticle.find('address a').attr('href',this.authorUrl);
  $newArticle.find('time').attr('pubdate datetime', this.pubDate);
  $newArticle.find('.article-body').text(this.title);
// $title = $('h1')
// $header
// $
// $title.html(this.title,)
  // Display the date as a relative number of 'days ago'



  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(articleObject) {
  // REVIEW: Take a look at this forEach method; This may be the first time we've seen it.
  articles.push(new Article(articleObject));
});

articles.forEach(function(article) {
  $('#articles').append(article.toHtml());
});

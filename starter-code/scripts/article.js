'use strict';

var articles = [];

function Article (rawDataObject) {
  this.title = rawDataObject.title;
  this.category = rawDataObject.category;
  this.author = rawDataObject.author;
  this.authorUrl = rawDataObject.authorUrl;
  this.publishedOn = rawDataObject.publishedOn;
  this.body = rawDataObject.body;
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  console.log();
  $newArticle.removeClass('template');

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.data('category', this.category);
  $newArticle.find('h1').html(this.title);
  $newArticle.find('address a').attr('href',this.authorUrl);
  $newArticle.find('a').html(this.author);
  $newArticle.find('.article-body').html(this.body);
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

rawData.forEach(function(articleObject) {
  articles.push(new Article(articleObject));
});

articles.forEach(function(article) {
  $('#articles').append(article.toHtml());
});

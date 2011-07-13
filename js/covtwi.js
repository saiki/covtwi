var cf = null;
var slugs = new Array();
$(function() {
	cf = new ContentFlow("contentFlow");
	$.ajaxSetup({
		error: function(request, textStatus, error) {
			console.log("error at ajax response");
			console.log(this);
			console.log(request);
			console.log(textStatus);
			console.log(error);
		}
	});
	$("#tweet").hide();
  /*
	for (i = 0; i < slugs.length; i++) {
		if (i == 0) {
			loadsuggestions(slugs[i]);
		}
	}
  */
});
function wraploadsuggestions(json) {
	$.each(json, function(key, category) {
		slugs.push(category.slug);
    loadsuggestions(category.slug);
	});
}
function publictimelinecallback(json) {
	for (i = 0; i < json.length; i++) {
		var tweet = json[i];
		var imgUrl = tweet.user.profile_image_url;
		var name = tweet.user.screen_name;
		var userId = tweet.user.id;
		var item = document.createElement("div");
		item.setAttribute("class", "item");
		item.setAttribute("href", "javascript:itemclick("+userId+");void(0);");
		var content = document.createElement("img");
		content.setAttribute("class", "content");
		content.setAttribute("src", imgUrl);
		var caption = document.createElement("div");
		caption.setAttribute("class", "caption");
		caption.appendChild(document.createTextNode(name));
		item.appendChild(content);
		item.appendChild(caption);
		cf.addItem(item, "last");
	}
}
function loadsuggestions(slug) {
	var url = "http://api.twitter.com/1/users/suggestions/"+slug+".json";
  $.getJSON(url, suggestionscallback);
}
function suggestionscallback(json, textStatus, jqXHR) {
	for (i = 0; i< json.users.length; i++) {
		var user = json.users[i];
		var imgUrl = user.profile_image_url;
		var name = user.screen_name;
		var userId = user.id;
		var item = document.createElement("div");
		item.setAttribute("class", "item");
		item.setAttribute("href", "javascript:itemclick("+userId+");void(0);");
		var content = document.createElement("img");
		content.setAttribute("class", "content");
		content.setAttribute("src", imgUrl);
		var caption = document.createElement("div");
		caption.setAttribute("class", "caption");
		caption.appendChild(document.createTextNode(name));
		item.appendChild(content);
		item.appendChild(caption);
		cf.addItem(item, "last");
	}
}
function usertlcallback(json) {
	for (i = 0; i < json.length; i++) {
		var tweet = json[i];
		if (i%2==0) {
			clazz = "on";
		} else{
			clazz = "off";
		}
		$("#tweet div.list").append($("<div/>").addClass(clazz)
			.append($("<a/>").attr("href", "http://twitter.com/#!/"+tweet.user.screen_name+"/status/"+tweet.id_str)
			.attr("target", "_blank")
			.text(tweet.text)));
	}
	$("#tweet").show();
}
function itemclick(userId) {
	$("#tweet div.list").empty();
	$.getScript("http://api.twitter.com/1/statuses/user_timeline.json?user_id="+userId+"&callback=usertlcallback");
}

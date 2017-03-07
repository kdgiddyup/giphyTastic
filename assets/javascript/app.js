$(document).ready(function(){
$("#addComics").on("click",function(event){
	event.preventDefault(); 
	addComic()
});
var comics = ['Robin Williams','Brian Regan','Whoopie Goldberg','Jim Gaffigan','Richard Pryor','Jerry Seinfeld','Julia-Louise Dreyfus','Ellen DeGeneres','Marc Maron','Chris Rock'];
renderButtons();

function renderButtons(){
	$("#buttonsArea").empty();
	$(comics).each(function( index ){
		$("#buttonsArea").append('<button class="btn btn-primary comicsButton">'+comics[index]+'</button>')
	});
	$(".comicsButton").on("click",renderImages)
}

function renderImages(){
	$("#imagesArea").empty();
	queryURL = 'http://api.giphy.com/v1/gifs/search?q='+encodeURI($(this).text())+'&limit=10&api_key=dc6zaTOxFJmzC';
	$.ajax({
    method: "GET",
    url: queryURL,
    }).done( function( response ){
    	$(response.data).each( function( index ){
    		var imageBlock = $("<div class=\"imagesBlock\"><img class=\"still\" src=\""+response.data[index].images.fixed_height_still.url+"\" data-still=\""+response.data[index].images.fixed_height_still.url+"\" data-animated=\""+response.data[index].images.fixed_height.url+"\"/><p>Rating: "+response.data[index].rating+"</p></div>");
    		$("#imagesArea").append(imageBlock);
    		$(imageBlock).on("click",toggleState)
    	})		
    }) // end ajax done callback
}

function toggleState() {
	var thisGif = $(this).children('img');

	if (thisGif.hasClass('animated')) {
		thisGif.toggleClass('animated');
		thisGif.attr("src",thisGif.attr('data-still'))
	}
	else {
		thisGif.toggleClass('animated');
		thisGif.attr("src",thisGif.attr('data-animated'))
	}
}

function addComic() {
	if ($("#addComicText").val() != '') {
		comics.push($("#addComicText").val());
		renderButtons()
	}
		
}
}); // end of document ready
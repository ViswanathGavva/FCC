$(document).ready(function(){
	
	$('input.typeahead').typeahead({
	    source:  function (query, process) {
		
		return $.ajax({
			type: "GET",
			url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+query+"&callback=?",
			contentType: "application/json; charset=utf-8",
			async: false,
			dataType: "json",
			success: function (data, textStatus, jqXHR) {
			if(data && data.query && data.query.pages){
				var dt = [];
				console.log(data.query.pages);
				//DOM manipulation
				console.log(data);
				$.each(data.query.pages,function(index,page){
				dt.push(page.title);
				});
				
        		//data = $.parseJSON(data.query.pages);
	            return process(dt);  
				}
			},
			error: function (errorMessage) {
			}
		});
		
	    }
	});
	
	
	
	
	$('#custom-search-form').submit(function(e){
	var searchStr = $('#searchStr').val();
		$.ajax({
			type: "GET",
			url: "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+searchStr+"&callback=?",
			contentType: "application/json; charset=utf-8",
			async: false,
			dataType: "json",
			success: function (data, textStatus, jqXHR) {
				console.log(data.query.pages);
				//DOM manipulation
				var UL = $('#results');
				var link="https://en.wikipedia.org/?curid=";
				var pages= data.query.pages;
				console.log(pages.length);
				$('#results').empty();
				$.each(pages,function(index,page){
					$('#results').append(
						$('<li>').append(
							$('<a>').attr('href',link+page.pageid).attr('target','_blank').append(
								$('<h4>').attr('class', 'tab').append(page.title)).append(
									$('<span>').attr('class','tab').append(page.extract)
								)
								));
				});
				  
			},
			error: function (errorMessage) {
			}
		});
		e.preventDefault();
	});
    
});
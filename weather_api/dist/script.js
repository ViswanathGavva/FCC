$(document).ready(function(){
	//initialize();
	//get the lat and lang.
	var geocoder;
	var address='';
	var city='';
	var apikey = '6a3c685f4b195b101d7e7d0fc552679f';
	var tempC,tempF,flag='C';
	/*
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
	} 
	//Get the latitude and the longitude;
	function successFunction(position) {
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		//once we get lat and lang, call openweather API with the details.
		callAPI(lat, lng);
	}

	function errorFunction(){
		alert("Geocoder failed");
	}*/
	getLoc = function() {
	return $.ajax({
			type: "GET",
			url: "http://ipinfo.io/json?callback=?",
			contentType: "application/json; charset=utf-8",
			async: false,
			dataType: "json",
			success: function (data, textStatus, jqXHR) {
				console.log(data.city,data.country);
				callAPI(data.city,data.country);
			},
			error: function (errorMessage) {
			console.log(errorMessage);
			}
	});
	};
	getLoc();
	function callAPI(city,country){
		$.ajax({
			type: "GET",
			//http://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b1b15e88fa797225412429c1c50c122a1
			//url: "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lang+"&appid="+apikey+"callback=?",
			url: "http://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&APPID="+apikey+"&callback=?",
			contentType: "application/json; charset=utf-8",
			async: false,
			dataType: "json",
			//jsonpCallback:"success",
			success: function (data, textStatus, jqXHR) {
				console.log(data);
				//DOM manipulation
				tempC = Math.round(data.main.temp);
				$('#curtemp').html('<em>'+tempC+'</em>° C');
				tempF = Math.round( (tempC * 9)/5 + 32 );
				flag ='C';
				//$('#curtemp').html('<em>'+tempF+'</em>° F');
				$('#city').html('<em>'+city+',</em>'+country);
				setIcon(data.weather[0].main);
			},
			error: function (errorMessage) {
			console.log(errorMessage);
			}
		});
	}
	function setIcon(cond){
	
	switch(cond){
		case 'clear':$('#icn').removeClass().addClass('wi wi-day-sunny');
		break;
		case 'dizzle':$('#icn').removeClass().addClass('wi wi-day-showers');
		break;
		case 'clouds':$('#icn').removeClass().addClass('wi wi-day-cloudy');
		break;
		case 'rain':$('#icn').removeClass().addClass('wi wi-day-rain');
		break;
		case 'snow':$('#icn').removeClass().addClass('wi wi-day-snow-wind');
		break;
		default:$('#icn').removeClass().addClass('wi wi-day-sunny');
		break;
	}
	}
	$('#switch').on('click',function(e){
		if(flag==='C'){
			$('#curtemp').html('<em>'+tempF+'</em>° F');
			flag = 'F';
		}else if(flag==='F'){
			$('#curtemp').html('<em>'+tempC+'</em>° C');
			flag='C';
		}
		
		
		e.preventDefault();
	});
	
	//getLoc.success(function(data){
	//console.log(data);
	//});
	
	
    
});
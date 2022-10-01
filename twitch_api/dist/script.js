var app = angular.module('twitchApp',[]);

app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://wind-bow.gomix.me/twitch-api/streams/**'
  ]);

  // The blacklist overrides the whitelist so the open redirect here is blocked.
  
});


app.factory('twitchService',['$http','$q','$sce',function($http,$q,$sce){
  //array of channels we want to show in our App.	
  var channels =["freecodecamp","ESL_SC2","OgamingSC2", "comster404" ,"cretetion", "storbeck","brunofin", "habathcx", "RobotCaleb", "noobs2ninjas"];
  //API call(s)
  //var apiUrl = 'https://api.twitch.tv/kraken/streams/test_channel';
  var apiUrl = 'https://wind-bow.gomix.me/twitch-api/streams/';
  var channelData=[];
  
  channels.forEach(function(channel){
	var url = apiUrl+channel;
	//$sce.trustAsResourceUrl(url);
	var resp = $http.jsonp(url,{jsonpCallbackParam: 'callback'}).then(function(response){
			console.log(response.data);
			var data = response.data;
			if(data.stream !== null){
				//channel is online.
				channelData.push({"channel":channel,"status":"online","image":data.stream.channel.logo,"details":data.stream.game,"url":data.stream.channel.url});
			}else{
				//channel is offline
				channelData.push({"channel":channel,"status":"offline","image":"http://static-cdn.jtvnw.net/jtv_user_pictures/test_channel-profile_image-94a42b3a13c31c02-300x300.jpeg","details":null,"url":"https://www.twitch.tv/"+channel});
			}
			//channelData.push(data);
	},function(error){
		channelData.push({"channel":channel,"status":"offline","image":"http://static-cdn.jtvnw.net/jtv_user_pictures/test_channel-profile_image-94a42b3a13c31c02-300x300.jpeg","details":null,"url":"https://www.twitch.tv"+channel});
	}); 
  });

  
  
  // populate Data from API call using JSONP.
  //Mock data
  /*var mockData =  [{"channel":"freecodecamp",
				   "stream": {
						"game": "StarCraft II: Heart of the Swarm",
						"viewers": 2123,
						"logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/test_channel-profile_image-94a42b3a13c31c02-300x300.jpeg"
						},
				   "_links": {
						"self": "https://api.twitch.tv/kraken/streams/test_channel",
						"channel": "https://api.twitch.tv/kraken/channels/test_channel"
					  }
				  },
				  {"channel":"ESL_SC2",
				   "stream": {
						"game": "StarCraft II: Heart of the Swarm",
						"viewers": 2123,
						"logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/test_channel-profile_image-94a42b3a13c31c02-300x300.jpeg"
						},
				   "_links": {
						"self": "https://api.twitch.tv/kraken/streams/test_channel",
						"channel": "https://api.twitch.tv/kraken/channels/test_channel"
					  }
					},
				{"channel":"OgamingSC2",
					  "stream": {
						"game": "StarCraft II: Heart of the Swarm",
						"viewers": 2123,
						"logo":"http://static-cdn.jtvnw.net/jtv_user_pictures/test_channel-profile_image-94a42b3a13c31c02-300x300.jpeg"
						},
					  "_links": {
						"self": "https://api.twitch.tv/kraken/streams/test_channel",
						"channel": "https://api.twitch.tv/kraken/channels/test_channel"
					  }
				},
				{"channel":"comster404",
					  "stream": null,
					  "_links": {
						"self": "https://api.twitch.tv/kraken/streams/test_channel",
						"channel": "https://api.twitch.tv/kraken/channels/test_channel"
					  }
				}
				  ];
	//To do: Get the API data and convert into the below format.			  
  var channelData = [{"channel":"freecodecamp","status":"online","image":"http://static-cdn.jtvnw.net/jtv_user_pictures/test_channel-profile_image-94a42b3a13c31c02-300x300.jpeg","details":"StarCraft II: Heart of the Swarm","url":"https://twitch.tv"},
					  {"channel":"comster404","status":"offline","image":"http://static-cdn.jtvnw.net/jtv_user_pictures/test_channel-profile_image-94a42b3a13c31c02-300x300.jpeg","details":null,"url":"https://twitch.tv"},
					  {"channel":"cretetion","status":"online","image":"http://static-cdn.jtvnw.net/jtv_user_pictures/test_channel-profile_image-94a42b3a13c31c02-300x300.jpeg","details":"StarCraft II: Heart of the Swarm","url":"https://twitch.tv"},
					  {"channel":"OgamingSC2","status":"online","image":"http://static-cdn.jtvnw.net/jtv_user_pictures/test_channel-profile_image-94a42b3a13c31c02-300x300.jpeg","details":"StarCraft II: Heart of the Swarm","url":"https://twitch.tv"},
					  {"channel":"brunofin","status":"offline","image":"http://static-cdn.jtvnw.net/jtv_user_pictures/test_channel-profile_image-94a42b3a13c31c02-300x300.jpeg","details":null,"url":"https://twitch.tv"},
  ]*/
  getData = function(){
    return channelData;
  }
  return {
	 fetchData : getData
  };
}]);

app.filter('stat',[function() {
   return function(dataArr,stat) {
     var op = dataArr.filter(function(ele) {
          return (ele.status === stat);
      });
	  return op;
   };
}]);

app.controller('MainCtrl',['$scope','$http','twitchService','statFilter',function($scope,$http,twitchService,statFilter){
  $scope.Name = "TWITCH";
  $scope.channelData =[];
  
  $scope.fetchData = function(){
    $scope.channelData = twitchService.fetchData();
  }
  
  $scope.onlineData=function(){
	$scope.olData =   statFilter($scope.channelData,'online');
  }
  
  $scope.offlineData=function(){
	$scope.oflData =  statFilter($scope.channelData,'offline'); 
  }
  $scope.fetchData();
  
}]);
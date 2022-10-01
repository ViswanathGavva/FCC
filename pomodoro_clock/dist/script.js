var app = angular.module('pomodoroClock',[]);

app.controller('MainCtrl',['$scope','$interval',function($scope,$interval){
  $scope.clockLen=25;
  $scope.breakLen=1;
  
  //display vars.
  $scope.dMin=($scope.clockLen>9)?$scope.clockLen:"0"+$scope.clockLen;
  $scope.dSec="00";
  
  $scope.dbMin=($scope.breakLen>9)?$scope.breakLen:"0"+$scope.breakLen;
  $scope.dbSec="00";
  
  //reset vars
  $scope.resetClock = false;
  $scope.resetBreak = false;
  
  $scope.modCounter = function(counter,op){
	  switch(counter){
		  case "clock": 
			  if(op ==='+'){
				  $scope.clockLen += ($scope.clockLen<25)?1:0;
			  }else if(op ==='-'){
				  $scope.clockLen -= ($scope.clockLen>1)?1:0;
			  }
			break;
		  case "break":
			  if(op ==='+'){
				  $scope.breakLen += ($scope.breakLen<25)?1:0;
			  }else if(op ==='-'){
				  $scope.breakLen -= ($scope.breakLen>1)?1:0;
			  }
		    break;
		  default:
			break;
	  }
  }
  $scope.startClock = function(){
	  $scope.resetClock = false;
	 $scope.clockClass="active";  
	 var m = $scope.clockLen-1;
	 var s = 60;
	 var totalSec = ($scope.clockLen*60)-1;
	 var repeater = $interval(function(){
			if(totalSec>=0 && !$scope.resetClock){
				//get the min and sec and display.
				if(s>=1){
					m = m;
					s-=1;
				}else{
					m-=1;
					s=59;
				}
				$scope.dMin = (m>9)?m:"0"+m;
				$scope.dSec = (s>9)?s:"0"+s;
				//decrease the counter
				totalSec-=1;
			}else{
				//cancel the counters.
				$interval.cancel(repeater);
				// start the break counter.
				if(!$scope.resetBreak){
					startBreak();
				}
					
			}
		},1000);
  }
  function startBreak(){
	  $scope.resetBreak = false;
	  $scope.breakClass="active";  
	var m = $scope.breakLen-1;
	var s = 60;
	var totalSec = ($scope.breakLen*60)-1;
	var repeater = $interval(function(){
			if(totalSec>=0 && !$scope.resetBreak){
				//get the min and sec and display.
				if(s>=1){
					m = m;
					s-=1;
				}else{
					m-=1;
					s=59;
				}
				$scope.dbMin = (m>9)?m:"0"+m;
				$scope.dbSec = (s>9)?s:"0"+s;
				//decrease the counter
				totalSec-=1;
			}else{
				//cancel the counters.
				$interval.cancel(repeater);
			}
		},1000);
	  
  }
  $scope.reset = function(){
    $scope.resetClock = true;
	$scope.resetBreak = true;
	$scope.breakClass=""; 
	$scope.clockClass=""; 
	$scope.dMin="00";
    $scope.dSec="00";
    $scope.dbMin="00";
    $scope.dbSec="00";
  }
  $scope.pause = function(){
    $scope.resetClock = true;
	$scope.resetBreak = true;
	$scope.breakClass=""; 
	$scope.clockClass=""; 
	$scope.dMin="00";
    $scope.dSec="00";
    $scope.dbMin="00";
    $scope.dbSec="00";
  }
  
  
  
  
}]);
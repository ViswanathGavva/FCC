var app = angular.module('simonApp', []);

app.controller('MainCtrl', ['$scope','$timeout','$interval', function($scope,$timeout,$interval) {
  //initilize variables.
  $scope.title = "SIMON Game";
  $scope.result = "--";
  $scope.machineCount = 1;
  $scope.userCount =0;
  $scope.strictMode = false;
  $scope.streakOn = true;
  $scope.userSeq="";
  $scope.compSeq="";
  $scope.maxLevel=20;
  //variables for durations of button press and release.
  $scope.relaseAfter=500;
  $scope.pressAfter=1000;
  //variables for start/reset buttons.
  $scope.startBtnClass="btn active";
  $scope.resetBtnClass="btn active";
  //disable all the buttons on load.
  $scope.rClass='btn disabled';
  $scope.gClass='btn disabled';
  $scope.bClass='btn disabled';
  $scope.yClass='btn disabled';
  
  
  
  //start the game.
  $scope.startGame = function() {
	  //this is the flag that the streak goes on.
	  $scope.streakOn=true;
	  //make the start button disabled.
	  $scope.startBtnClass="btn disabled";
	  //make the reset button active
	  $scope.resetBtnClass="btn active";
	  //make the machineEntry. count is the number of button presses we should mimik. starts with 1.
	  makeMachineEntry($scope.machineCount,'success');
  }
  
  //this function mimics the button presses by changing the classes of buttons and playing the tones.
  function makeMachineEntry(machineCount,mode){
	if($scope.streakOn){
		//get random sequence to press buttons.  
		if(mode ==='success'){
			$scope.compSeq = selectRandom($scope.machineCount);
		}else{
		$scope.compSeq = ($scope.compSeq == "" || $scope.strictMode) ? selectRandom($scope.machineCount):$scope.compSeq;
		}
		
		//loop through the sequence to press button with an interval.
		var i=0;
		var repeater = $interval(function(){
			if(i<$scope.compSeq.length){
				pressButton($scope.compSeq[i]);
				playAudio($scope.compSeq[i]);
				$interval(releaseButton,$scope.relaseAfter,true,$scope.compSeq[i]);
				i+=1;
			}else{
				// make the buttons clickable. and break the loop of timeouts by cancel method.
				$scope.rClass = "btn";
				$scope.gClass = "btn";
				$scope.bClass = "btn";
				$scope.yClass = "btn";
				$interval.cancel(repeater);
			}
		},$scope.pressAfter);
		
		
	}
	  
  }
  //this function gets called when user presses a button.
  $scope.makeEntry = function(val){
		//press the button. here we dont need to keep the button in pressed state for long.
		pressButton(val);
		//play the beep.
		playAudio(val);
		$interval(releaseButton,500,true,val);
		
		$scope.userSeq += val;
		//validate userSeq on each button click by user.
		if(validateInstant()){
			//success. continue with making entries.
			$scope.userCount+=1;
			$scope.result = 'Correct!';
			
		}else{
			//make buttons un clickable
			$scope.rClass = "btn disabled";
			$scope.gClass = "btn disabled";
			$scope.bClass = "btn disabled";
			$scope.yClass = "btn disabled";
			//failure.make userSeq null.
			$scope.userSeq = "";
			$scope.result = 'Wrong!!';
			$scope.userCount =0;
			//repeat the previous Machine entry.
			makeMachineEntry($scope.machineCount,'failure');
			//$interval(makeMachineEntry,500,true,$scope.machineCount,'failure');	
		}
		
		//this below condition is true when user enters all the button presseses correctly.
		// so we have to make buttons unclickable and reset the user counters
		// also we need to make a new Machine entry with machinecount+1
		if($scope.userCount===$scope.machineCount){
			//make buttons un clickable
			$scope.rClass = "btn disabled";
			$scope.gClass = "btn disabled";
			$scope.bClass = "btn disabled";
			$scope.yClass = "btn disabled";
			//reset user count and user entered string.
			$scope.userSeq = "";
			$scope.userCount=0;
			//if user reached Max level,
			if($scope.machineCount===$scope.maxLevel){
				$scope.result="You Won";
				//reset all the game variables.
				$scope.resetGame();
				
			}else{
				//increase Machine count. go to next level.
				//make machine entry.
				$scope.machineCount +=1;
				makeMachineEntry($scope.machineCount,'success');
				//$interval(makeMachineEntry,500,true,$scope.machineCount,'success');	
			}
		}
  }
  function playAudio(entry){
	  var audio;
	  switch(entry){
		  case "R":
		    audio = angular.element('#rPlayer');
			audio[0].play();
		    break;
		  case "B":
		    audio = angular.element('#bPlayer');
			audio[0].play();
		    break;
		  case "G":
		    audio = angular.element('#gPlayer');
			audio[0].play();
		    break;
		  case "Y":
		    audio = angular.element('#yPlayer');
			audio[0].play();
		    break;
		  default:
		  break;
	  }
	  
  }
  function validateEntry(){
	return $scope.compSeq === $scope.userSeq;
  }
  function validateInstant(){
	return ($scope.compSeq.indexOf($scope.userSeq)===0)
  }
  //this function resets the game after success or when user chooses to.
  $scope.resetGame=function(){
	$scope.machineCount = 1;
	$scope.userCount =0;
	$scope.strictMode = false;
	$scope.streakOn = true;
	$scope.userSeq="";
	$scope.compSeq="";
	$scope.startBtnClass="btn active";
	$scope.resetBtnClass="btn disabled";
  }
  
  //Mimik the press buttons by adding active class and inactive class.
  function pressButton(btn){
		switch(btn){
			case "R":
				$scope.rClass='btn active';
				/*$scope.gClass='btn disabled';
				$scope.bClass='btn disabled';
				$scope.yClass='btn disabled';*/
				break;
			case "G":
				/*$scope.rClass='btn disabled';*/
				$scope.gClass='btn active';
				/*$scope.bClass='btn disabled';
				$scope.yClass='btn disabled';*/
				break;
			case "B":
				/*$scope.rClass='btn disabled';
				$scope.gClass='btn disabled';*/
				$scope.bClass='btn active';
				/*$scope.yClass='btn disabled';*/
				break;
			case "Y":
				/*$scope.rClass='btn disabled';
				$scope.gClass='btn disabled';
				$scope.bClass='btn disabled';*/
				$scope.yClass='btn active';
				break;
			default: 
				$scope.rClass='btn disabled';
				$scope.gClass='btn disabled';
				$scope.bClass='btn disabled';
				$scope.yClass='btn disabled';
				break;
		}
	  
  }
  function releaseButton(btn){
		switch(btn){
			case "R":
				$scope.rClass='btn';
				break;
			case "G":
				$scope.gClass='btn';
				break;
			case "B":
				$scope.bClass='btn';
				break;
			case "Y":
				$scope.yClass='btn';
				break;
			default: 
				$scope.rClass='btn';
				$scope.gClass='btn';
				$scope.bClass='btn';
				$scope.yClass='btn';
				break;
		}
	  
  }
  
  //fetch a random sequence of buttons.
  function selectRandom(num){
    var pool =['R','G','B','Y'];
    var res ="";
    for(var i=0;i<num;i++){
      res += (pool[getRandome(0,3)]);
    }
    return res;
  }
  
  function getRandome(myMin, myMax) {
    return Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;
  }

}]);
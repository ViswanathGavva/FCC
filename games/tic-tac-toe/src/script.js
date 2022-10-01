var app = angular.module('titTacToe',[]);

app.controller('MainCtrl',['$scope','$interval',function($scope,$interval){
  $scope.mode='single';
  
  /*possible results
  M -- Machine wins
  U -- User wins
  D -- Draw
  */
  $scope.result='Start. Select X or O';
  
  //level =3 that is 3X3 matrix.
  $scope.level =3
  //winnable combos for a 3X3 game.
  var winCombos =getWinCombos(3);
  
  //user and machine default choice
  $scope.user ='X';
  $scope.machine='O';
  //show choice to users
  $scope.showChoice = true;
  //default values for all the buttons is null.
  $scope.userCount=0;
  $scope.machineCount=0;
  //start of the game both machine entries and user entries are null
  $scope.userEntry=[];
  $scope.machineEntry=[];
  //start of the game all the buttons available.
	  $scope.buttons=[1,2,3,4,5,6,7,8,9];
			$scope.btn1="";
			$scope.btn1check=false;
		
			$scope.btn2="";
			$scope.btn2check=false;
		
			$scope.btn3="";
			$scope.btn3check=false;
		
			$scope.btn4="";
			$scope.btn4check=false;
		
			$scope.btn5="";
			$scope.btn5check=false;
		
			$scope.btn6="";
			$scope.btn6check=false;
		
			$scope.btn7="";
			$scope.btn7check=false;
		
			$scope.btn8="";
			$scope.btn8check=false;
		
			$scope.btn9="";
			$scope.btn9check=false;
  
  
  //user makes choice
  $scope.makeChoice = function(val){
	  $scope.user = val;
	  $scope.machine = (val ==='X')?'O':'X';
	  $scope.showChoice = false;
	  $scope.result="progress";
  }
  
  
  //user/machine makes an entry
  $scope.makeEntry= function(val,madeBy){
	  var letter;
	  if(!madeBy){
		  madeBy = 'user';
	  }
	  if(madeBy =='user'){
		 $scope.userEntry.push(val);		 
		 letter = $scope.user;
		 makeLetter(val,letter);
		 $scope.userCount+=1;
		 if(ifWins('user',$scope.userEntry,$scope.userCount)){
			 $scope.result="You Won";
			 resetGame();
		 }else if(isDraw()){
			 $scope.result="Draw";
			 resetGame();
		 }else{
			 updateOptions('user',val);
			//make an entry from machine.
			makeMachineEntry(); 
		 }
		 
	  }else{
		 $scope.machineEntry.push(val);
		 letter = $scope.machine;
		 makeLetter(val,letter);
		 $scope.machineCount+=1;
		 if(ifWins('machine',$scope.machineEntry,$scope.machineCount)){
			 $scope.result="You Lost";
			 resetGame();
		 }else if(isDraw()){
			 $scope.result="Draw";
			 resetGame();
		 }else{
			 updateOptions('machine',val);
		 }
	  }
	
  }
  
  
  function makeMachineEntry(){
	 //get a button to press.
     //check if winnable option available
	 var avail = $scope.buttons;
	 //for each avail check if a winnable position possible.
	 var option =0;
	 var win = avail.some(function(val){
		 var e = $scope.machineEntry.slice(0);
		 e.push(val);
		 if(ifWins('machine',e,$scope.machineCount+1)){
			option = val; 
			return true;
		 }else{
			 return false;
		 }
		 
	 });
	 if(option ===0){
		 //check if defensive option available.
		 //for each avail check if a winnable option possible for user.
		 var def = avail.some(function(val){
		 var e1 = $scope.userEntry.slice(0);
		 e1.push(val);
		 if(ifWins('user',e1,$scope.userCount+1)){
			option = val; 
			return true;
		 }else{
			 return false;
		 }
		 
	 });
	 }
	 if(option ===0){
		 //get a random button press
		 option = avail[getRandome(0,avail.length-1)];
	 }
	 $scope.makeEntry(option,'machine'); 
	  
  }
  
 function ifWins(player,entry,count){
	 //var count = (player==='user')?$scope.userCount:$scope.machineCount;
	 //var entry = (player === 'user')?$scope.userEntry:$scope.machineEntry;
	if(count >=3){
		var result = winCombos.some(function(combo){
			var search = combo.every(function(val){
						return (entry.indexOf(val)>=0);
					});
			return search;
			
		});
		return result;
		
	}else{
		return false;
	} 
 } 
 
 function ifMachineWins(){
	if($scope.machineCount >=3){
		
	}else{
		return false;
	}
	 
 }
 
 function isDraw(){
	 return $scope.buttons.length<=0;
 }
 
function resetGame(){
	  //$scope.result='M';
	  
	  //user and machine default choice
	  $scope.user ='X';
	  $scope.machine='O';
	  //show choice to users
	  $scope.showChoice = true;
	  //default values for all the buttons is null.
	  $scope.userCount=0;
	  $scope.machineCount=0;
	  //start of the game both machine entries and user entries are null
	  $scope.userEntry=[];
      $scope.machineEntry=[];
	  //start of the game all the buttons available.
	  $scope.buttons=[1,2,3,4,5,6,7,8,9];
			$scope.btn1="";
			$scope.btn1check=false;
		
			$scope.btn2="";
			$scope.btn2check=false;
		
			$scope.btn3="";
			$scope.btn3check=false;
		
			$scope.btn4="";
			$scope.btn4check=false;
		
			$scope.btn5="";
			$scope.btn5check=false;
		
			$scope.btn6="";
			$scope.btn6check=false;
		
			$scope.btn7="";
			$scope.btn7check=false;
		
			$scope.btn8="";
			$scope.btn8check=false;
		
			$scope.btn9="";
			$scope.btn9check=false;
		
	
} 
  function updateOptions(player,val){
	//remove the button from available buttons.  
	$scope.buttons.splice($scope.buttons.indexOf(val), 1);
  }
  //helper functions
  function getWinCombos(level){
	  var op=[];
	  //horizontal lines 
	  //hardcode for now.
	  op.push([1,2,3]);
	  op.push([4,5,6]);
	  op.push([7,8,9]);
	  //vertical lines
	  op.push([1,4,7]);
	  op.push([2,5,8]);
	  op.push([3,6,9]);
	  //cross right
	  op.push([1,5,9]);
	  //cross left
	  op.push([7,5,3]);
	  return op;
	  
  }
  
  function makeLetter(val,letter){
	  switch(val){
		case 1:
			$scope.btn1=letter;
			$scope.btn1check=true;
			break;
		case 2:
			$scope.btn2=letter;
			$scope.btn2check=true;
			break;
		case 3:
			$scope.btn3=letter;
			$scope.btn3check=true;
			break;
		case 4:
			$scope.btn4=letter;
			$scope.btn4check=true;
			break;
		case 5:
			$scope.btn5=letter;
			$scope.btn5check=true;
			break;
		case 6:
			$scope.btn6=letter;
			$scope.btn6check=true;
			break;
		case 7:
			$scope.btn7=letter;
			$scope.btn7check=true;
			break;
		case 8:
			$scope.btn8=letter;
			$scope.btn8check=true;
			break;
		case 9:
			$scope.btn9=letter;
			$scope.btn9check=true;
			break;
		default:
			break;
	}
	  
  }
  //fetch a random  buttons.
  function getRandome(myMin, myMax) {
    return Math.floor(Math.random() * (myMax - myMin + 1)) + myMin;
  }
}]);
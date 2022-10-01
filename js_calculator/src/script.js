var app = angular.module('CalcApp', []);

app.controller('MainCtrl',['$scope',function($scope){
	//Initilize the result and history to 0 on load.
    $scope.result=0;
    $scope.hist=0;
	$scope.numRes=0;
	$scope.opinProgress="";
	$scope.expression ="";
	
	//add events to the buttons.
	//clear button.
	$("#buttons").find(".numbtn").click(function(e) {
        var ele = e.target;
		var val = ele.value;
		$scope.result = ($scope.result==="0" || $scope.result===0)?"":$scope.result;
        $scope.result += val;
		$scope.$apply();
	});
	$("#buttons").find(".opbtn").click(function(e) {
        var ele = e.target;
		var val = ele.value;
		//$scope.opinProgress = ($scope.opinProgress ==="")?val:$scope.opinProgress;
		if($scope.opinProgress !==""){
			$scope.expression = $scope.numRes+" "+$scope.opinProgress+" "+parseInt($scope.result);
			$scope.numRes = $scope.performOp($scope.numRes,parseFloat($scope.result),$scope.opinProgress);
			$scope.opinProgress=val;
			$scope.hist = ($scope.hist==="0" || $scope.hist===0)?"":$scope.hist;
			$scope.hist = $scope.hist+$scope.result+val;
			//$scope.hist = ($scope.result+val+$scope.hist).trim();
			$scope.result=0;
		}else{
			$scope.opinProgress =val;
			$scope.hist = ($scope.hist==="0" || $scope.hist===0)?"":$scope.hist;
			$scope.hist = $scope.hist+""+$scope.result+val;
			$scope.numRes= parseFloat($scope.result);
			$scope.result=0;
		}
		
		
		
		
		$scope.$apply();
	});
	$(".eqbtn").click(function(e){
		
		$scope.numRes = $scope.performOp($scope.numRes,parseFloat($scope.result),$scope.opinProgress);
		$scope.result = $scope.numRes;
		$scope.hist = 0;
		$scope.opinProgress="";
		$scope.$apply();
		
	});
	$("#CE").click(function(e){
		$scope.hist=0;
		$scope.result=0;
		$scope.numRes=0;
		$scope.opinProgress="";
		$scope.$apply();
	});
	$scope.performOp = function(a,b,op){
		var res =0;
		switch(op){
			case "+":
			res= parseFloat(a)+parseFloat(b); 
			break;
			case "-":
			res= parseFloat(a)-parseFloat(b); 
			break;
			case "/":
			res= parseFloat(a)/parseFloat(b); 
			break;
			case "*":
			res= parseFloat(a)*parseFloat(b); 
			break;
			default:break;
		}
		return res;
	}
	
	
	
  
  
  
  
}]);


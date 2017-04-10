zeDA.controller('zeDACtrl', ['$scope', '$mdSidenav', '$http', 'loginService', '$timeout', function($scope, $mdSidenav, loginService, $timeout){
  
 var mockLogin = function(){
 	localStorage.authKey = "Bearer ZShdkjsahdlkjahsdashfmalkjdshflkjadshf;lkahdsfkjudsfha;lkdsn;kjfdsaf";
};

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  mockLogin();
}]);

zeDA.controller('JSONCtrl', ['$scope', 'modalService', 'loginService', 'config', '$http', function($scope, modalService, loginService, config, $http){   
$scope.like = function(){
	modalService.show("Thank You! ");
};

$scope.validate = function(){
	//console.log($scope.jsonTextArea);
	//JSON.parse($scope.jsonTextArea);
	try{
		$scope.jsonTextArea = JSON.stringify(JSON.parse($scope.jsonTextArea), undefined, 4);
		$scope.status = "Valid JSON";
	}catch(e){
		//console.log(e);
		$scope.status = "Invalid JSON Error:- " +  e.toString();
		//modalService.show("error");
	}
	
};

$scope.login = function(){

loginService.login('admin','admin').then(function(data){
	console.log(data);
},function(error){
	console.log(error);
});


};

}]);

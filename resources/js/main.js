var zeDA = angular.module('zeDA', ['ngMaterial']);

zeDA.config(function($httpProvider){
    //console.log($httpProvider.defaults.headers);
     $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};

  //$httpProvider.defaults.useXDomain = true;
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];
   //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
}); 

zeDA.constant('config', {
    apiUrl: 'https://analytics.zebra.com/api/',
    //apiUrl: 'http://10.233.82.229:30311/',
    //apiUrl : 'http://ec2-52-26-12-123.us-west-2.compute.amazonaws.com:30311/',
     //apiUrl: 'http://192.168.245.160:30311/',

    eventOptions : '[{"battery_charging_on":"battery charging on"}, {"battery_charging_off":"battery charging off"}, {"battery_stats":"battery stats"}, {"battery_low":"battery low"}, {"traffic":"traffic"}, {"citizen":"citizen"}, {"citizen_used":"citizen used"}, {"citizen_details":"citizen details"}, {"citizen_rebooted":"citizen rebooted"}, {"citizen_group_changed":"citizen group changed"}, {"wlan_stats":"wlan stats"}, {"user":"user"}, {"disruption":"disruption"}, {"application_usage":"application usage"} ]'
});

zeDA.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);


zeDA.service('loginService', ['$http', '$q', 'config', function ($http, $q, config) {
    this.login = function(unm,pwd){
    var deferred = $q.defer();
    $http.post(config.apiUrl + 'da/login', null, {
            headers: {
                'username' : unm,
                'password' : pwd
                }
        })
        .success(function(data){
            if(data.code == 200){
                localStorage.authKey = data.data;
                deferred.resolve(data.data);
            }

        })
        .error(function(error){
            console.log("Error in loginService");
            console.log(error);
            deferred.reject(error.data);
        });
        return deferred.promise;
    }
}]);

zeDA.service('csvUploadService', ['$http', '$q', 'config', function ($http, $q, config) {
    this.upload = function(options){
        var fd = new FormData();
        var deferred = $q.defer();

        fd.append('sncCSV', options.sncCSV);
        var _temp = config.apiUrl + "da/upload/file/snc" + "?SENDER=" + options.SENDER + "&SOURCE=" + options.SOURCE;

        console.log(_temp);
        
        $http.post(_temp , fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                'username' : options.SENDER,
                'password' : options.SOURCE
            }
        })
        .success(function(response){
            //console.log(response);
            deferred.resolve(response);
        })
        .error(function(error){
          //  console.log(error);
          deferred.reject(error);
        });
        return deferred.promise;
    }
}]);

zeDA.service('fileUploadService', ['$http', '$q', 'config', function ($http, $q, config) {
    this.upload = function(options){
        var fd = new FormData();
        var deferred = $q.defer();

        var _data = {"sender":options.SENDER,"source":options.SOURCE,"schemeid":options.schemeid,"checkProcessingReq":options.isprocessingreq,"checkEncrypted":options.isencrypted,"uploadfile": options.uploadfile}

        fd.append('uploadfile', options.uploadfile);
        fd.append('fup',JSON.stringify(_data))


    
        var _url = config.apiUrl + "da/upload/file/" + encodeURIComponent(options.path);
                                  /*  +"&SENDER=" + options.SENDER
                                    +"&SOURCE=" + options.SOURCE
                                    +"&SCHEMEID=" + options.SCHEMEID
                                    +"&ISPROCESSINGREQ=" + options.isprocessingreq
                                    +"&ISENCRYPTED=" + options.isencrypted;*/


        $http.post(_url , JSON.stringify(_data), {
            transformRequest: angular.identity,
            headers: {
                "username" : options.username,
                "password" : options.password,
                "Content-Type": "application/json"
            }
        })
        .success(function(response){
            //console.log(response);
            deferred.resolve(response);
        })
        .error(function(error){
          //  console.log(error);
          deferred.reject(error);
        });

        return deferred.promise;
    }
}]);


zeDA.service('dataUploadService', ['$http','$q', 'config', function ($http, $q, config) {
    this.upload = function(options){      
      var deferred = $q.defer();
      //var _token = localStorage.authKey;

     /* if(!_token)
      {
        deferred.reject({"data":"Authentication Key is missing, please relogin and try again!"});
        return deferred.promise;
      }*/

        var _url = config.apiUrl + 'da/upload/data';                   

        var postData = {sender:options.SENDER,source:options.SOURCE,scheme:options.SCHEME,schemeid:options.SCHEMEID,type:options.TYPE,data:JSON.stringify(JSON.parse(options.DATA))}

       // console.log(postData);
        //console.log(_url);

       $http.post(_url ,JSON.stringify(postData),{
            headers:{
                'Content-Type' : 'application/json',
                'username' : options.username,
                'password' : options.password
            }
        })
        .success(function(response){
            console.log(response);
            deferred.resolve(response.data);
        })
        .error(function(err){
            console.log(err);
            deferred.reject(err.data);
        });

        return deferred.promise;
    }
}]);


zeDA.service('dataFetchService', ['$http', '$q', 'config', function ($http, $q, config) {
    this.fetch = function(options){
        var deferred = $q.defer();
        var _token = localStorage.authKey;
        var _url = config.apiUrl + 'da/download/data' 

        var postData = {sender:options.SENDER,source:options.SOURCE,scheme:options.SCHEME,schemeid:options.SCHEMEID,type:options.TYPE,before:options.BEFOREDATETIME,onDay:options.ONDAY,limit:0,page:0}
                                
                                 /*+ "?SENDER=" + options.SENDER
                                 + "&SOURCE=" + options.SOURCE
                                 + "&TYPE=" + options.TYPE
                                 + "&SCHEME=" + options.SCHEME
                                 + "&SCHEMEID=" + options.SCHEMEID
                                 + "&NOOFRECORDS=" + options.NOOFRECORDS
                                 + "&ONDAY=" + options.ONDAY
                                 + "&BEFOREDATETIME=" + options.BEFOREDATETIME
                                 + "&PAGE=" + options.PAGE*/

        $http.post(_url, JSON.stringify(postData),{
            headers: {
                'Content-Type' : 'application/json',
                'username' : options.username,
                'password' : options.password
                }
        })
        .success(function(response){
            console.log(response);
            deferred.resolve(response);
        })
        .error(function(error){
            if(error)
                deferred.reject(error);
            else
                deferred.reject(error);
        });

        return deferred.promise;
    }
}]);

zeDA.service('fileListService', ['$http', '$q', 'config', function ($http, $q, config) {
    this.list = function(options){
        var deferred = $q.defer();         
        var postData = {sender:options.SENDER,source:options.SOURCE,schemeid:options.schemeid}
        $http.post(config.apiUrl + 'da/list/' + encodeURIComponent(options.path) , postData,{
            headers: {
                'username':options.username,
                'password' : options.password,
                "Content-Type": "application/json"
                }
        })
        .success(function(response){
            console.log(response);
            deferred.resolve(response);
        })
        .error(function(error){
            console.log(error)
            if(error)
                deferred.reject(error);
            else
                deferred.reject(error);
        });

        return deferred.promise;
    }
}]);

zeDA.service('fileDownloadService', ['$http', '$q', 'config', function ($http, $q, config) {
    this.download = function(options){
        var deferred = $q.defer();
        var _token = localStorage.authKey;

        console.log(options.PATH + options.FILENAME);
        
        $http.post(config.apiUrl + 'da/download/file/' + encodeURIComponent(options.PATH + options.FILENAME), null,{
            headers: {
                'SENDER' : options.SENDER,
                'SOURCE' : options.SOURCE,
                'TYPE' : options.TYPE,
                'SCHEME' : options.SCHEME,
                'SCHEMEID' : options.SCHEMEID
                }
        })
        .success(function(response){
            console.log(response);
            deferred.resolve(response);
        })
        .error(function(error){
            if(error)
                deferred.reject(error);
            else
                deferred.reject(error);
        });

        return deferred.promise;
    }
}]);

zeDA.service('modalService', ['$mdToast', '$animate', function ($mdToast, $animate) {
   this.show = function(msg){

    $mdToast.show(
      $mdToast.simple()
        .content(msg)
        .position('top right')
        .hideDelay(3000)
    );
   };
}]);
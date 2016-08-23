var gapp=angular.module('app', ['pascalprecht.translate'])
gapp.config(['$translateProvider', function($translateProvider){
  //  translate
  $translateProvider.translations('id_ID.UTF-8', id);
  $translateProvider.translations('en_US.UTF-8', en);
  $translateProvider.preferredLanguage('id_ID.UTF-8');
}])
gapp.controller('gappCtrl', ['$translate','$http', function($translate, $http) {
// ambil nilai dari /etc/default/locale 
$http.get('/assets/locale').then(function(hasil) {
  //var hasil1 = hasil.data;
  var lang = hasil.data.replace(/\n/g,'').replace(/.*LANG=/g,''); 
  console.log(lang); //<-untuk debug
  // untuk merubah bahasa dan nilai dari lang  
  $translate.use(lang);
 });
}]);




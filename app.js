var myApp = angular.module('myApp', []);

myApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

myApp.controller('basketController', function(burgerFactory){
  this.burger = burgerFactory.burger;

  this.removeItem = function(x, y){
    if(this.burger.indexOf(x) != -1 && this.burger[this.burger.indexOf(x)].sum > 1){
      this.burger[this.burger.indexOf(x)].sum -= 1;
    }else {
      this.burger.splice(y, 1);
    }
  };

  this.totalPrice = function(x){
    var initialPrice = 0;
    for(var i = 0, len = x.length; i < len; i++){
      initialPrice += x[i].price
    }
    return initialPrice;
  };
});

myApp.controller('menuController', function(burgerFactory, $http){
  this.burger = burgerFactory.burger;

  var $this = this;
  $http.get("menu.json").then(function(response) {
    $this.menuList = response.data;
  });

  this.getSumArray = function(x){
    var sumArray = [];

    sumArray.length = x;
    return sumArray;
  }

  this.addItem = function(x){
    if(this.burger.indexOf(x) == -1){
      this.burger.push(x);
      this.burger[this.burger.indexOf(x)].sum = 1;
    }else {
      this.burger[this.burger.indexOf(x)].sum += 1;
    }
  };
});

myApp.factory('burgerFactory', function(){
  return {
    burger: []
  }
});

myApp.directive('burgerItem', function(){
  return {
    restrict: 'A',
    template: '<div class="burger__item" ng-repeat="item in basket.burger track by $index">' +
      '<div class="row">' +
        '<div class="col-md-8">' +
          '<p>{{item.name}}</p>' +
        '</div>' +
        '<div class="col-md-2">' +
          '<p>{{item.sum}}</p>' +
        '</div>' +
        '<div class="col-md-2">' +
          '<button class="btn" ng-click="basket.removeItem(item, $index)">x</button>' +
        '</div>' +
      '</div>' +
    '</div>'
  }
});

myApp.filter('setRouble', function(){
  return function(x) {
    return x = x + ' рублей'
  }
});

(function() {
    'use strict';

    angular.module('scrumboard.demo', [])
        .controller(
            'ScrumboardController',
            ['$scope', '$http', ScrumboardController]
        );

    function ScrumboardController($scope, $http) {
        $scope.add = function(list, new_title) {
          let card = {
              list: list.id,
              title: new_title
          };
          $http.post('/scrumboard/cards/', card).then(function(response) {
              list.cards.push(response.data);
          }, function() {
              alert('Error');
          });

        };

        $scope.login = function() {
            $http.post('/auth_api/login/',
                {username: 'admin', password: 'admin'})
        };

        $scope.data = [];
        $http.get('/scrumboard/lists/').then(function(response) {
            $scope.data = response.data;
        });
    }
}());

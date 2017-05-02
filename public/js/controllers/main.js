angular.module('todoController', []).controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
	$scope.formData = {};
		$scope.spinner = false;
		$scope.toneAnalyzed = {};
		$scope.document = [];

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.spinner = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
						Todos.get()
							.success(function(data) {
								$scope.spinner = false;
								$scope.toneAnalyzed = data;

								$scope.document.emotionTone = $scope.toneAnalyzed.document_tone.tone_categories[0];
								$scope.document.languageTone = $scope.toneAnalyzed.document_tone.tone_categories[1];
								$scope.document.socialTone = $scope.toneAnalyzed.document_tone.tone_categories[2];


								console.log($scope.document);
							})
							.error(function(error) {
								$scope.spinner = false;
								console.log(error);
							});
					});
			}
		};

		
}])
app.controller("MainController", [
	"$scope",
	"$http",
	function ($scope, $http) {
		$scope.todo = {
			title: "Things I need to do",
			list: ["Learn Angular", "Learn C#", "Learn SQL"],
		};
		$scope.books = {
			title: "Books I need to read",
			list: [],
		};

		// Regular Expression (only inputs with digits will match) will return bool 0/1
		function hasOnlyNumbers(item) {
			return /^[0-9]*$/.test(item);
		}

		$scope.addItem = function (itemList, item) {
			//ISBN : 10/13 in length and only numbers
			if ((item.length == 10 || item.length == 13) && hasOnlyNumbers(item)) {
				console.log("ISBN");
				$http
					.get("https://www.googleapis.com/books/v1/volumes?q=isbn:" + item)
					.success(function (data) {
						itemList.push(
							"Title: " +
								data.items[0].volumeInfo.title +
								" // Author(s):" +
								data.items[0].volumeInfo.authors
						);
					});
			} else {
				console.log("Not an ISBN");
				itemList.push(item);
			}
		};
	},
]);

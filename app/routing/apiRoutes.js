var members = require("../data/friends");

module.exports = function(app) {
	app.get("/api/friends", function(req, res) {
  	return res.json(members);
});

	app.post("/api/friends", function(req, res) {
		var integerScores = [];
		var comparison = [];
		var difference = 0;
		for (var i = 0; i < req.body.scores.length; i++) {
			var integer = parseInt(req.body.scores[i]);
			integerScores.push(integer);
		}
		req.body.scores = integerScores;
		members.forEach(check);

		function check(user) {
			for (var i = 0; i < integerScores.length; i++) {
				difference += Math.abs(integerScores[i] - user.scores[i]);
			}
			comparison.push(difference);
			difference = 0;
		};
		var min = Math.min.apply(null, comparison);
		var index = comparison.indexOf(min);
		res.json(members[index]);
		members.push(req.body);
	});
};
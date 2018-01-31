"use strict";

exports.schema = "\ntype User inherits Node {\n    email: String,\n    score: Int\n    money: Int\n}\n\ntype Score {\n    score: Int\n    user: User\n}\n";

exports.query = "\nMe: User\nLeaderboard(top: Int = 100, key: String = \"score\"): [Score]\nGetScores(top: Int = 100, key: String = \"score\"): [Score]\n";
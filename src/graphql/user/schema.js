exports.schema = `
type User inherits Node {
    email: String,
    score: Int
    money: Int
}
`

exports.query = `
Me: User
Leaderboard(top: Int = 100, key: String = "score"): [User]
`

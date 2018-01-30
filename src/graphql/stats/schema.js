exports.schema = `
type Score {
    user: User
    score: Int
}
`

exports.query = `
GetScores(top: Int = 100, key: String = "score"): [Score]
`

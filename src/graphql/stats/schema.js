exports.schema = `
type Score {
    id: String
    name: String
    email: String
    score: Int
}
`

exports.query = `
GetScores(top: Int = 100, key: String = "score"): [Score]
`

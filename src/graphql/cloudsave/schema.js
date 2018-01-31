exports.query = `
GetString(key: String!) : String
GetInt(key: String!) : Int
GetBool(key: String!) : Boolean
GetFloat(key: String!) : Float
`

exports.mutation = `
SetString(key: String!, value: String!) : String
SetInt(key: String!, value: Int!) : Int
SetBool(key: String!, value: Boolean!) : Boolean
SetFloat(key: String!, value: Float!) : Float
`

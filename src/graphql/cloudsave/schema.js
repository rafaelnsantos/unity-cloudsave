"use strict";

exports.query = "\nGetString(key: String!) : String\nGetInt(key: String!) : Int\nGetBool(key: String!) : Boolean\nGetFloat(key: String!) : Float\n";

exports.mutation = "\nSetString(key: String!, value: String!) : String\nSetInt(key: String!, value: Int!) : Int\nSetBool(key: String!, value: Boolean!) : Boolean\nSetFloat(key: String!, value: Float!) : Float\n";
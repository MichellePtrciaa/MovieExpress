import mongoose from "mongoose"
import UserModel from "./UserModel.js"

const MovieSchema = new mongoose.Schema(
    {
        judul : {
            type : String,
            unique : true,
            required : true,
            trim : true
        },
        sutradara : {
            type : String,
            required : true,
            trim : true
        },
        tahunRilis : {
            type : String,
            required : true,
            trim : true
        },
        createdBy : {
            type: mongoose.Types.ObjectId,
            ref : "users"
        }
    },{
        timestamps : true
    }
)

const MovieModel = mongoose.model("movie", MovieSchema)
export default MovieModel
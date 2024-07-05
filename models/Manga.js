import { Schema,Types,model } from "mongoose"
import Category from './Category.js'
import Author from './Author.js'
let collection = 'mangas'
let schema = new Schema({
    author_id: {
        type: Types.ObjectId,
        required: true,
        ref:Author
    },
    company_id: {
        type: Types.ObjectId,
    },
    title: { type:String,required:true },
    cover_photo: { type:String,required:true },
    description: { type:String,required:true },
    category_id: {
        type: Types.ObjectId,
        required: true,
        ref:'categories'
    }
},{
    timestamps: true
})

let Manga = model(collection,schema)
export default Manga
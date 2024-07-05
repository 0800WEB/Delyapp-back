import 'dotenv/config.js'
import '../../config/database.js'
import Author from "../Author.js"
import User from "../User.js"

let authors = [{
    name: "lucas",
    last_name: "silva",
    city: "buenos aires",
    country: "argentina",
    photo: "https://conceptodefinicion.de/wp-content/uploads/2016/01/Perfil2.jpg",
    active: true,
    user_id: 'lucas@mh.com.ar'
},{
    name: "jose",
    last_name: "lopez",
    city: "villa carlos paz",
    country: "argentina",
    photo: "https://conceptodefinicion.de/wp-content/uploads/2016/01/Perfil2.jpg",
    active: true,
    user_id: "jose@mh.com.ar"
},{
    name: "eric",
    city: "resistencia",
    country: "argentina",
    photo: "https://conceptodefinicion.de/wp-content/uploads/2016/01/Perfil2.jpg",
    active: true,
    user_id: "eric@mh.com.ar"
},{
    name: "igna@mh.com.ar",
    last_name: "borraz",
    city: "rosario",
    country: "argentina",
    photo: "https://conceptodefinicion.de/wp-content/uploads/2016/01/Perfil2.jpg",
    active: true,
    user_id: 'igna@mh.com.ar'
}]

//necesito un loop para buscar el id de cada usuario en base al correo electronico

authors.forEach(author=>add_authors(author))

async function add_authors(author) {
    //console.log(author.user_id)
    let user = await User.findOne({ email:author.user_id })     //esperé que mongo me busque un usuario que coincida con el email guardado en la propiedad user_id
    //console.log(user._id)
    let user_id = user._id                                      //guardo la propiedad _id del usuario encontrado en una variable
    author.user_id = user_id                                    //reasigno la propiedad del user_id del author por el objectid encontrado
    await Author.create(author)                                 //el método create, crea un unico documento con el objeto de datos (author)
}
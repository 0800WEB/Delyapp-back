import User from "../User.js"
import 'dotenv/config.js'
import '../../config/database.js'

let users = [{
    email: "lucas@mh.com.ar",
    password: "$2a$10$XZBDuOYHcHSzZNzf2ws7Quvu3YmKgSagWRUG1eGlBLSdxJunpN1LC",
    role: 1,
    verified: true,
    verify_code: "acvnewi92emodsqisj129mxskal2121wsaz",
    online: false,
    photo: "https://i.postimg.cc/fyJsspq8/image.png"
},{
    email: "jose@mh.com.ar",
    password: "$2a$10$XZBDuOYHcHSzZNzf2ws7Quvu3YmKgSagWRUG1eGlBLSdxJunpN1LC",
    role: 1,
    verified: true,
    verify_code: "acvnewi92emodsqisj129mxskal2121wsaz",
    online: false,
    photo: "https://i.postimg.cc/GhdNvZxV/5831a17a290077c646a48c4db78a81bb-icono-de-perfil-de-usuario-azul.png"
},{
    email: "eric@mh.com.ar",
    password: "$2a$10$XZBDuOYHcHSzZNzf2ws7Quvu3YmKgSagWRUG1eGlBLSdxJunpN1LC",
    role: 1,
    verified: true,
    verify_code: "acvnewi92emodsqisj129mxskal2121wsaz",
    online: false,
    photo: "https://i.postimg.cc/GhdNvZxV/5831a17a290077c646a48c4db78a81bb-icono-de-perfil-de-usuario-azul.png"
},{
    email: "igna@mh.com.ar",
    password: "$2a$10$XZBDuOYHcHSzZNzf2ws7Quvu3YmKgSagWRUG1eGlBLSdxJunpN1LC",
    role: 1,
    verified: true,
    verify_code: "acvnewi92emodsqisj129mxskal2121wsaz",
    online: false,
    photo: "https://i.postimg.cc/7Yj2FytQ/43cc80b4c098e43a988c535eaba42c53-icono-de-usuario-de-persona.png"
},{
    email: "silvina@mh.com.ar",
    password: "$2a$10$XZBDuOYHcHSzZNzf2ws7Quvu3YmKgSagWRUG1eGlBLSdxJunpN1LC",
    role: 3,
    verified: true,
    verify_code: "acvnewi92emodsqisj129mxskal2121wsaz",
    online: false,
    photo: "https://i.postimg.cc/7Yj2FytQ/43cc80b4c098e43a988c535eaba42c53-icono-de-usuario-de-persona.png"
}]

User.insertMany(users)
//el método requiere un array con los datos a insertar en mongo
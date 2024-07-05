import Manga from '../../models/Manga.js'

/* async function getOneId (req, res, next) {
    try {
        let {id} = req.params
        let doc = await Manga.findById(id)
        return res.status(200).json(doc)
    } catch (error) {
        console.log(error.message)
    }
} */
async function getOne(req, res, next) {
    try {        
        console.log(req.params)
        console.log(req.params.id)
        let one = await Manga.findOne({_id:req.params.id}).populate("category_id", "name -_id")
        if(!one){
            return res.status(404).json({ message: 'Not Found' })
        }
        return res.status(200).json(one) /* si la condición de arriba se cumple esta linea no se lee */
    } catch (error) {
        console.log(error.message)
    }
}

export default getOne
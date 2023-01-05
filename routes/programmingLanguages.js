import express from 'express'
import {getMultiple,create,update,deleteLanguage} from '../services/programmingLanguage.service.js'

const router = express.Router()


router.get('/',async (req,res,next) => {
    try {
        res.json(await  getMultiple(req.query.page))
    }catch (err) {
        console.error(`Error while getting programming languages `, err.message);
        next(err);
    }
})



router.put('/:id',async (req,res,next) => {
    try{
        let {id} = req.params
        res.json(await update(id,req.body))
    }catch (err) {
        console.error(`Error while updating programming language`, err.message);
        next(err);
    }
})

router.delete('/:id',async (req,res,next) => {
    try{
        let {id} = req.params
        res.json(await deleteLanguage(id))
    }catch (e) {
        console.error(`Error while deleting programming language`, e.message)
        next(e)
    }
})

export default  router
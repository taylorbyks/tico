import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'
import PetsController from './controllers/PetsController'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/pets', PetsController.index)
routes.get('/pets/:id', PetsController.show)
routes.post('/pets', upload.array('images'), PetsController.create)

export default routes
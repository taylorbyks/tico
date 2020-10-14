import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import petView from '../views/pets_view'
import * as Yup from 'yup'

import Pet from '../models/Pet'

export default {
	async index(request: Request, response: Response){
		const petsRepository = getRepository(Pet)

		const pets = await petsRepository.find({
			relations: ['images']
		})

		return response.json(pets)
	},

	async show(request: Request, response: Response){
		const { id } = request.params
		
		const petsRepository = getRepository(Pet)

		const pet = await petsRepository.findOneOrFail(id, {
			relations: ['images']
		})

		return response.json(petView.render(pet))
	},
	
	async create(request: Request, response: Response){
		const {
			name,
			latitude,
			longitude,
			about,
			species,
			big,
			puppy,
		} = request.body

		const petsRepository = getRepository(Pet)

		const requestImages = request.files as Express.Multer.File[]
		const images = requestImages.map( image => {
			return { path: image.filename}
		})

		const data = {
			name,
			latitude,
			longitude,
			about,
			species,
			big,
			puppy,
			images
		}

		const schema = Yup.object().shape({
			name: Yup.string().required(),
			latitude: Yup.number().required(),
			longitude: Yup.number().required(),
			about: Yup.string().required().max(300),
			species: Yup.string().required().max(20),
			big: Yup.boolean().required(),
			puppy: Yup.boolean().required(),
			images: Yup.array(
				Yup.object().shape({
					path: Yup.string().required()
				})
			)
		})

		await schema.validate(data, {
			 abortEarly: false,
		})

		const pet = petsRepository.create(data)

		await petsRepository.save(pet)

	return response.status(201).json(pet)
}
}


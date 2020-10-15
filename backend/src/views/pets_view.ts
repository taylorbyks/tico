import Pet from '../models/Pet'
import imagesView from './images_view'

export default {
  render(pet: Pet) {
    return {
      id: pet.id,
      name: pet.name,
      latitude: pet.latitude,
      longitude: pet.longitude,
      about: pet.about,
			big: pet.big,
			puppy: pet.puppy,
      userName: pet.userName,
      userNumber: pet.userNumber,
      images: imagesView.renderMany(pet.images)
    }
  },

  renderMany(pets: Pet[]) {
    return pets.map(pet => this.render(pet))
  }
}
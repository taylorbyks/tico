import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image'

@Entity("pets")
export default class Pet {
  @PrimaryGeneratedColumn("increment")
  id: number
  @Column()
  name: string
  @Column()
  latitude: string
  @Column()
  longitude: string
  @Column()
  about: string
  @Column()
  big: boolean
  @Column()
  puppy: boolean
  @Column()
  userName: string
  @Column()
  userNumber: string
  @OneToMany(() => Image, image => image.pet, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'pets_id'})
  images: Image[]
}

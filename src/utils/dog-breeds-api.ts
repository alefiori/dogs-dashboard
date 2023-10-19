import { httpService } from '.'
import { Breed, BreedsListResponse, MultipleImagesResponse, SingleImageResponse } from '../types'

export const DOG_BASE_URL = 'https://dog.ceo/api/'

export const dogBreedsApi = {
  breedsList: async (): Promise<ReadonlyArray<Breed>> => {
    try {
      const { message } = await httpService.get<BreedsListResponse>(`${DOG_BASE_URL}breeds/list/all`)
      if (message) {
        return Object.keys(message).map((name) => ({
          name,
          subBreeds: message[name],
        }))
      }
      throw new Error()
    } catch (_) {
      throw new Error('Error fetching list of breeds')
    }
  },
  imageByBreed: async (breed: string): Promise<string> => {
    try {
      const { message } = await httpService.get<SingleImageResponse>(`${DOG_BASE_URL}breed/${breed}/images/random`)
      if (message) {
        return message
      }
      throw new Error()
    } catch (_) {
      throw new Error('Error fetching image by breed')
    }
  },
  imageBySubBreed: async (breed: string, subBreed: string): Promise<string> => {
    try {
      const { message } = await httpService.get<SingleImageResponse>(
        `${DOG_BASE_URL}breed/${breed}/${subBreed}/images/random`,
      )
      if (message) {
        return message
      }
      throw new Error()
    } catch (_) {
      throw new Error('Error fetching image by sub-breed')
    }
  },
  imageListByBreed: async (breed: string): Promise<ReadonlyArray<string>> => {
    try {
      const { message } = await httpService.get<MultipleImagesResponse>(`${DOG_BASE_URL}breed/${breed}/images`)
      if (message?.length) {
        return message
      }
      throw new Error()
    } catch (_) {
      throw new Error('Error fetching list of images by breed')
    }
  },
  imageListBySubBreed: async (breed: string, subBreed: string): Promise<ReadonlyArray<string>> => {
    try {
      const { message } = await httpService.get<MultipleImagesResponse>(
        `${DOG_BASE_URL}breed/${breed}/${subBreed}/images`,
      )
      if (message?.length) {
        return message
      }
      throw new Error()
    } catch (_) {
      throw new Error('Error fetching list of images by sub-breed')
    }
  },
}

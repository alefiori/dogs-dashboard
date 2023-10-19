import { httpService } from '.'
import { MultipleImagesResponse, SingleImageResponse } from '../types'

export const DOG_BASE_URL = 'https://dog.ceo/api/'

export const dogImagesApi = {
  byBreed: async (breed: string): Promise<string> => {
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
  bySubBreed: async (breed: string, subBreed: string): Promise<string> => {
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
  listByBreed: async (breed: string): Promise<Array<string>> => {
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
  listBySubBreed: async (breed: string, subBreed: string): Promise<Array<string>> => {
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

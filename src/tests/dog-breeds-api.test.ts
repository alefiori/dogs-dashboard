import { describe, expect, it, vi } from 'vitest'
import { DOG_BASE_URL, dogBreedsApi } from '../utils'
import { BreedsListResponse, MultipleImagesResponse, SingleImageResponse } from '../types'

const breedsListResponseMock: BreedsListResponse = {
  message: {
    __MOCK_BREED__: ['__MOCK_SUB_BREED__'],
  },
  status: 'success',
}

const singleImageResponseMock: SingleImageResponse = {
  message: '__MOCK__',
  status: 'success',
}

const multipleImagesResponseMock: MultipleImagesResponse = {
  message: ['__MOCK__'],
  status: 'success',
}

const httpService = vi.hoisted(() => ({
  get: vi.fn(),
}))

vi.mock('../utils/http-service', () => ({
  httpService,
}))

describe('Dog Breeds API', () => {
  it('should fetch a list of breeds', async () => {
    httpService.get.mockImplementationOnce(() => Promise.resolve(breedsListResponseMock))
    const response = await dogBreedsApi.breedsList()
    expect(httpService.get).toBeCalledWith(`${DOG_BASE_URL}breeds/list/all`)
    expect(response).toEqual([{ name: '__MOCK_BREED__', subBreeds: ['__MOCK_SUB_BREED__'] }])
  })
  it('should fetch a random image by breed', async () => {
    httpService.get.mockImplementationOnce(() => Promise.resolve(singleImageResponseMock))
    const response = await dogBreedsApi.imageByBreed('hound')
    expect(httpService.get).toBeCalledWith(`${DOG_BASE_URL}breed/hound/images/random`)
    expect(response).toBe('__MOCK__')
  })
  it('should fetch a random image by sub-breed', async () => {
    httpService.get.mockImplementationOnce(() => Promise.resolve(singleImageResponseMock))
    const response = await dogBreedsApi.imageBySubBreed('hound', 'afghan')
    expect(httpService.get).toBeCalledWith(`${DOG_BASE_URL}breed/hound/afghan/images/random`)
    expect(response).toBe('__MOCK__')
  })
  it('should fetch a list of images by breed', async () => {
    httpService.get.mockImplementationOnce(() => Promise.resolve(multipleImagesResponseMock))
    const response = await dogBreedsApi.imageListByBreed('hound')
    expect(httpService.get).toBeCalledWith(`${DOG_BASE_URL}breed/hound/images`)
    expect(response).toEqual(['__MOCK__'])
  })
  it('should fetch a list of images by sub-breed', async () => {
    httpService.get.mockImplementationOnce(() => Promise.resolve(multipleImagesResponseMock))
    const response = await dogBreedsApi.imageListBySubBreed('hound', 'afghan')
    expect(httpService.get).toBeCalledWith(`${DOG_BASE_URL}breed/hound/afghan/images`)
    expect(response).toEqual(['__MOCK__'])
  })
  it('should thow an error when fetching a list of breeds', async () => {
    httpService.get.mockImplementationOnce(() => Promise.reject())
    await expect(dogBreedsApi.breedsList()).rejects.toThrow('Error fetching list of breeds')
  })
  it('should thow an error when fetching a random image by breed', async () => {
    httpService.get.mockImplementationOnce(() => Promise.reject())
    await expect(dogBreedsApi.imageByBreed('')).rejects.toThrow('Error fetching image by breed')
  })
  it('should thow an error when fetching a random image by sub-breed', async () => {
    httpService.get.mockImplementationOnce(() => Promise.reject())
    await expect(dogBreedsApi.imageBySubBreed('', '')).rejects.toThrow('Error fetching image by sub-breed')
  })
  it('should thow an error when fetching a list of images by breed', async () => {
    httpService.get.mockImplementationOnce(() => Promise.reject())
    await expect(dogBreedsApi.imageListByBreed('')).rejects.toThrow('Error fetching list of images by breed')
  })
  it('should thow an error when fetching a list of images by sub-breed', async () => {
    httpService.get.mockImplementationOnce(() => Promise.reject())
    await expect(dogBreedsApi.imageListBySubBreed('', '')).rejects.toThrow('Error fetching list of images by sub-breed')
  })
})

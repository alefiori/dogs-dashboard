import { describe, expect, it, vi } from 'vitest'
import { DOG_BASE_URL, dogImagesApi } from '../utils'
import { MultipleImagesResponse, SingleImageResponse } from '../types'

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

describe('Dog Images API', () => {
  it('should fetch a random image by breed', async () => {
    httpService.get.mockImplementationOnce(() => Promise.resolve(singleImageResponseMock))
    const response = await dogImagesApi.byBreed('hound')
    expect(httpService.get).toBeCalledWith(`${DOG_BASE_URL}breed/hound/images/random`)
    expect(response).toBe('__MOCK__')
  })
  it('should fetch a random image by sub-breed', async () => {
    httpService.get.mockImplementationOnce(() => Promise.resolve(singleImageResponseMock))
    const response = await dogImagesApi.bySubBreed('hound', 'afghan')
    expect(httpService.get).toBeCalledWith(`${DOG_BASE_URL}breed/hound/afghan/images/random`)
    expect(response).toBe('__MOCK__')
  })
  it('should fetch a list of images by breed', async () => {
    httpService.get.mockImplementationOnce(() => Promise.resolve(multipleImagesResponseMock))
    const response = await dogImagesApi.listByBreed('hound')
    expect(httpService.get).toBeCalledWith(`${DOG_BASE_URL}breed/hound/images`)
    expect(response).toEqual(['__MOCK__'])
  })
  it('should fetch a list of images by sub-breed', async () => {
    httpService.get.mockImplementationOnce(() => Promise.resolve(multipleImagesResponseMock))
    const response = await dogImagesApi.listBySubBreed('hound', 'afghan')
    expect(httpService.get).toBeCalledWith(`${DOG_BASE_URL}breed/hound/afghan/images`)
    expect(response).toEqual(['__MOCK__'])
  })
  it('should thow an error when fetching a random image by breed', async () => {
    httpService.get.mockImplementationOnce(() => Promise.reject())
    await expect(dogImagesApi.byBreed('')).rejects.toThrow('Error fetching image by breed')
  })
  it('should thow an error when fetching a random image by sub-breed', async () => {
    httpService.get.mockImplementationOnce(() => Promise.reject())
    await expect(dogImagesApi.bySubBreed('', '')).rejects.toThrow('Error fetching image by sub-breed')
  })
  it('should thow an error when fetching a list of images by breed', async () => {
    httpService.get.mockImplementationOnce(() => Promise.reject())
    await expect(dogImagesApi.listByBreed('')).rejects.toThrow('Error fetching list of images by breed')
  })
  it('should thow an error when fetching a list of images by sub-breed', async () => {
    httpService.get.mockImplementationOnce(() => Promise.reject())
    await expect(dogImagesApi.listBySubBreed('', '')).rejects.toThrow('Error fetching list of images by sub-breed')
  })
})

type BaseResponse = {
  status: 'success' | 'error'
}

export type SingleImageResponse = BaseResponse & {
  message: string
}

export type MultipleImagesResponse = BaseResponse & {
  message: ReadonlyArray<string>
}

export type BreedsListResponse = BaseResponse & {
  message: {
    [key: string]: ReadonlyArray<string>
  }
}

export type Breed = {
  name: string
  subBreeds: ReadonlyArray<string>
}

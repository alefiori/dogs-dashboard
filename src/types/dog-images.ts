type BaseResponse = {
  status: 'success' | 'error'
}

export type SingleImageResponse = BaseResponse & {
  message: string
}

export type MultipleImagesResponse = BaseResponse & {
  message: Array<string>
}

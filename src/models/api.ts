export interface ApiError {
  type: string
  message: string
}

export interface ApiResponse<T> {
  data: T | null
  error: ApiError | null
}

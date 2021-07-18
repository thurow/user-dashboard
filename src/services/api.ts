import axios from 'axios'

const api = axios.create({
  baseURL: 'http://jsonplaceholder.typicode.com/',
})

export const fetcher = <T extends unknown>(path: string): Promise<T> => api.get<T>(path).then(res => res.data)

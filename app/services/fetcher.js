import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: 'http://18.162.206.99/systracker',
})

const fetcher = (url) => axiosInstance.get(url).then(res => res.data)

export default fetcher


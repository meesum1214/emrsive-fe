import axios from "axios";

export const BaseApiUrl = 'http://192.168.0.110:3002/api'

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbG1hbm5hcXY0NjFAZ21haWwuY29tIiwiaWF0IjoxNjg1NzkzNjUwfQ.Rd-U0FVIHucqjV7_PzZ-Ez56ORr6amRuzdbp-xjG79U'

export const API = axios.create({
    baseURL: BaseApiUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "authorization": token
    }
})

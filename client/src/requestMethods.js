import axios from "axios";

const BASE_URL = "http://localhost:5000/backend"; 
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYTBjYjEyZGJlN2Q1OWRhOGQwZmIwNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1NDgwMzA1NywiZXhwIjoxNjU1MDYyMjU3fQ.wWpOj0Om6R_jUy0uvL9PRhbfVk74wq11OKYQYvmpKCY"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer ${TOKEN}`},
});
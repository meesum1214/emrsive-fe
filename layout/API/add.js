import { API } from "./config"

export const registerUser = async (data) => {
    let response = await API.post(`/auth/register`, data)
    return response.data
}

export const userLogin = async (data) => {
    let response = await API.post(`/auth/login`, data)
    return response.data
}

export const getAllPlans = async () => {
    let response = await API.get(`/plan/getall`)
    return response.data
}

export const addToCart = async (data) => {
    let response = await API.post(`/cart/add-cart-item`, data)
    return response.data
}

export const getCartItems = async (userId) => {
    let response = await API.get(`/cart/get-cart-items/${userId}`)
    return response.data
}

export const deleteCartItem = async (cartid) => {
    let response = await API.delete(`/cart/delete-cart-item?cart_id=${cartid}`)
    return response.data
}

export const emptyCart = async (userId) => {
    // console.log(">>>>>>>", userId)
    let response = await API.delete(`/cart/all?user_id=${userId}`)
    return response.data
}
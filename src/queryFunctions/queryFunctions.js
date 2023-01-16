import axios from "axios"

const BASE_URL = "https://gorest.co.in/public/v2";
const TOKEN = "0dd9d243f9dc7804a75877be79d95d70b7c2f00a188f8eaee9e056e5e2c1fa4c"

const getPosts = async (page = 1, per_page = 10) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/users/57074/posts?page=${page}&per_page=${per_page}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`
            }
        })
        return data;
    } catch (error) {
        throw new Error("Unable to fetch posts!!!")
    }
}

const getSinglePost = async (id) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/posts/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${TOKEN}`
            }
        })
        return data;
    } catch (error) {
        throw new Error("Unable to fetch posts!!!")
    }
}

const addPost = async ({ title, body }) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/users/57074/posts`,
            { title, body },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`
                }
            })
        return data;
    } catch (error) {
        throw new Error("Unable to post data!!!")
    }
}

const updatePost = async ({ title, body, id }) => {
    try {
        const { data } = await axios.patch(`${BASE_URL}/posts/${id}`,
            { title, body },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`
                }
            })
        return data;
    } catch (error) {
        throw new Error("Unable to update data!!!")
    }
}

const deletePost = async ({ id }) => {
    try {
        const { data } = await axios.delete(`${BASE_URL}/posts/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`
                }
            })
        return data;
    } catch (error) {
        throw new Error("Unable to delete data!!!")
    }
}

export {
    getPosts,
    getSinglePost,
    addPost,
    updatePost,
    deletePost
}
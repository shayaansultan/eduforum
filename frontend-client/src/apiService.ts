import BASE_API_STRING from "../API_STRING";

const BASE_URL = BASE_API_STRING;

export const getThreadsURL = () => `${BASE_URL}/threads`;
export const getThreadURL = (threadsId: string) => `${BASE_URL}/threads/${threadsId}`;
export const getCommentsForThreadURL = (threadsId: string) => `${BASE_URL}/threads/${threadsId}/comments`;
export const postCommentURL = () => `${BASE_URL}/comments`;
export const postThreadURL = () => `${BASE_URL}/threads`;
export const checkUsernameExistsURL = (username: string) => `${BASE_URL}/checkusername/${username}`;
export const createUserURL = () => `${BASE_URL}/users`;
export const getAllCategoriesURL = () => `${BASE_URL}/categories`;
export const getUsernameURL = (userId: string) => `${BASE_URL}/users/${userId}`;
export const commentsURL = (commentId: string) => `${BASE_URL}/comments/${commentId}`;



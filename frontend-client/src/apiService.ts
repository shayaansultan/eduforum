const BASE_URL = "http://localhost:8080"

export const getThreadsURL = () => `${BASE_URL}/threads`;
export const getThreadURL = (threadsId: string) => `${BASE_URL}/threads/${threadsId}`;
export const getCommentsForThreadURL = (threadsId: string) => `${BASE_URL}/threads/${threadsId}/comments`;
export const postCommentURL = () => `${BASE_URL}/comments`;
export const postThreadURL = () => `${BASE_URL}/threads`;



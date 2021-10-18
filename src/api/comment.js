import request from '@/utils/request'
export const getComments = (params) => {
    return request({
        method: 'GET',
        url: 'app/v1_0/comments',

        params
    })
}
export const addComment = (data) => {
    return request({
        method: 'POST',
        url: 'app/v1_0/comments',

        data
    })
}
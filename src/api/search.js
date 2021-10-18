import request from '@/utils/request'
export const search = params => {
    return request({
        method: 'GET',
        url: 'app/v1_0/suggestion',
        params
    })
}
export const getSearchResults = params => {
    return request({
        method: 'GET',
        url: 'app/v1_0/search',
        params
    })
}
export const getSearchHistories = () => {
    return request({
        method: 'GET',
        url: 'app/v1_0/search/histories',
        
    })
}
import request from '@/utils/request'
export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: 'app/v1_0/channels',
    })
}
export const addUserChannels = (data) => {
    return request({
        method: 'PATCH',
        url: 'app/v1_0/user/channels',
        data
    })
}
export const deleteUserChannels = target => {
    return request({
        method: 'Delete',
        url: `app/v1_0/user/channels/${target}`,

    })
}
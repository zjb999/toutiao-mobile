import request from '@/utils/request'

export const login = data => {
    return request({
        method: 'POST',
        url: 'app/v1_0/authorizations',
        data
    })
}
export const sendSms = mobile => {
    return request({
        method: 'GET',
        url: `app/v1_0/sms/codes/${mobile}`,

    })
}
export const getCurrentUser = () => {
    return request({
        method: 'GET',
        url: 'app/v1_0/user',

    })
}
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: 'app/v1_0/user/channels',

    })
}

export const addFollow = (data) => {
    return request({
        method: 'POST',
        url: 'app/v1_0/user/followings',
        data
    })
}
export const deleteFollow = (target) => {
    return request({
        method: 'DELETE',
        url: `app/v1_0/user/followings/${target}`,

    })
}
export const collect = (data) => {
    return request({
        method: 'POST',
        url: 'app/v1_0/article/collections',
        data
    })
}

export const deleteCollect = (target) => {
    return request({
        method: 'DELETE',
        url: `app/v1_0/article/collections/${target}`,
    })
}
export const addLike = (data) => {
    return request({
        method: 'POST',
        url: 'app/v1_0/article/likings',
        data
    })
}
export const deleteLike = (target) => {
    return request({
        method: 'DELETE',
        url: `app/v1_0/article/likings/${target}`,
    })
}
export const addCommentsLike = (data) => {
    return request({
        method: 'POST',
        url: 'app/v1_0/comment/likings',
        data
    })
}
export const deleteCommentLike = (target) => {
    return request({
        method: 'DELETE',
        url: `app/v1_0/comment/likings/${target}`,
    })
}

export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: 'app/v1_0/user/profile',

    })
}

export const updateUserProfile = (data) => {
    return request({
        method: 'PATCH',
        url: 'app/v1_0/user/profile',
        data
    })
}

export const updateUserPhoto = (data) => {
    return request({
        method: 'PATCH',
        url: 'app/v1_0/user/photo',
        data
    })
}
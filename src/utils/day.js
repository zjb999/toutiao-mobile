import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'
dayjs.extend(relativeTime)
    // dayjs.locale('zh-cn')
    // import 'dayjs/locale/de'
    // import 'dayjs/locale/de' // ES 2015 

dayjs.locale('zh-cn')
Vue.filter('relativeTime', value => {
    return dayjs(value).from(dayjs())
})
Vue.filter('datetime', value => {
    return dayjs(value).format('MM-DD HH:mm')
})
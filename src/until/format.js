import dayjs from 'dayjs'
export default function format(value) {
    return dayjs(value).format('YYYY-MM-DD HH:mm')
}
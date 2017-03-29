export default function () {
    if (document.cookie.indexOf('fanpian') == -1) {
        return false
    } else {
        return true
    }
}
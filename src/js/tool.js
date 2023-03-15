const prefixIntrger = function (n) {
        n = n + ''
        n = (0 + n).substr(n.length -1)
        return n
}

const getTemplateDate = function (time) {
let date = new Date(time)

    //得到具体的年月日，时分秒
    let y = date.getFullYear();
    let M = date.getMonth() ;
    let d = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    // 补零操作
    M = prefixIntrger(M)
    d = prefixIntrger(d)
    h = prefixIntrger(h)
    m = prefixIntrger(m)
    //把具体时间拼接好
    return `${y}-${M}-${d} ${h}:${m}`

}
// 如果函数不暴露出去，那么其他模块，例如组件是无法使用的
export {getTemplateDate}
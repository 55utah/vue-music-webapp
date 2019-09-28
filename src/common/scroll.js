import BScroll from 'better-scroll'


function initScroll(dom, setting = {}){
    return new BScroll(dom, Object.assign({
        scrollX: false,
        scrollY: true,
        momentum: true,
        click: true,
        bounce: false
    }, setting))
}


function init(dom, setting){
    setTimeout(() => {
        initScroll(dom, setting)
    }, 30)
}


export default init
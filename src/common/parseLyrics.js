function convert(s){
    let m = s.split(':')[0], sec = s.split(':')[1]
    return parseInt(m * 60) + parseFloat(sec)
}


function parser(lyrics){
    let lyricArr = lyrics.split('\n').reduce((h, k)=>{
        h.push({time: convert(k.split(']')[0].slice(1)), value: k.split(']')[1]})
        return h
    }, [])
    let index = 0
    return function next(time){
        if(index >= lyricArr.length) return null
        if(time > lyricArr[index].time){
            index ++
            return lyricArr[index].value
        }else return null
    }
}


export default parser
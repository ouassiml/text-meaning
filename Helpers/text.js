
const nbWords = (text) => {

    let words = text.replace(/[^\w\s]/g, "").split(/\s+/);
    return words.length;
}

const mostOccurent = (text) => {
    console.log(text)
    let obj = {}
    let words = text.replace(/[^\w\s]/g, "").split(/\s+/);
    console.log(words)
    // map
    for (let elt of words){
        obj[elt] = (obj.elt || 0) +1;
        console.log(elt)
        console.log( obj[elt])

    }
    let max = 0;
    let word = '';

    Object.keys(obj).map((val)=>{
       
        max = (max <= obj[val]) ? obj[val] : max;
        word = (max <= obj[val]) ? val : word;

    });
    return word;
}

export { nbWords, mostOccurent }
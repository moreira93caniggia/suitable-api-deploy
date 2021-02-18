module.exports = (text) => {  
    var words = text.split('_').slice(0).join(' ').toLowerCase().split(" ");
    for (var a = 0; a < words.length; a++) {
        var w = words[a].replace('_',' ');
        words[a] = w[0].toUpperCase() + w.slice(1)
    }
    return words 
};

module.exports = (text) => {  
        var length = text.length; 
        var letter = text.substring(length, length-1);
        text = (letter ==='s' ? text.split('').reverse().join('').slice(length-length+1).split('').reverse().join(''):text); 
    return text; 
};

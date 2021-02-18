module.exports = (text) => {  
    var length = text.length; 
    var letter = text.substring(length, length-1);
    text = (letter !=='s' ? text+"s": text); 
return text; 
};
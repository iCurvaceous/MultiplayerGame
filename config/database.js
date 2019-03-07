if(process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI: 'mongodb+srv://karameli:Curv@c3ou$@cluster0-vesqf.mongodb.net/test?retryWrites=true'}
}
else{
    module.exports = {mongoURI: 'mongodb://localhost:27017/mutliplayergamedata'}
}
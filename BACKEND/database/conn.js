const mongoose = require('mongoose')

const conn = () => {
    mongoose.connect('mongodb://0.0.0.0:27017/CardioScan')
        .then(() => {
            console.log('connected to mongoDb')
        }).catch((error) => {
            console.log("unable to connect", error)
        })
}

module.exports = conn
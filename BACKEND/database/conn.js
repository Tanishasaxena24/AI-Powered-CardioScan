const mongoose = require('mongoose')

const conn = () => {
    mongoose.connect('mongodb+srv://harshsrms30:lVOSfp1qVnWBF6tH@cluster0.zo2kd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        .then(() => {
            console.log('connected to mongoDb')
        }).catch((error) => {
            console.log("unable to connect", error)
        })
}

module.exports = conn
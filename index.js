const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())

app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/users', require('./routes/users.route'))

async function start() {
    try {
        await mongoose.connect('mongodb+srv://khumora:xm258000@cluster0.ijthcc8.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        })
    } catch (error) {
        console.error(error)
    }
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join("client/build")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

start()
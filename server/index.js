require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const authRouter = require("./routes/auth")
const postRouter = require("./routes/post")

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.tufe9.mongodb.net/mern-stack?retryWrites=true&w=majority`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })

        console.log("MongoDB connected")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()
app.use(express.json())
app.use(cors())

// app.get('/', (req, res) => res.send("Hello world!"))
app.use('/api/auth', authRouter)
app.use('/api/post', postRouter)

PORT = 5000

app.listen(PORT, () => console.log(`App start on port ${PORT}`))
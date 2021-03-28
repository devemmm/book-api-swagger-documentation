const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const low = require('lowdb')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const booksRouter = require('./routes/books')

const PORT = process.env.PORT

const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

const app = express()
app.use(cors())
app.use(express.json())

db.defaults({ books:[] }).write()

const options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title: "Library API Documentation by Emmanuel NTIVUGURUZWA",
            version: "1.0.0",
            description: "A Simple Book Api developed by Emmanuel NTIVUGURUZWA for Learing Purpose Swagger Documentaion"
        },
        servers:[
            {
                url: `${process.env.SITE_URL}`
            }
        ]
        
    },
    apis:["./routes/*.js"]
}

const specs =swaggerJsDoc(options)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.db = db


app.use(morgan("dev"))
app.use(booksRouter)

app.listen(PORT, ()=>console.log(`Sever is running on Port ${PORT}`))
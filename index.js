import express from 'express';
import {conn} from "./src/config/database.js";
import "./src/models/index.js";
import { router } from './src/routes/index.js';
import cors from "cors"
const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

const PORT = 3000
const SERVER = "http://localhost:"
const URL = SERVER + PORT

app.listen(PORT, () => {
    console.log("El servidor esta nitido en: " + URL)
})

conn.authenticate()
    .then(() => {
        return conn.sync()
    })
    .then(() => console.log("Conexión nitida"))
    .catch((error) => console.log(error))
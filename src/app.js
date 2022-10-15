import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { pool } from './db.js'
import usuarioRoutes from './routes/usuario.routes.js'

const app = express()

app.get('/', async  (req, res) => res.send('Hola mundo'))

app.get('/ping', async  (req, res) => {
    const [result] = await pool.query('select 1 + 1 as result')
    res.json(result)
})


app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.get('/reportes', (req, res) => res.send('Obtener reportes'))


app.use(usuarioRoutes)

export default app 
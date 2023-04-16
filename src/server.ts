import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response, Express } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { appRoutes } from './routes/routes'


const app: Express = express()
const port: number = process.env.PORT as unknown as number

app.use(express.json())
app.use('/', appRoutes)
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

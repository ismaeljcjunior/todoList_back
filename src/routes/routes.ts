import * as dotenv from 'dotenv'
dotenv.config()
import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { deleteTask, getAllTasks, newTask, updateTask } from '../controller/taskController'
import { login } from '../controller/userController'
import { newUser, deleteUser } from './../controller/userController';

const app: Express = express()

app.use(bodyParser.json())
app.use(cors({ origin: '*' }))
app.use(express.json())

app.post('/newtask', newTask)
app.get('/tasks', getAllTasks)
app.put('/updatetask/:id', updateTask)
app.delete('/deletetask/:id', deleteTask)

app.post('/login', login)
app.post('/newUser', newUser)
app.delete('/deleteUser/:id', deleteUser)

export const appRoutes = app
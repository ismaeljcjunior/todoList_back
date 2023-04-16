import * as dotenv from 'dotenv'
dotenv.config()
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import axios, { AxiosResponse } from 'axios'
import { ITaskProps } from './../interfaces/interfaces';


const prisma = new PrismaClient()

export const newTask = async (req: Request, res: Response) => {
    const dataNewTask: ITaskProps = await req.body
    try {
        const newTask = await prisma.tasks.create({
            data: {
                task_name: dataNewTask.task_name?.trim() as string,
            }
        })
        console.log(newTask)
        res.status(200).json({ response: newTask })
    } catch (e) {
        console.log(e)
        return res.status(404).json({ response: e })
    }
}
export const updateTask = async (req: Request, res: Response) => {
    const dataId = Number(req.params.id)
    const data = req.body
    console.log(dataId, data)
    try {
        const updateTask = await prisma.tasks.update({
            where: {
                id_tasks: Number(dataId),
            },
            data: {
                task_name: data.task_name,
                task_status: data.task_status
                
            }
        })
        console.log(updateTask)
        res.status(200).json({ response: updateTask })
    } catch (e) {
        console.log(e)
        return res.status(404).json({ response: e })
    }
}
export const deleteTask = async (req: Request, res: Response) => {
    const dataId = Number(req.params.id)
    try {
        const deleteTask = await prisma.tasks.delete({
            where: {
                id_tasks: Number(dataId),
            },
        })
        console.log(deleteTask)
        res.status(200).json({ response: deleteTask })
    } catch (e) {
        return res.status(404).json({ response: e })
    }
}
export const getAllTasks = async (req: Request, res: Response) => {

    try {
        const allTasks = await prisma.tasks.findMany()
        console.log(allTasks)
        res.status(200).json({ response: allTasks })
    } catch (e) {
        return res.status(404).json({ response: e })
    }
}
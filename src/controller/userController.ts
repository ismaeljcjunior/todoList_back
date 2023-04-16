import * as dotenv from 'dotenv'
dotenv.config()
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import axios, { AxiosResponse } from 'axios'
import { ITaskProps, IUserLoginProps, IUserProps } from './../interfaces/interfaces'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const secret = 'secret'

export const newUser = async (req: Request, res: Response) => {
    const dataNewUser: IUserProps = req.body

    try {
        bcrypt.hash(dataNewUser.password_user as string, 10, async (e, hash) => {
            if (e) {
                res.status(500).send('Error cripting password')
            } else {
                const newUser = await prisma.users.create({
                    data: {
                        name_user: dataNewUser.name_user?.trim() as string,
                        login_user: dataNewUser.login_user?.trim() as string,
                        password_user: hash  // Salva o hash da senha no banco de dados
                    }
                })
                res.status(200).json({ response: newUser })
            }
        })
    } catch (e) {
        console.log(e)
        return res.status(404).json({ response: e })
    }

}
export const updateUser = async (req: Request, res: Response) => {
    const dataId = Number(req.params.id)
    const data: IUserProps = req.body
    console.log(dataId, data)
    try {
        const updateUser = await prisma.users.update({
            where: {
                id_users: Number(dataId),
            },
            data: {
                name_user: data.name_user,
                login_user: data.login_user,
                password_user: data.password_user

            }
        })
        console.log(updateUser)
        res.status(200).json({ response: updateUser })
    } catch (e) {
        console.log(e)
        return res.status(404).json({ response: e })
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    const dataId = Number(req.params.id)
    try {
        const userToDelete = await prisma.users.findUnique({
            where: {
                id_users: dataId
            }
        })
        console.log(userToDelete)
        if (!userToDelete) {
            return res.status(404).json({ response: "User not found" })
        }
        const deleteUser = await prisma.users.delete({
            where: {
                id_users: dataId,
            },
        })

        console.log(deleteUser)
        res.status(200).json({ response: deleteUser })
    } catch (e) {
        return res.status(500).json({ response: "Error delete user" })
    }
}
export const getUser = async (req: Request, res: Response) => {
    try {
        const allUser = await prisma.users.findMany()
        console.log(allUser)
        res.status(200).json({ response: allUser })
    } catch (e) {
        console.log(e)
        return res.status(404).json({ response: e })
    }
}
export const login = async (req: Request, res: Response) => {
    const dataUserLogin: IUserLoginProps = await req.body
    try {
        const user = await prisma.users.findUnique({
            where: {
                login_user: dataUserLogin.login_user,
            },
        })
        console.log(user)
        if (user && bcrypt.compareSync(req.body.login_user, user.password_user)) {
            const token = jwt.sign({ userId: user.id_users }, secret, { expiresIn: '1h' })
            res.json({ token })
        } else {
            res.status(401).json({ message: 'invalid credecials' })
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'error login' })
    }
}

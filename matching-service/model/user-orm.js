import {createUser, findUser, deleteUser, updateUser} from './repository.js'

export async function ormCreateUpdateUser(socketId, userId) {
    try {
        const existingUser = await ormFindUser(socketId)
        if (existingUser) {
            await ormUpdateUser(socketId, userId)
        } else {
            const newUser = await createUser({socketId, userId})
            newUser.save()
        }
    } catch( err) {
        console.log(err)
    }
}

export async function ormUpdateUser(socketId, userId) {
    try {
        await updateUser(socketId, userId)
    } catch (err) {
        console.log(err)
    }
}

export async function ormFindUser(socketId) {
    try {
        const user = await findUser(socketId)
        return user
    } catch (err) {
        console.log(err)
    }
}

export async function ormDeleteUser(socketId) {
    try {
        await deleteUser(socketId)
    } catch (err) {
        console.log(err)
    }
}
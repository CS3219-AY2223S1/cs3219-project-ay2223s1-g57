import {createMatch, findMatch, deleteMatch} from './repository.js'

export async function ormCreateMatch(user1, user2, roomId) {
    try {
        const newMatch = await createMatch({user1, user2, roomId})
        newMatch.save()
    } catch( err) {
        console.log(err)
    }
}

export async function ormFindMatch(user) {
    try {
        const match = await findMatch(user)
        return match
    } catch (err) {
        console.log(err)
    }
}

export async function ormDeleteMatch(user) {
    try {
        await deleteMatch(user)
    } catch (err) {
        console.log(err)
    }
}
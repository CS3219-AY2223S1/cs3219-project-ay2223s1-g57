import {createPendingMatch, findPendingMatch, deletePendingMatch} from './repository.js'

export async function ormCreatePendingMatch(user, roomId, difficulty) {
    try {
        const pendingMatch = await createPendingMatch({user, roomId, difficulty})
        pendingMatch.save()
    } catch (err) {
        console.log(err)
    }
}

export async function ormFindPendingMatch(user, difficulty) {
    try {
        const pendingMatch = await findPendingMatch(user, difficulty)
        return pendingMatch
    } catch (err) {
        console.log(err)
    }
}

export async function ormDeletePendingMatch(user) {
    try {
        await deletePendingMatch(user)
    } catch (err) {
        console.log(err)
    }
}
const { distance } = require('../utils/distance')
const { estaFIB } = require('../utils/estaFIB')

const createUser = async (parent, args, context) => {
    console.log(await context.prisma.user({ email: args.email }))
    const exists = await context.prisma.user({ email: args.email })
    if (exists != null) return exists;
    return context.prisma.createUser({
        name: args.name,
        email: args.email,
        winner: false,
        horari: {
            create: args.horari,
        },
        monedes: 0
    })
}

const deleteUser = (parent, args, context) => {
    return context.prisma.deleteUser({
        id: args.id
    })
}

const updateLastKnown = async (parent, args, context) => {
    if (estaFIB(args.latitude, args.longitude)) {
        return await context.prisma.updateUser({
            data: {
                latitude: args.latitude,
                longitude: args.longitude
            },
            where: { id: args.id }
        })
    } else {
        return await context.prisma.updateUser({
            data: {
                latitude: null,
                longitude: null
            },
            where: { id: args.id }
        })
    }
}

const createGame = async (parent, args, context) => {
    let users = await context.prisma.users();
    const size = users.length;
    /**
     * Shuffles array in place.
     * @param {Array} a items An array containing the items.
     */
    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }
    users = shuffle(users);
    for (let i = 0; i < size; ++i) {
        const pos = (i == size - 1) ? 0 : (i + 1);
        console.log(i, ' -> ', pos)
        const updatedUser = await context.prisma.updateUser({
            data: {
                objectiu: {
                    connect: { email: users[pos].email }
                },
                alive: true,
                winner: false
            },
            where: { id: users[i].id },
        })
    }
    return size != 0;
}

const matar = async (parent, args, context) => {
    const sender = await context.prisma.user({ id: args.id }) // usuari que vol matar
    const objectiu = await context.prisma.user({ id: args.id }).objectiu() // usuari objectiu del de sobre
    const objectiuObj = await context.prisma.user({ id: objectiu.id }).objectiu() // objectiu de l'objectiu
    const d = distance(sender.latitude, sender.longitude, objectiu.latitude, sender.longitude);
    if (d <= 15) {
        await context.prisma.updateUser({
            data: {
                objectiu: {
                    connect: { email: objectiuObj.email }
                }
            },
            where: { id: sender.id }
        })
        await context.prisma.updateUser({
            data: {
                alive: false,
                objectiu: { disconnect: true }
            },
            where: { id: objectiu.id }
        })
        if (sender.id == objectiuObj.id) { // ha guanyat!!
            await context.prisma.updateUser({
                data: {
                    alive: false,
                    objectiu: { disconnect: true },
                    winner: true
                },
                where: { id: sender.id }
            })
        }
        return true
    } else return false
}

const teClasse = async (parent, args, context) => {
    console.log(args)
    const classes = await context.prisma.user({ id: args.id }).horari()
    const classesDia = classes.filter((value) => value.dia_setmana == args.dia_setmana)
    for (let i = 0; i < classesDia.length; i++) {
        if ((args.hora >= (classesDia[i].inici)) && (args.hora <= (classesDia[i].inici + classesDia[i].durada)) && args.aula == classesDia[i].aules) {
            const m = await context.prisma.user({ id: args.id }).monedes();
            await context.prisma.updateUser({
                data: {
                    monedes: m + 20,
                },
                where: { id: args.id }
            })
            return true
        }
    }
    return false
}

module.exports = {
    createUser,
    deleteUser,
    updateLastKnown,
    createGame,
    matar,
    teClasse
}
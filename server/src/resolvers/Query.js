const { distance } = require('../utils/distance');
const { estaFIB } = require('../utils/estaFIB')

const users = (parent, args, context) => context.prisma.users();

const user = (parent, args, context, info) => context.prisma.user({ id: args.id });

const locationInRange = async (parent, args, context) => {
    const objectiu = await context.prisma.user({ id: args.id }).objectiu()
    const sender = await context.prisma.user({ id: args.id })
    const d = distance(sender.latitude, sender.longitude, objectiu.latitude, sender.longitude);
    return d <= 5;
}

const angle = async (parent, args, context) => {
    const p1 = await context.prisma.user({ id: args.id }).objectiu()
    const p2 = await context.prisma.user({ id: args.id })
    if (p1 == null || p2 == null) return 404.0;
    const angle = Math.atan2(p2.latitude - p1.latitude, p2.longitude - p1.longitude) * 180 / Math.PI;
    function getCardinal(angle) {
        /**
         * Customize by changing the number of directions you have
         * We have 8
         */
        const degreePerDirection = 360 / 8;

        /**
         * Offset the angle by half of the degrees per direction
         * Example: in 4 direction system North (320-45) becomes (0-90)
         */
        const offsetAngle = angle + degreePerDirection / 2;

        return (offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "Nord"
            : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "NordEst"
                : (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "Est"
                    : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "SudEst"
                        : (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "Sud"
                            : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "SudOest"
                                : (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "Oest"
                                    : "NordOest";
    }
    return getCardinal(angle);
}

const isThereMatch = async (parent, args, context) => {
    const users = await context.prisma.users()
    let count = 0;
    for (let i = 0; i < users.length; ++i) {
        if (users[i].winner) return false;
        if (users[i].alive != null && users[i].alive == true) count += 1;
        if (count > 1) return true;
    }
    return false;
}

const distanceObjective = async (parent, args, context) => {
    const objectiu = await context.prisma.user({ id: args.id }).objectiu()
    const sender = await context.prisma.user({ id: args.id })
    return distance(sender.latitude, sender.longitude, objectiu.latitude, sender.longitude);
}

const status = async (parent, args, context) => {
    const sender = await context.prisma.user({ id: args.id })
    const objectiu = await context.prisma.user({ id: args.id }).objectiu()
    console.log('sender status ', sender);
    console.log('objectiu status', objectiu)
    if (sender.winner) {
        await context.prisma.updateUser({
            data: {
                objectiu: { disconnect: true },
                alive: false
            },
            where: { id: args.id }
        })
        return 'Winner'
    }
    if (sender.alive) return 'Alive'
    else if (objectiu != null) {
        await context.prisma.updateUser({
            data: {
                objectiu: { disconnect: true }
            },
            where: { id: args.id }
        })
        return 'Dead'
    } else return 'Idle'
}

const objectiveInside = async (parent, args, context) => {
    const objectiu = await context.prisma.user({ id: args.id }).objectiu()
    const sender = await context.prisma.user({ id: args.id })
    return estaFIB(objectiu.latitude, objectiu.longitude);
}

const killer = async (parent, args, context) => {
    const sender = await context.prisma.user({ id: args.id })
    if (!sender.alive) return ""
    else {
        const users = await context.prisma.users();
        for (let i = 0; i < users.length; ++i) {
            const obj = await context.prisma.user({ id: users[i].id }).objectiu()
            if (users[i].alive && obj.id == sender.id) return users[i].name;
        }
    }
    return ""
}

module.exports = {
    users,
    user,
    locationInRange,
    angle,
    isThereMatch,
    distanceObjective,
    status,
    objectiveInside,
    killer
}
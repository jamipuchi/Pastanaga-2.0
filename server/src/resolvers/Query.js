const { distance } = require('../utils/distance');

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
    return angle;
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

module.exports = {
    users,
    user,
    locationInRange,
    angle,
    isThereMatch,
    distanceObjective
}
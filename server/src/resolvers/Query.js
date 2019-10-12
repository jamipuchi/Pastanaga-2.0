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
    const angle = Math.atan2(p2.latitude - p1.latitude, p2.longitude - p1.longitude) * 180 / Math.PI;
    return angle;
}

module.exports = {
    users,
    user,
    locationInRange,
    angle
}
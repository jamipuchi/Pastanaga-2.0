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

const teClasse = async (parent, args, context) => {
    const classes = await context.prisma.user({ id: args.id }).horari()
    const classesDia = classes.filter((value) => value.dia_setmana == args.dia_setmana)
    for (let i = 0; i < classesDia.length; i++) {
        console.log(classesDia[i])
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
    users,
    user,
    locationInRange,
    angle,
    teClasse
}
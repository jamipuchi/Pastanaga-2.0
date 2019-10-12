const objectiu = (parent, args, context) => context.prisma.user({ id: parent.id }).objectiu()

const horari = (parent, args, context) => context.prisma.user({ id: parent.id }).horari()

module.exports = {
    objectiu,
    horari
}
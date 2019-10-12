const objectiu = (parent, args, context) => context.prisma.user({ id: parent.id }).objectiu()

module.exports = {
    objectiu
}
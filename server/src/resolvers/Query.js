const users = (parent, args, context) => context.prisma.users();

const user = (parent, args, context, info) => context.prisma.user({ id: args.id });

module.exports = {
    users,
    user
}
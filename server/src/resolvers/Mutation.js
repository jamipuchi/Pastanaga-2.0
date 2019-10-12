const createUser = async (parent, args, context) => {
    return context.prisma.createUser({
        name: args.name,
        email: args.email
    })
}

const deleteUser = async (parent, args, context) => {
    return context.prisma.deleteUser({
        id: args.id
    })
}

module.exports = {
    createUser,
    deleteUser
}
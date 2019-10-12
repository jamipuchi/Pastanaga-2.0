const createUser = (parent, args, context) => {
    console.log(args)
    return context.prisma.createUser({
        name: args.name,
        email: args.email
    })
}

const deleteUser = (parent, args, context) => {
    return context.prisma.deleteUser({
        id: args.id
    })
}

const updateLastKnown = (parent, args, context) => {
    return context.prisma.updateUser({
        data: {
            latitude: args.latitude,
            longitude: args.longitude
        },
        where: { id: args.id }
    })
}

module.exports = {
    createUser,
    deleteUser,
    updateLastKnown
}
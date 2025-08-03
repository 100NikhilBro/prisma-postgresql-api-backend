const { prisma } = require('../DB/db.config.js');


exports.createUser = async(req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return;
        }

        const existUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (existUser) {
            return res.status(400).json({
                message: "user already exist"
            })
        }

        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password
            },
            select: {
                name: true,
                email: true
            }
        })



        return res.status(200).json({
            data: newUser,
            message: "User created successfully",
        })

    } catch (e) {
        return res.status(404).json({
            message: "Sever Error"
        })
    }
}


exports.updateUser = async(req, res) => {
    try {

        const userId = req.params.id;

        console.log(userId)

        if (!userId) {
            return
        }

        const { name, email, password } = req.body;

        if (!name | !email | !password) {
            return
        }

        const updateUser = await prisma.user.update({
            where: { id: Number(userId) },
            data: {
                name,
                email,
                password
            },
            select: {
                name: true,
                email: true,
            }
        });


        return res.status(200).json({
            data: updateUser,
            message: "User updated successfully"
        })

    } catch (e) {
        return res.status(404).json({
            message: "Failed to Upadate a User"
        })
    }
}


exports.getUser = async(req, res) => {
    try {

        const userId = req.params.id;

        if (!userId) {
            return
        }


        const user = await prisma.user.findUnique({
            where: { id: Number(userId) },
            select: {
                name: true,
                email: true,
                posts: {
                    select: {
                        title: true,
                        content: true
                    }
                },
                _count: { // yeh realtionship mein count lekr aata hai select / include ke saath use hita hai kuch is tareeke se 
                    select: {
                        posts: true,
                        comments: true
                    }
                },
                comments: true,
            }
        })

        return res.status(200).json({
            data: user
        })

    } catch (e) {
        return res.status(404).json({
            message: "Failed to fetch a User",
            'msg': e.message
        })
    }
}


exports.getAllUser = async(req, res) => {
    try {

        const users = await prisma.user.findMany({
            select: {
                name: true,
                email: true,
            }
        })

        return res.status(200).json({
            users: users
        })

    } catch (e) {
        return res.status(404).json({
            message: "Failed to fetch Users data"
        })
    }
}


exports.deleteUser = async(req, res) => {
    try {

        const userId = req.params.id;

        if (!userId) {
            return
        }

        const deleteUser = await prisma.user.delete({
            where: { id: Number(userId) },
            select: {
                name: true,
                email: true,
            }
        })

        return res.status(200).json({
            deletedUser: deleteUser,
            message: "User deleted successfully"
        })

    } catch (e) {

        return res.status(404).json({
            message: "Failed to delete a user"
        })

    }
}


exports.deleteAllUser = async(req, res) => {

    try {
        const deleteUser = await prisma.user.deleteMany({
            where: {
                name: { endsWith: 'v' }
            },
        });

        return res.status(200).json({
            deletedUsers: deleteUser.count
        })


    } catch (e) {
        return res.status(404).json({
            message: "Failed to delete this"
        })
    }
}
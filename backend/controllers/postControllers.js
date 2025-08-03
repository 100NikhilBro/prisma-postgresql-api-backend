const { prisma } = require('../DB/db.config');



exports.createPost = async(req, res) => {
    try {

        const { userId, title, content } = req.body;

        if (!userId || !title || !content) {
            return;
        }

        const userExists = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            }
        });


        if (!userExists) {
            return res.status(400).json({ message: "User does not exist" });
        }


        const duplicatePost = await prisma.post.findFirst({
            where: {
                title: title,
                content: content,
            }
        })

        if (duplicatePost) {
            return res.json("Duplicate Post")
        }

        const newPost = await prisma.post.create({
            data: {
                user_id: Number(userId),
                title,
                content,
            }
        })


        return res.status(200).json({
            data: newPost
        })


    } catch (e) {
        return res.status(404).json({
            message: e.message

        })
    }
}


exports.updatePost = async(req, res) => {
    try {

        const userId = req.params.id;

        if (!userId) {
            return
        }

        const { title, content } = req.body;

        if (!title || !content) {
            return
        }

        const posttoUpdate = await prisma.post.findFirst({
            where: {
                user_id: Number(userId)
            }
        })


        if (!posttoUpdate) {
            return
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: Number(posttoUpdate.id)
            },
            data: {
                title: title,
                content: content
            }

        })

        return res.json({
            updatedPost
        })

    } catch (e) {
        return res.json({
            'msg': e.message
        })
    }
}


exports.getPost = async(req, res) => {
    try {

        const userId = req.params.id;

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        if (page <= 0) {
            page = 1;
        }


        if (limit <= 0 || limit > 100) {
            limit = 10;
        }

        const skip = (page - 1) * limit;




        if (!userId) {
            return
        }

        const existUser = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            }
        })

        if (!existUser) {
            return
        }

        const post = await prisma.post.findMany({
            // Paging
            skip: skip,
            take: limit,
            // iske baad ka code 
            where: {
                user_id: Number(userId),
                // comment_count: { gte: 0 },
                // OR: [ // same tareeke se AND bhi lga skte ho same 
                //     {
                //         title: { startsWith: 'a' },
                //     },
                //     {
                //         title: { endsWith: 'k' }
                //     }
                // ],
                // NOT: { // NOT bhi kuch is tareeke se lga skta hai apun 
                //     title: { endsWith: 'c' }
                // }

            },
            select: {
                comments: {
                    select: {
                        comment: true,
                        created_at: true
                    }
                },
                title: true,
                content: true,
            },
            orderBy: {
                id: 'desc'
            },
        })


        const totalPosts = await prisma.post.count();
        const totalPages = Math.ceil(totalPosts / limit);




        return res.json({
            post,
            meta: {
                totalPages,
                currentPage: page,
                limit: limit
            }
        })


    } catch (e) {
        return res.json({
            'msg': e.message
        })
    }
}


exports.deletePost = async(req, res) => {
    try {

        const userId = req.params.id;
        const postId = req.params.pid;

        if (!userId && !postId) {
            return
        }

        const existUser = await prisma.user.findUnique({
            where: {
                id: Number(userId),
            }
        })


        if (!existUser) {
            return
        }


        const post = await prisma.post.findFirst({
            where: {
                id: Number(postId),
                user_id: Number(userId),
            }
        });

        if (!post) {
            return
        }

        const deletedPost = await prisma.post.delete({
            where: {
                id: Number(postId)
            }
        })

        return res.json({
            deleteddata: deletedPost
        })

    } catch (e) {

        return res.json({
            'message': e.message
        })

    }
}




// yeh -> jo apun ne fullText use kiya hai na usse hai search krne ke liye 

exports.search = async(req, res) => {
    try {

        const query = req.query.q;

        if (!query) {
            return
        }

        const post = await prisma.post.findMany({
            where: {
                content: {
                    search: query
                }
            }
        })

        return res.json({
            post
        })

    } catch (e) {
        return res.json({
            message: e.message
        })
    }
}
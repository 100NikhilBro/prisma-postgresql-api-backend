const { prisma } = require('../DB/db.config.js');


exports.createComment = async(req, res) => {
    try {

        const userId = req.params.id;
        const postId = req.params.pid;

        if (!userId || !postId) {
            return
        }

        const existingPost = await prisma.post.findFirst({
            where: {
                id: Number(postId),
                user_id: Number(userId)
            }
        })

        if (!existingPost) {
            return
        }

        const { comment } = req.body;

        if (!comment || comment.trim() === "") {
            return
        }

        const existingComment = await prisma.comment.findFirst({
            where: {
                comment: comment,
                user_id: Number(userId),
                post_id: Number(postId)
            }
        })

        if (existingComment) {
            return
        }

        const newComment = await prisma.comment.create({
            data: {
                comment,
                post_id: Number(postId),
                user_id: Number(userId)
            }
        })


        return res.json({
            newComment
        })


    } catch (e) {
        return res.json({
            'msg': e.message
        })
    }
}


exports.updateComment = async(req, res) => {
    try {


        const userId = req.params.id;
        const postId = req.params.pid;
        const commentId = req.params.cid;


        if (!userId || !postId || !commentId) {
            return
        }

        const { comment } = req.body;

        if (!comment || typeof comment !== 'string' || comment.trim() === '') {
            return
        }

        const commenttoUpdate = await prisma.comment.findFirst({
            where: {
                id: String(commentId),
                user_id: Number(userId),
                post_id: Number(postId),
            }
        })

        if (!commenttoUpdate) {
            return
        }

        const updatedCommet = await prisma.comment.update({
            where: {
                id: String(commenttoUpdate.id)
            },
            data: {
                comment: comment
            }
        })

        return res.json({
            updatedCommet
        })



    } catch (e) {
        return res.json({
            'message': e.message
        })
    }
}


exports.deleteComment = async(req, res) => {
    try {

        const userId = Number(req.params.id);
        const postId = Number(req.params.pid);
        const commentId = req.params.cid;

        if (!userId || !postId || !commentId) {
            return
        }


        const comment = await prisma.comment.findFirst({
            where: {
                id: commentId,
                user_id: userId,
                post_id: postId,
            }
        });

        if (!comment) {
            return
        }

        const deleteComment = await prisma.comment.delete({
            where: {
                id: comment.id
            }
        })


        return res.json({
            deleteComment: deleteComment
        })

    } catch (e) {
        return res.json({
            'msg': e.message
        })
    }
}


exports.getCommentonPost = async(req, res) => {

    const postId = req.params.pid;

    if (!postId) {
        return
    }

    const existingPost = await prisma.post.findUnique({
        where: { id: Number(postId) }
    });

    if (!existingPost) {
        return res.status(404).json({ message: "Post not found" });
    }


    const commentonPost = await prisma.post.findMany({
        where: {
            id: Number(postId)
        },
        select: {
            comments: {
                select: {
                    comment: true,
                    created_at: true
                }
            },
            comment_count: true
        }
    })

    if (!commentonPost) {
        return
    }

    return res.json({
        commentonPost
    })

}
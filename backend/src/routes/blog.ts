import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@prajyot_mane/blogapp-commons";

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
    Variables: {
        userId: string;
    }
}>();

//auth middleware
blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET)
        if (user) {
            
            c.set('userId', user.id as string);
            await next();
        } else {
            c.status(403);
            return c.json({
                msg: "You are not loggedin"
            })
        }    
    } catch (error) {
        c.status(403)
        return c.json({
            msg: "Please Login"
        })
    }
    
})

//Add Pagination

//getting all blogs
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

    const allblogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

	return c.json({
        allposts: allblogs
    })
})

//getting specific blog
blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    // const body = await c.req.json();
    try {
        const blog = await prisma.post.findUnique({
            where:{
                id : c.req.param('id')
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select:{
                        name: true
                    }
                }
            }
        })
        return c.json({
            blog
        })    
    } catch (error) {
        c.status(411);
        return c.json({
            error: "Error while fetching the blog"
        })
    }
    
})

//creating a blog
blogRouter.post('/create/', async (c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
    const userId = c.get('userId');
    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })
	return c.json({
        id: blog.id,
        msg: "Posted Successfully"
    })
})

//updating a blog
blogRouter.put('/:id',async (c) => {
    const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
    const blog = await prisma.post.update({
        where: {
            id: c.req.param('id')
        },
        data: {
            title: body.title,
            content: body.content
        }
    })
	return c.text('Blog Uppedated')
})



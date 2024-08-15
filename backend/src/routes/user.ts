
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { sign } from 'hono/jwt'
import { signupInput, loginInput } from '@prajyot_mane/blogapp-commons'

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();


userRouter.post('/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = signupInput.safeParse(body);
	if(!success){
		c.status(411)
			return c.json({
				msg: "Inputs are not correct"
			})
	}
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password,
        name: body.name
			}
		});
		const token = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({
       jwt :token 
      });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})

userRouter.post('/login',async  (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
  const body = await c.req.json();
  const { success } = loginInput.safeParse(body);
  if(!success){
	c.status(411);
	return c.json({
		msg: "Inputs are not correct"
	})
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password
    }
  })
  //if user does not exits
  if(!user){
    c.status(403);
    return c.json({error: "Check login credentials"})
  }
  //if exists pass the jwt
  const token = await sign({id: user.id}, c.env.JWT_SECRET);
	return c.json({
    jwt: token,
    msg: "Logged In"
  })
})

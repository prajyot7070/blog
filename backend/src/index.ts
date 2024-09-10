// ****** TODO ******
// [*] - Zod Validations
// [ ] - Password Hashing
// [ ] - Scheduling Posts
// [ ] - DOB, Publish date maybe categories/tags , likes
// [ ] - UI (Support GIF's, Imgs use CDN's, Read Later, Dark-Light mode,
//       Login Page should appear after some time like medium )
// [ ] - Login with google



import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors';
// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();

// Configure CORS middleware
app.use('/*', cors());
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);



export default app;

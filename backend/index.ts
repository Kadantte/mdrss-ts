import { feedHandler } from './routes/feed'
import { frontendHandler } from './routes/frontend'

const server = Bun.serve({
	fetch(request) {
		const url = new URL(request.url)
		if (url.pathname === '/feed') return feedHandler(request)
		return frontendHandler(request, url)
	},
	maxRequestBodySize: 500 * 1024
})

console.log(`Server running at ${server.url}`)

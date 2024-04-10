import path from 'path'

const FRONTEND_PATH = path.join(__dirname, '../../../frontend/.output/public')

export const frontendHandler = async (
	req: Request,
	url: URL
): Promise<Response> => {
	let targetFilePath = url.pathname === '/' ? '/index.html' : url.pathname
	targetFilePath = path.join(FRONTEND_PATH, targetFilePath)
	if (!targetFilePath.startsWith(FRONTEND_PATH)) {
		return new Response('Forbidden', { status: 403 })
	}
	const file = Bun.file(targetFilePath)
	if (!(await file.exists())) {
		return new Response('Not Found', { status: 404 })
	}
	return new Response(file)
}

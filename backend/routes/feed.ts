export const feedHandler = async (req: Request): Promise<Response> => {
	return new Response(JSON.stringify({ ok: 'ok' }), {
		headers: { 'content-type': 'application/json' }
	})
}

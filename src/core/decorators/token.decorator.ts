import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Token = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()

	const authHeader = request.headers['authorization']

	if (!authHeader) {
		return null
	}

	const [, token] = authHeader.split(' ')

	return token || null
})

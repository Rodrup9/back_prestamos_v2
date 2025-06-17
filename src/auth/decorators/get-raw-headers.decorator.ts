import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetRawHeaders = createParamDecorator(
    (data, ctx: ExecutionContext) => {
        return ctx.switchToHttp().getRequest().rawHeaders;
    }
);
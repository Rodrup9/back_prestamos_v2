import { UserResponse } from "./user.response";

export const FindAllUserResponse = {
    status: 200,
    example: {
        error: false,
        response: [
            UserResponse,
            UserResponse
        ]
    }
}
export interface AuthJwtPayload {
    sub: number,
    unique_name?: string
    iat?: number,
    exp?: number,
}
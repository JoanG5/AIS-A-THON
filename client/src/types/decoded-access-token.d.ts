export interface DecodedAccessToken {
    token_type: string;
    exp: number;
    iat: number;
    jti: number;
    user_id: number;
    badge_id: string;
}
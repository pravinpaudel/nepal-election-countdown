export type SubscribeResponse = {
    success: boolean;
    message: string;
    email?: string;
    isVerified?: boolean;
    isActive?: boolean;
};

export type VerifyResponse = {
    success: boolean;
    message: string;
    isVerified: boolean;
};
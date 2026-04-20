export declare const ROLE: {
    readonly ADMIN: 1;
    readonly USER: 2;
};
export type RoleId = (typeof ROLE)[keyof typeof ROLE];

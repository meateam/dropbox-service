export type DirectionType = {
    from: string,
    to: string[]
}
export interface IStatus {
    id: string;
    status: string;
    direction: DirectionType;
}
export type DirectionType = {
  from: string,
  to: string[],
};

export type Status = {
  status: string,
  displayName: string,
};
export interface IStatus {
  id: string;
  status: Status;
  direction: DirectionType;
}

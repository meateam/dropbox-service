export type DirectionType = {
  from: string,
  to: string[],
};

export type Status = {
  type: string,
  name: string,
  displayName: string,
};

export interface IStatus {
  id: string;
  status: Status[];
  classification: string;
  direction: DirectionType;
}

export interface IUser {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  hierarchy?: string[];
  hierarchyFlat: string;
  mail: string;
  domainUser?: IDomainUser;
}

export interface IDomainUser {
  dataSource?:string;
  uniqueID?: string;
  adfsUID?: string;
}

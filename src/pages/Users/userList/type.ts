
export interface ISorted {
    currentPage: number;
    orderBy: boolean;
    skip: number;
    sortField: string;
    take: number;
    pageSize: number;
  }
  
 export interface IStatus {
    id: number;
    isActive: boolean;
  }
export interface IUser{
    userId: number;
    userName: string;
    
}

export class User implements IUser{

    constructor(
        public userId: number,
        public userName: string)
        {}
  

}
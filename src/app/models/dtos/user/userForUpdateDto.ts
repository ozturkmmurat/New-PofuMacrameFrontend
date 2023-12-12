export interface UserForUpdateDto{
    id:number;
    firstName:string;
    lastName:string;
    phoneNumber:string;
    oldPassword:string;
    newPassword:string;
    email:string;
}
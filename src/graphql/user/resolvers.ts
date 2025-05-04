import UserService, { CreateUserPayload } from "../../services/user";

const queries = {
 getUserToken: async(_:any,paylaod:{email:string, password:string}) =>{
   const token = await UserService.getUserToken({
      email:paylaod.email,
      password:paylaod.password
   })
   return token;
 },
 getCurrentLoggedInUser: async(_:any,parameters:any,context: any)=>{
   if(context && context.user){

      const id = context.user.id;
      const user = await UserService.getUserById(id)
      return user;
   }
   throw new Error("I dont know who you are")

 }

}

const mutations = {
   createUser: async(_ :any,payload:CreateUserPayload)=>{
    const response = await UserService.createUser(payload);
    return response.id;
   } 
};

export const resolvers ={queries, mutations};
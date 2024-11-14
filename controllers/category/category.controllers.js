import Category from "../../models/category/category.models.js";


export const createCategory = async (req,res)=>{
    console.log(req.user._id);
    const {name} = req.body; //chk
    //findOne --pahly py bani ha chk??
    const category =await new Category({name});//chk
   const c =  await category.save(); //chk var chk
   if(!c){
    return res.status(400);
   }
    res.send({"msg":"add sucess"})
}

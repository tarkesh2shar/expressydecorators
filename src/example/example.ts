import express,{Request,Response} from 'express';
import {Router} from 'express'
import {InitializeDecorators} from '../'
const app=express();
const router=Router();
app.get('/',(req:Request,res:Response)=>{ 
    res.send({hello:"world"}) 
})
 InitializeDecorators(router)
app.use(router)
app.listen('8080',()=>{
    console.log("listening to port 8080 !");
    
})
import  './SampleController'
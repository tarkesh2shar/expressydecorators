import express,{Request,Response,NextFunction,Router} from 'express'
import {Controller,Get} from '../'
@Controller('/auth')
export class LoginController {
    @Get('/login') 
    getLogin(req:Request,res:Response){
        res.send({hello:"world"}) 
    } 
}
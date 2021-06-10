import 'reflect-metadata';
import {Methods} from '../../enums/Methods'
import {MetaDataKeys} from '../../enums/MetaDataKeys'
import {router}  from '../init';
export function Controller(prefix:string){
    if(router){
    return function(target:Function){
        for (const key in target.prototype) {
                const routeHandler=target.prototype[key] //get, post , put , patch , etc,etc
                const path= Reflect.getMetadata(MetaDataKeys.path,target.prototype,key); 
                const method:Methods= Reflect.getMetadata(MetaDataKeys.Method,target.prototype,key); 
                if(path){
                    let modifiedPath=`${prefix}${path}`;
                    console.log("modified Path",modifiedPath);
                    router[method](`${prefix}${path}`,routeHandler)
                }
            }
        }
     }
     else{
         throw new Error("An instance of Express Router is required")
     }
    }

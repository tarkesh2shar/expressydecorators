import 'reflect-metadata';
import {Methods} from '../../enums/Methods'
import {MetaDataKeys} from '../../enums/MetaDataKeys'
function routerBinder(method:string){
return function (path:string){
    return function(target:any,key:string,desc:PropertyDescriptor){
        Reflect.defineMetadata(MetaDataKeys.path,path,target,key);
        Reflect.defineMetadata(MetaDataKeys.Method,'get',target,key); 
    }
}
}

export const Get=routerBinder(Methods.Get);
export const Put=routerBinder(Methods.Put);
export const Post=routerBinder(Methods.Post);
export const Delete=routerBinder(Methods.Delete);
export const Patch=routerBinder(Methods.Patch);
import {Router} from 'express';
export let router:Router;
export function InitializeDecorators(ro:Router){
    router=ro;
}

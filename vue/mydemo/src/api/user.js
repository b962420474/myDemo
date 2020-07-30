import service from "../libs/service";
export function login(data){
    return service.ajax.post("/login",data);
}
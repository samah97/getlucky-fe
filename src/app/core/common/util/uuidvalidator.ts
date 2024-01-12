const uuidPattern = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
export class UUIDValidator {
    

    public static isValid(uuid:string){
        return uuidPattern.test(uuid);
    }

}

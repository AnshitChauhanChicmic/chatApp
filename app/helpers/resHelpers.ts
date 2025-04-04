const RESPONSE = {
    SUCCESS: (msg: string, data: any) => {
        let obj = {
            statusCode: 200,
            message: msg || ''
        };
        if(data){
            obj = Object.assign(obj, data);
        }
        return obj;
    },
    ERROR: (msg: string) => {
        let obj = {
            statusCode: 400,
            message: msg || ''
        };
        return obj
    }
}

export function createSuccessResponse(message: string, data?: object){
    return RESPONSE.SUCCESS(message, data);
}

export function createErrorResponse(message: string){
    return RESPONSE.ERROR(message);
}
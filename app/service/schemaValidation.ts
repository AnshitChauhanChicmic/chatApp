import { Request, Response, NextFunction } from "express";

function checkValidations(schema: any, data: object) {
    const { error } = schema.validate(data);

    if (error) {
        throw new Error(error.details[0].message);
    }
}

export const schemaValidation = (schema: any) => {
    return (request: Request, response: Response, next: NextFunction) => {
        try {
            if (schema.body) {
                checkValidations(schema.body, request.body);
            }
            if (schema.params) {
                checkValidations(schema.params, request.params);
            }
            if (schema.query) {
                checkValidations(schema.query, request.query);
            }
            next();
        } catch (error: any) {
            return response.status(400).json({ message: error.message })
        }
    }
}
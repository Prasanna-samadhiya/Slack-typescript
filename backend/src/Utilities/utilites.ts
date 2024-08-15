import { Response } from 'express';

const CorrectHandler = (res: Response, message: string, statuscode: number) => {
    return res.status(statuscode).json({
        success: true,
        message: message,
        res
    });
}

const ErrorHandler = (res: Response, message: string, statuscode: number) => {
    return res.status(statuscode).json({
        success: false,  // Assuming this should be false since it's an error handler
        message: message,
        res
    });
}

const UndefinedHandler = (res: Response, message: string, statuscode: number) => {
    return res.status(statuscode).json({
        success: false,  // Assuming this should be false since it's an undefined handler
        message: message,
        res
    });
}

export { CorrectHandler, ErrorHandler, UndefinedHandler };

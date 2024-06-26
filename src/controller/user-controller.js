import { ResponseJson } from "../responseHandler/response-json.js";
import { ResponseSuccess } from "../responseHandler/response-success.js";
import { userService } from "../service/user-service.js";

class UserController {

    async register (req, res, next) {
        try {
            const result = await userService.register(req.body);
            const response = new ResponseSuccess(201, result);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }
    
    async getAll (req, res, next) {
        try {
            const result = await userService.getAll();
            const response = new ResponseSuccess(200, result);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    async getById (req, res, next) {
        try {
            const result = await userService.getById(req);
            const response = new ResponseSuccess(200, result);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
    
    async update(req, res, next) {
        try {
            const result = await userService.update(req);
            const response = new ResponseJson(200, result);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
    
    async delete(req, res, next) {
        try {
            const result = await userService.delete(req);
            const response = new ResponseSuccess(204, result);
            res.status(204).json(response);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();
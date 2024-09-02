import { fMsg } from "../utils/libby.js";

export const test = (req, res, next) => {
    try {
        fMsg(res, "Test", null, 200);
    } catch (error) {
        next(error);
    }
};

import Ajv from "ajv";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";

const ajv = new Ajv({allErrors:true});
addFormats(ajv);
ajvErrors(ajv);

const validate = (schema) => {
    const test = ajv.compile(schema);

    return (req, res, next) => {
        const valid = test(req.body);
        if (!valid) return res.status(400).json(test.errors);
        next();
    };
};

export default validate;
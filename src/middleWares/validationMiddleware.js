
const reqKey  = ['params','body','query','headers']

export const validationMiddleware = (schema) => {
    return (req, res, next) => {
        // console.log(req);
        let validationErrors = [];

        for (const key of reqKey) {
            const validationResult = schema[key]?.validate(req[key], { abortEarly: false });
            if (validationResult?.error) {
                validationErrors.push(...validationResult.error.details);
            }
        }
        if (validationErrors.length) {
            return res.status(400).json({
                errorMessage: "Validation Error",
                validationErrors: validationErrors.map((el) => {
                    return el.message
                }),
            });
        }

        next();
    };
};

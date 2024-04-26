const validateJoi_Body = joiSchema => async (req, res, next) => {
    try {
        await joiSchema.validateAsync(req.body);
        next();
    } catch (error) {
        return res.status(400).json({ Mensagem: error.message });
    }
};

module.exports = {
    validateJoi_Body
};
const joi = require('joi');

const schemaProduto = joi.object({
    descricao: joi.string().trim().messages({
        'any.required': 'O campo descrição é obrigatório',
        'string.empty': 'O campo descrição é obrigatório'
    }),
    quantidade_estoque: joi.string().regex(/^[1-9]\d*$/).required().messages({
        'any.required': 'O campo quantidade_estoque é obrigatório',
        'string.empty': 'O campo quantidade_estoque é obrigatório',
        'string.pattern.base': 'O campo quantidade_estoque só aceita números inteiros, positivos e válidos no seu preenchimento'
    }),
    valor: joi.string().regex(/^[1-9]\d*$/).required().messages({
        'any.required': 'O campo valor é obrigatório',
        'string.empty': 'O campo valor é obrigatório',
        'string.pattern.base': 'O campo valor só aceita números inteiros, positivos e válidos no seu preenchimento'
    })
});

module.exports = schemaProduto



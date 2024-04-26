const Joi = require('joi');
const { cpf } = require('cpf-cnpj-validator');
const moment = require('moment');

const schemaCliente = Joi.object({
    cpf: Joi.string().min(11).max(14).trim().required().trim().custom((entrada, invalido) => {
        if (!cpf.isValid(entrada)) {
            return invalido.error('any.invalid');
        }
        return entrada;
    }).messages({
        'any.required': 'O campo CPF e obrigatorio',
        'any.invalid': 'Digite um CPF válido',
        'string.empty': 'O campo CPF e obrigatorio',
        'string.min': 'digite os 11 digitos do seu CPF.',
        'string.max': 'Insira o seu CPF no formato 333.333.333-33'
    }),
    nome_completo: Joi.string().regex(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ -]+$/).trim().required().messages({
        'any.required': 'O campo nome e obrigatorio',
        'string.empty': 'O campo nome e obrigatorio',
        'string.pattern.base': 'O campo nome nao aceita numeros'

    }),
    data_de_nascimento: Joi.string()
        .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
        .custom((value, helpers) => {
            const date = moment(value, 'DD/MM/YYYY', true);

            if (!date.isValid()) {
                return helpers.message('A data fornecida não é uma data válida');
            }

            return value;
        })
        .messages({
            'string.base': 'A data fornecida não é uma string',
            'string.empty': 'A data não pode estar vazia',
            'string.pattern.base': 'A data fornecida não está no formato DD/MM/YYYY',
        }),
    email: Joi.string().required().email().messages({
        'string.email': 'O campo email precisa ter um formato válido',
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email não pode estar vazio',
    }),
    senha: Joi.string().min(5).required().messages({
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha não pode estar vazio',
        'string.min': 'A senha precisa conter, no mínimo, 5 caracteres',
    }),
});

const schemaLogin = Joi.object({
    email: Joi.string().required().email().messages({
        'string.email': 'O campo email precisa ter um formato válido',
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email não pode estar vazio',
    }),
    senha: Joi.string().min(5).required().messages({
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha não pode estar vazio',
        'string.min': 'A senha precisa conter, no mínimo, 5 caracteres',
    }),
});

module.exports = {
    schemaCliente,
    schemaLogin
}


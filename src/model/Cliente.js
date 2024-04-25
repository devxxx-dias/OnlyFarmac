const knex = require("../config/connection");

class Cliente {
    #cpf
    #nome_completo
    #data_de_nascimento
    #email
    #senha

    constructor(cpf, nome_completo, data_de_nascimento, email, senha) {
        this.#cpf = cpf;
        this.#nome_completo = nome_completo;
        this.#data_de_nascimento = data_de_nascimento;
        this.#email = email;
        this.#senha = senha;

    }


    checarEmailExistente = async () => {
        const emailCadastrado = await knex('clientes')
            .where({ email: this.#email })
            .first();
        return emailCadastrado;

    }

    oEmailPertenceAoCliente = async () => {
        const emailCadastrado = await knex('clientes')
            .whereNot({ email: this.#email })
            .first();
        return emailCadastrado;

    }

    checarCpfExistente = async () => {
        const cpfCadastrado = await knex('clientes')
            .where({ cpf: this.#cpf })
            .first();
        return cpfCadastrado;
    }

    oCpfPertenceAoCliente = async () => {
        const cpfCadastrado = await knex('clientes')
            .whereNot({ cpf: this.#cpf })
            .first();

        return cpfCadastrado;
    }

    registrarBancoDeDados = async () => {
        const clienteNovo = await knex('clientes')
            .insert({ cpf: this.#cpf, nome_completo: this.#nome_completo, data_de_nascimento: this.#data_de_nascimento, email: this.#email, senha: this.#senha })
            .returning('*');
        return clienteNovo[0];

    }


}


module.exports = Cliente;
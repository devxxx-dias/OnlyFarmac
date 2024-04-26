const knex = require("../config/connection");
const Cliente = require("../model/Cliente");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const cadastrarCliente = async (req, res) => {
    const { cpf, nome_completo, data_de_nascimento, email, senha } = req.body;

    try {
        const novoCliente = new Cliente(cpf, nome_completo, data_de_nascimento, email, senha);

        if (await novoCliente.checarEmailExistente()) {
            return res.status(400).json({ mensagem: 'Já existe um cliente cadastrado com o e-mail informado.' });
        }

        if (await novoCliente.checarCpfExistente()) {
            return res.status(400).json({ mensagem: 'Já existe um cliente cadastrado com o cpf informado.' });
        }

        return res.status(201).json(await novoCliente.registrarBancoDeDados());

    } catch (error) {

        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }

};

const loginCliente = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const dadosUsuario = await knex('clientes')
            .where({ email })
            .first();

        if (!dadosUsuario) { return res.status(401).json({ mensagem: `E-mail ou senha inválidos.` }); }

        const verificarSenha = await bcrypt.compare(senha, dadosUsuario.senha);

        if (!verificarSenha) { return res.status(401).json({ mensagem: `E-mail ou senha inválidos.` }); }

        const token = jwt.sign({ id: dadosUsuario.id }, process.env.SENHAHASH, { expiresIn: '8h' });

        const { senha: password, ...usuario } = dadosUsuario

        return res.status(200).json({ usuario, token });
    } catch (error) {

        return res.status(500).json({ Mensagem: 'Erro inesperado do sistema.' });
    }
};


const atualizarCliente = async (req, res) => {
    const { cpf, nome_completo, data_de_nascimento, email, senha } = req.body;

    try {
        const novoCliente = new Cliente(cpf, nome_completo, data_de_nascimento, email, senha);

        if (await novoCliente.oEmailPertenceAoCliente(req.usuario.id)) {
            return res.status(400).json({ mensagem: 'Já existe um cliente cadastrado com o e-mail informado.' });
        }

        if (await novoCliente.oCpfPertenceAoCliente(req.usuario.id)) {
            return res.status(400).json({ mensagem: 'Existe um cliente cadastrado com o cpf informado.' });
        }

        const entrada = await novoCliente.atualizarBancoDeDados(req.usuario.id);
        //depois remover essa variavel entrada, no status 201 ou 204 nao e uma boa pratica devover um resultado
        return res.status(201).json(entrada);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }

};

const obterPerfil = async (req, res) => {
    // Caso decidam nao mostrar o id  - const { id, ...cliente } = req.usuario
    return res.status(200).json(req.usuario);
}

const listarClientes = async (req, res) => {

    try {
        const listaDeClientes = await knex('clientes');
        return res.status(200).json(listaDeClientes);
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }

}

const excluirCliente = async (req, res) => {
    try {
        const deletarRegistro = await knex('clientes')
            .delete()
            .where({ id: req.usuario.id })
            .returning('*')


        return res.status(201).json(deletarRegistro);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }



}

module.exports = {
    cadastrarCliente,
    loginCliente,
    atualizarCliente,
    obterPerfil,
    listarClientes,
    excluirCliente
};
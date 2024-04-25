const knex = require("../config/connection");
const Cliente = require("../model/Cliente");


const cadastrarCliente = async (req, res) => {
    const { cpf, nome_completo, data_de_nascimento, email, senha } = req.body;

    try {
        const novoCliente = new Cliente(cpf, nome_completo, data_de_nascimento, email, senha);

        if (await novoCliente.checarEmail()) {
            return res.status(400).json({ mensagem: 'Já existe um cliente cadastrado com o e-mail informado.' });
        }

        if (await novoCliente.checarCpf()) {
            return res.status(400).json({ mensagem: 'Já existe um cliente cadastrado com o cpf informado.' });
        }

        return res.status(201).json(await novoCliente.registrarBancoDeDados());

    } catch (error) { return res.status(500).json({ mensagem: "Erro interno do servidor" }) }

};

//inserir a parte de login

// const atualizarCliente = async (req, res) => {
//     const { cpf, nome_completo, data_de_nascimento, email, senha } = req.body;

//     try {
//         const novoCliente = new Cliente(cpf, nome_completo, data_de_nascimento, email, senha);

//         if (await novoCliente.oEmailPertenceAoCliente()) {
//             return res.status(400).json({ mensagem: 'Já existe um cliente cadastrado com o e-mail informado.' });
//         }

//         if (await novoCliente.oCpfPertenceAoCliente()) {
//             return res.status(400).json({ mensagem: 'Existe um cliente cadastrado com o cpf informado.' });
//         }

//         return res.status(2014).json();

//     } catch (error) { return res.status(500).json({ mensagem: "Erro interno do servidor" }) }

// };



module.exports = {
    cadastrarCliente,
    // atualizarCliente
};
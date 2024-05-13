const knex = require("../config/connection");


const cadastrarProduto = async (req, res) => {
    let { descricao, quantidade_estoque, valor } = req.body;

    try {

        const ehAtualizar = await knex('produtos').where({ descricao }).first()
        if (ehAtualizar) {
            return res.status(400).json({ Mensagem: "Já existe um produto com essa descrição e id de categoria registrado, considere ir ao campo atualizar Produto" })
        }

        const atualizarCampos = {
            descricao,
            quantidade_estoque,
            valor
        };

        let produtoAtualizado = await knex('produtos')
            .insert(atualizarCampos)
            .returning('*');


        const produto = produtoAtualizado.map(intem => {
            return {
                "id": String(intem.id),
                "descricao": intem.descricao,
                "quantidade_estoque": intem.quantidade_estoque,
                "valor": intem.valor
            }

        })
        return res.status(201).json(produto[0]);
    } catch (error) { return res.status(500).json({ mensagem: 'Erro interno no servidor.' }); }
};

const detalharProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const consulta = await knex('produtos').where({ id }).first()

        if (!consulta || consulta.length === 0) {
            return res.status(404).json({ Mensagem: `Não foi encontrado nenhum produto com o ID selecionado.` })
        }

        return res.status(200).json(consulta);
    } catch (error) { return res.status(500).json({ mensagem: 'Erro interno no servidor.' }); }
};

const filtroProdutoQuery = async (req, res) => {
    const nomeDoProduto = req.query.nome_do_produto;

    try {
        if (nomeDoProduto) {
            const produtos = await knex('produtos')
                .where('descricao', 'ilike', `%${nomeDoProduto}%`)
                .orderBy('id', 'asc');

            if (!produtos || produtos.length === 0) {
                return res.status(404).json({ Mensagem: `Não há produtos encontrados com o nome "${nomeDoProduto}"` });
            }

            return res.status(200).json(produtos);
        } else {
            const consulta = await knex('produtos').orderBy('id', 'asc');

            if (!consulta || consulta.length === 0) {
                return res.status(404).json({ Mensagem: "Não há produtos para serem demonstrados" });
            }

            return res.status(200).json(consulta);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ Mensagem: "Erro Interno do Servidor" });
    }
};


const atualizarProduto = async (req, res) => {
    const { id } = req.params;
    let { descricao, quantidade_estoque, valor } = req.body;
    let path;

    try {
        const produtoExistente = await knex('produtos')
            .where({ id })
            .first();

        if (!produtoExistente) { return res.status(404).json({ mensagem: 'Produto não encontrado.' }); }


        const atualizarCampos = {
            descricao,
            quantidade_estoque,
            valor
        };


        const produtoAtualizado = await knex('produtos')
            .where('id', id)
            .update(atualizarCampos)
            .returning('*');

        return res.status(201).json();
    } catch (error) { return res.status(500).json({ mensagem: 'Erro interno no servidor.' }); }
};

const excluirProduto = async (req, res) => {
    const { id } = req.params;

    try {
        const produtoVinculado = await knex('pedido_produtos')
            .where({ produto_id: id })
            .first();

        if (produtoVinculado) {
            return res.status(400).json({ mensagem: 'Não é possível excluir o produto. Está vinculado a um pedido.' });
        }

        const produto = await knex(`produtos`)
            .where({ id })
            .first();

        if (!produto) {
            return res.status(404).json({ mensagem: 'Não foi encontrado nenhum produto com o ID selecionado.' });
        }

        const deletarProduto = await knex(`produtos`).delete().where({ id })
        if (!deletarProduto) {
            return res.status(400).json({ Mensagem: "Não foi possível deletar o produto no banco de dados, verifique os dados inseridos" })
        }


        return res.status(204).send();
    } catch (error) { return res.status(500).json({ mensagem: 'Erro interno no servidor.' }); }
};

module.exports = {
    cadastrarProduto,
    detalharProduto,
    filtroProdutoQuery,
    atualizarProduto,
    excluirProduto
};


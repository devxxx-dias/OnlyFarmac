const { Router } = require('express');
const autenticarUsuario = require('../middleware/users');
const { cadastrarCliente, atualizarCliente, loginCliente, obterPerfil, listarClientes, excluirCliente } = require('../controllers/ClienteController');
const { validateJoi_Body } = require('../middleware/validateJoi');
const { schemaCliente, schemaLogin } = require('../validations/schemaCliente');
const { excluirProduto, cadastrarProduto, atualizarProduto, filtroProdutoQuery, detalharProduto } = require('../controllers/ProdutoController');
const schemaProduto = require('../validations/schemaProduto');
const { schemaPedidos } = require('../validations/schemaPedidos');
const { cadatrarPedidos, listarPedidos } = require('../controllers/PedidoController');

const router = Router();

//Cliente
router.post('/cliente', validateJoi_Body(schemaCliente), cadastrarCliente)
router.post('/login', validateJoi_Body(schemaLogin), loginCliente)
router.use(autenticarUsuario);
router.put('/cliente', validateJoi_Body(schemaCliente), atualizarCliente)
router.get('/cliente', obterPerfil);
router.get('/', listarClientes);
router.delete('/cliente', excluirCliente)
//Produto
router.post('/produto', validateJoi_Body(schemaProduto), cadastrarProduto);
router.put('/produto/:id', validateJoi_Body(schemaProduto), atualizarProduto);
router.get('/produto', filtroProdutoQuery);
router.get('/produto/:id', detalharProduto);
router.delete('/produto/:id', excluirProduto);
//Pedido
router.post('/pedido',
    validateJoi_Body(schemaPedidos),
    cadatrarPedidos)
router.get('/pedido',
    listarPedidos);
module.exports = router;
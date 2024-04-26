const { Router } = require('express');
const autenticarUsuario = require('../middleware/users');
const { cadastrarCliente, atualizarCliente, loginCliente, obterPerfil, listarClientes, excluirCliente } = require('../controllers/ClienteController');
const { validateJoi_Body } = require('../middleware/validateJoi');
const { schemaCliente, schemaLogin } = require('../validations/schemaCliente');

const router = Router();

router.post('/cliente', validateJoi_Body(schemaCliente), cadastrarCliente)
router.post('/login', validateJoi_Body(schemaLogin), loginCliente)
router.use(autenticarUsuario);
router.put('/cliente', validateJoi_Body(schemaCliente), atualizarCliente)
router.get('/cliente', obterPerfil);
router.get('/', listarClientes);
router.delete('/cliente', excluirCliente)

module.exports = router;
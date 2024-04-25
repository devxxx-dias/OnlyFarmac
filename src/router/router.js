const { Router } = require('express');
const autenticarUsuario = require('../middleware/users');
const { cadastrarCliente, atualizarCliente } = require('../controllers/ClienteController');
const router = Router();

//colocar os endpoints aqui router.get... ,put .. post...

router.get('/', (req, res) => {
    return res.status(201).send({ mensagem: "estou rodando!" });
})

router.post('/cliente', cadastrarCliente)
// router.use(autenticarUsuario);
// router.put('/cliente', atualizarCliente)




module.exports = router;
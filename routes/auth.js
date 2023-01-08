const { check } = require('express-validator');
const { Router } = require('express');
const { validarCampos } = require('../middlewares/field-validator');
const { createUser, loginUser, renewUser } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();



router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6}),
        validarCampos
    ],
    createUser );

    router.post(
        '/',
        [
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
            validarCampos
        ],
        loginUser 
    );

router.get('/renew', validateJWT, renewUser );

module.exports = router;
const { Router } = require('express');
const { check } =  require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isDate } = require('../helpers/isDate');
const { getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/events');


const router = Router();

//Validar token
router.use( validateJWT );

//Obtener evento
router.get('/', getEvent );

//Crear nuevo evento
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    createEvent );

//Actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ], 
    updateEvent );

//Borrar evento
router.delete('/:id', deleteEvent );




module.exports = router;

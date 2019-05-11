const express = require('express');
const PresentationController = require('../controllers/Presentation');

const router = express.Router();

router.get('/', PresentationController.index);
router.post('/', PresentationController.create);
router.get('/:id', PresentationController.show);
router.put('/:id', PresentationController.update);

module.exports = router;
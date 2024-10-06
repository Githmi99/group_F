const express = require('express');
const router = express.Router();
const bomController = require('../controllers/bomController');

router.post('/bom', bomController.createBoM);
router.get('/boms', bomController.getBOMs);
router.get('/bom/:id', bomController.getBOMById);
router.put('/bom/:id', bomController.updateBOM);
router.delete('/bom/:id', bomController.deleteBOM);
router.get('/bom/stock/:id', bomController.searchInStcok);

module.exports = router;

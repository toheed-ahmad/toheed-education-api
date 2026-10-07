const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// helper function to read data safely
const readJsonData = (filename) => {
  const filePath = path.join(__dirname, '../data', filename);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData);
};

// Generic controller function
const handleDataRequest = (fileName) => {
  return (req, res) => {
    try {
      const data = readJsonData(fileName);
      if (!data) {
        return res.status(404).json({ success: false, message: 'Data file not found.' });
      }

      // Query param filters: ?search=term&page=1&limit=10
      const { search, page, limit } = req.query;

      let result = data;

      // Simple Search filter (if data is an array)
      if (search && Array.isArray(data)) {
        const query = search.toLowerCase();
        result = data.filter((item) =>
          JSON.stringify(item).toLowerCase().includes(query)
        );
      }

      // Pagination (if data is an array)
      if (Array.isArray(result) && page && limit) {
        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 10;
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = pageNum * limitNum;

        const paginatedItems = result.slice(startIndex, endIndex);

        return res.status(200).json({
          success: true,
          total: result.length,
          page: pageNum,
          totalPages: Math.ceil(result.length / limitNum),
          data: paginatedItems
        });
      }

      return res.status(200).json({
        success: true,
        total: Array.isArray(result) ? result.length : 1,
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error processing data.',
        error: error.message
      });
    }
  };
};

// Endpoints
router.get('/nahu', handleDataRequest('aasan_nahu.json'));
router.get('/sarf', handleDataRequest('aasan_sarf.json'));
router.get('/arabic-qaida', handleDataRequest('arabic_qaida.json'));
router.get('/english-qaida', handleDataRequest('english_qaida.json'));
router.get('/hindi-qaida', handleDataRequest('hindi_qaida.json'));
router.get('/urdu-qaida', handleDataRequest('urdu_qaida.json'));

module.exports = router;
const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/compile', async (req, res) => {
  const { code, language } = req.body;

  try {
    const response = await axios.post('https://api.judge0.com/submissions', {
      source_code: code,
      language_id: language, // Refer to Judge0 API documentation for language IDs
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Code compilation failed' });
  }
});

module.exports = router;

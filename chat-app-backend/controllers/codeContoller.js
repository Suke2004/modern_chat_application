const axios = require('axios');

exports.compileCode = async (req, res) => {
    const { code } = req.body;
    const JDoodleCredentials = {
        clientId: 'your-client-id',
        clientSecret: 'your-client-secret',
    };

    try {
        const response = await axios.post('https://api.jdoodle.com/v1/execute', {
            script: code,
            language: 'javascript',
            versionIndex: '0',
            ...JDoodleCredentials,
        });
        res.json({ output: response.data.output });
    } catch (error) {
        console.error("Error compiling code:", error);
        res.status(500).json({ error: "Compilation error" });
    }
};

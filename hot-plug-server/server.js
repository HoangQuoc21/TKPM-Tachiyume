const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint để nhận mã nguồn module và ghi vào file hoc.ts
app.post('/send-module', (req, res) => {
    console.log('Server receive request')
    const { moduleCode } = req.body;

    try {
        // Đường dẫn tới file hoc.ts trong dự án React Native
        const filePath = path.resolve(__dirname, '../mobile/src/models/sources/hoc.ts');

        // Ghi mã nguồn vào file hoc.ts
        fs.writeFileSync(filePath, moduleCode, 'utf-8');

        res.status(200).send({
            message: `Module đã được ghi vào hoc.ts thành công!`
        });
    } catch (error) {
        res.status(500).send({
            message: `Không thể ghi module vào hoc.ts`,
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});

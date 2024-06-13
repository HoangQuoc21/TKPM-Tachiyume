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
    console.log('Server receive request send module')
    const { moduleCode } = req.body;

    try {
        // Đường dẫn tới file hoc.ts trong dự án React Native
        const filePath = path.resolve(__dirname, '../mobile/src/models/sources/importedModule.ts');
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

app.post('/send-properties', (req, res) => {
    console.log('Server received request to send properties');
    const { tittleName, id, moduleCode } = req.body;
    // Loại bỏ dấu cách ở các bên trong titleName
    const formattedTitleName = tittleName.replace(/\s/g, '');

    try {
        // Đường dẫn tới file sourceList.txt trong dự án React Native
        const filePath = path.resolve(__dirname, '../mobile/src/factories/source-list.txt');
        const staticModulePath = path.resolve(__dirname, `../mobile/src/models/sources/${formattedTitleName}.ts`)
        fs.writeFileSync(staticModulePath, moduleCode,'utf-8')
        let sourceList = [];
        try {
            // Đọc nội dung của file sourceList.txt nếu nó tồn tại
            sourceList = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        } catch (error) {
            console.error("Không đọc được source-list.txt", error);
        }

        // Thêm vào mảng sourceList một cặp key-value mới với id và titleName
        sourceList.push({ [id]: formattedTitleName });

        // Ghi danh sách nguồn vào file sourceList.txt
        fs.writeFileSync(filePath, JSON.stringify(sourceList, null, 2), 'utf-8');
        
        res.status(200).send({
            body: JSON.stringify(sourceList, null, 2),
            message: `Properties đã được ghi vào source-list.txt thành công!`
        });
    } catch (error) {
        res.status(500).send({
            message: `Không thể ghi properties vào source-list.txt`,
            error: error.message
        });
    }
});

app.post('/get-data-module', (req, res) => {
    try {
        const { id } = req.body;
        const filePath = path.resolve(__dirname, '../mobile/src/factories/source-list.txt');
        const sourceList = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        let found = false;
        let sourceName = '';

        // Tìm kiếm ID trong danh sách nguồn
        for (const item of sourceList) {
            if (item[id]) {
                found = true;
                sourceName = item[id];
                break;
            }
        }

        if (found) {
            // Định dạng tên file nguồn
            const formattedTitleName = sourceName.replace(/\s+/g, '');

            // Đường dẫn đến file nguồn
            const staticModulePath = path.resolve(__dirname, `../mobile/src/models/sources/${formattedTitleName}.ts`);

            // Đọc nội dung file nguồn
            const moduleContent = fs.readFileSync(staticModulePath, 'utf-8');

            // Đường dẫn đến file sẽ ghi
            const outputPath = path.resolve(__dirname, '../mobile/src/models/sources/importedInstance.ts');

            // Ghi nội dung vào file importedInstance.ts
            fs.writeFileSync(outputPath, moduleContent, 'utf-8');

            res.status(200).json({ message: `Module ${formattedTitleName} đã được ghi vào importedInstance.ts thành công!` });
        } else {
            res.status(404).json({ error: 'ID not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xử lí', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});

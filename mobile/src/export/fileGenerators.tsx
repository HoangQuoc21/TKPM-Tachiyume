// fileGenerators.js
import * as FileSystem from 'expo-file-system';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { StorageAccessFramework } from 'expo-file-system';
import { Buffer } from 'buffer';
import JSZip from 'jszip';

export const fileFormats = [
    {label: "PDF", value: "pdf"},
    {label: "EPUB", value: "epub"},
]

export const exportFile = async (format, title, content) => {
    if (format === "pdf") {
      return await createPDF(title, content);
    } else if (format === "epub") {
        return await createEPUB(title, content);
    } else {
        throw new Error("Unsupported file format");
    }

}

export const createPDF = async (title, content) => {
  const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
  if (!permissions.granted) {
    return;
  }

  try {
    // Tạo tài liệu PDF mới
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    // Tạo trang mới
    let page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    const fontSize = 12;
    const margin = 50;
    const maxWidth = width - 2 * margin;
    let y = height - margin;

    console.log("Starting text processing...");

    // Tách nội dung thành từng đoạn văn
    const paragraphs = content.split('\n');

    for (const paragraph of paragraphs) {
      const words = paragraph.split(' ');
      let line = '';

      for (const word of words) {
        const testLine = line ? line + ' ' + word : word;
        const testWidth = timesRomanFont.widthOfTextAtSize(testLine, fontSize);

        if (testWidth < maxWidth) {
          line = testLine;
        } else {
          if (y - fontSize < margin) {
            page = pdfDoc.addPage([595.28, 841.89]);
            y = height - margin;
          }
          page.drawText(line, {
            x: margin,
            y: y,
            size: fontSize,
            font: timesRomanFont,
            color: rgb(0, 0, 0),
          });
          y -= fontSize + 2; // Khoảng cách giữa các dòng
          line = word;
        }
      }

      // Thêm dòng cuối cùng của đoạn văn
      if (line) {
        if (y - fontSize < margin) {
          page = pdfDoc.addPage([595.28, 841.89]);
          y = height - margin;
        }
        page.drawText(line, {
          x: margin,
          y: y,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0, 0),
        });
        y -= fontSize + 2; // Khoảng cách giữa các dòng
      }

      // Thêm khoảng cách giữa các đoạn văn
      y -= fontSize;
    }

    console.log("Finished text processing, starting PDF creation...");

    const pdfBytes = await pdfDoc.save();

    // Chuyển đổi mảng byte thành Base64
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

    // Tạo tên tệp PDF
    const fileName = title + ".pdf";

    // Tạo tệp PDF trong thư mục được cấp quyền
    console.log("Creating PDF file...");
    await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/pdf')
      .then(async (uri) => {
        // Ghi nội dung Base64 vào tệp
        await FileSystem.writeAsStringAsync(uri, pdfBase64, { encoding: FileSystem.EncodingType.Base64 });
      })
      .catch((e) => {
        console.log(e);
      });

    console.log("PDF created successfully!");
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};


const generateEPUBContent = (title) => {
  return `
<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="bookid" version="2.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>${title}</dc:title>
    <dc:identifier id="bookid">urn:uuid:12345</dc:identifier>
    <dc:language>en</dc:language>
  </metadata>
  <manifest>
    <item id="content" href="content.xhtml" media-type="application/xhtml+xml"/>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
  </manifest>
  <spine toc="ncx">
    <itemref idref="content"/>
  </spine>
</package>
  `.trim();
};

const generateEPUBTOC = (title) => {
  return `
<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="urn:uuid:12345"/>
  </head>
  <docTitle>
    <text>${title}</text>
  </docTitle>
  <navMap>
    <navPoint id="navPoint-1" playOrder="1">
      <navLabel>
        <text>${title}</text>
      </navLabel>
      <content src="content.xhtml"/>
    </navPoint>
  </navMap>
</ncx>
  `.trim();
};

export const createEPUB = async (title, content) => {
  const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
  if (!permissions.granted) {
    return;
  }

  try {
    console.log("Creating EPUB file...");
    const fileName = title + ".epub";

    // Tạo thư mục EPUB ảo với JSZip
    const zip = new JSZip();

    // Tạo tệp mimetype
    zip.file("mimetype", "application/epub+zip", { compression: "STORE" });

    // Tạo thư mục META-INF và tệp container.xml
    zip.folder("META-INF").file("container.xml", `
<?xml version="1.0" encoding="UTF-8" ?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="package.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>
    `.trim());

    // Tạo tệp content.xhtml
    const htmlContent = `
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>${title}</title>
  </head>
  <body>
    ${content.split('\n').map(paragraph => `<p>${paragraph}</p>`).join('')}
  </body>
</html>
    `.trim();
    zip.file("content.xhtml", htmlContent);

    // Tạo tệp toc.ncx
    const tocContent = generateEPUBTOC(title);
    zip.file("toc.ncx", tocContent);

    // Tạo tệp package.opf
    const packageContent = generateEPUBContent(title);
    zip.file("package.opf", packageContent);

    // Lưu tệp EPUB dưới dạng Base64
    const epubBytes = await zip.generateAsync({ type: "base64" });

    // Tạo tệp EPUB trong thư mục được cấp quyền
    await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/epub+zip')
      .then(async (uri) => {
        // Ghi nội dung Base64 vào tệp
        await FileSystem.writeAsStringAsync(uri, epubBytes, { encoding: FileSystem.EncodingType.Base64 });
      })
      .catch((e) => {
        console.log(e);
      });

    console.log("EPUB created successfully!");
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
};



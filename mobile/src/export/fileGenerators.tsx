// fileGenerators.js
import * as FileSystem from 'expo-file-system';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import Epub from 'epub-gen';
import * as MediaLibrary from 'expo-media-library';
import { Platform } from 'react-native';
import { StorageAccessFramework } from 'expo-file-system';
import { Buffer } from 'buffer';

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

// export const createPDF = async (title, content) => {
//   const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
//   if (!permissions.granted) {
//       return;
//   }
//   try {
//     const fileName = title + ".pdf";
//     await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/pdf')
//         .then(async(uri) => {
//             await FileSystem.writeAsStringAsync(uri, content, { encoding: FileSystem.EncodingType.Base64 });
//         })
//         .catch((e) => {
//             console.log(e);
//         });
//   } catch (e) {
//       throw new Error(e);
//   }
    
// };

// export const createPDF = async (title, content) => {
//   const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
//   if (!permissions.granted) {
//     return;
//   }

//   try {
//     // Tạo tài liệu PDF mới
//     const pdfDoc = await PDFDocument.create();
//     const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

//     // Tạo trang mới với kích thước chuẩn A4
//     const page = pdfDoc.addPage([595.28, 841.89]);
//     const { width, height } = page.getSize();
//     const fontSize = 12;
//     const margin = 50;
    
//     // Vẽ đoạn văn bản lên trang
//     page.drawText(content, {
//       x: margin,
//       y: height - margin,
//       size: fontSize,
//       font: timesRomanFont,
//       color: rgb(0, 0, 0),
//       maxWidth: width - 2 * margin,
//     });

//     // Lưu tài liệu PDF vào một buffer
//     const pdfBytes = await pdfDoc.save();

//     // Tạo tệp PDF
//     const fileName = title + ".pdf";
//     await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/pdf')
//       .then(async (uri) => {
//         // Ghi nội dung PDF vào tệp
//         await FileSystem.writeAsStringAsync(uri, pdfBytes, { encoding: FileSystem.EncodingType.Base64 });
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   } catch (e) {
//     throw new Error(e);
//   }
// };

export const createPDF = async (title, content) => {
  const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
  if (!permissions.granted) {
    return;
  }

  try {
    // Tạo tài liệu PDF mới
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    console.log("----------> 1");
    // Tạo trang mới
    const page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    const fontSize = 12;
    const margin = 50;

    // Vẽ văn bản lên trang
    page.drawText(content, {
      x: margin,
      y: height - margin,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
      maxWidth: width - 2 * margin,
    });
    console.log("----------> 2");

    const pdfBytes = await pdfDoc.save();

    // Chuyển đổi mảng byte thành Base64
    const pdfBase64 = Buffer.from(pdfBytes).toString('base64');

    // Tạo tên tệp PDF
    const fileName = title + ".pdf";

    // Tạo tệp PDF trong thư mục được cấp quyền
    console.log("----------> 3");
    await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/pdf')
      .then(async (uri) => {
        // Ghi nội dung Base64 vào tệp
        await FileSystem.writeAsStringAsync(uri, pdfBase64, { encoding: FileSystem.EncodingType.Base64 });
      })
      .catch((e) => {
        console.log(e);
      });
    console.log("Okeeeeee");
  } catch (e) {
    throw new Error(e);
  }
};

export const createEPUB = async (title, content) => {
  const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
  if (!permissions.granted) {
      return;
  }
  try {
    const fileName = title + ".epub";
    await StorageAccessFramework.createFileAsync(permissions.directoryUri, fileName, 'application/epub')
        .then(async(uri) => {
            await FileSystem.writeAsStringAsync(uri, content, { encoding: FileSystem.EncodingType.Base64 });
        })
        .catch((e) => {
            console.log(e);
        });
  } catch (e) {
      throw new Error(e);
  }
    
};
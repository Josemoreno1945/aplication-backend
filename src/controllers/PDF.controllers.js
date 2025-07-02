import PDFDocument from "pdfkit";
import { getDept, getADept } from "../models/departments.model.js";

const getDepartmentsData = async () => {
  const result = await getDept();
  return result;
};

const getAssetsData = async () => {
  const result = await getADept();
  return result;
};

export const generateDepartmentsPdf = async (req, res, next) => {
  try {
    const departments = await getDepartmentsData();

    const doc = new PDFDocument({
      size: "A4",
      margin: 10,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="departments_list.pdf"'
    );

    doc.pipe(res);

    // === DIBUJAR MARCO DE LA HOJA ===
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    const margin = doc.page.margins.left; // Asumimos margen igual en todos los lados

    doc.save();

    doc
      .lineWidth(1)
      .strokeColor("#333333")
      .rect(
        margin / 2, // Un poco más afuera para que el marco sea visible
        margin / 2,
        pageWidth - margin,
        pageHeight - margin
      )
      .stroke();
    doc.restore();

    // --- Encabezado del PDF ---
    doc.fillColor("#333333");
    doc
      .fontSize(20)
      .font("Helvetica-Bold")
      .text("AssetCare", { align: "center" });
    doc.moveDown(0.5);
    doc
      .fontSize(10)
      .font("Helvetica")
      .text("Department List Report", { align: "center" });
    doc.moveDown(1);

    doc.fontSize(9).fillColor("gray");
    doc.text(
      `Date Generated: ${new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`,
      { align: "right" }
    );
    doc.moveDown(1);

    doc
      .strokeColor("#cccccc")
      .lineWidth(0.5)
      .moveTo(doc.page.margins.left, doc.y)
      .lineTo(doc.page.width - doc.page.margins.right, doc.y)
      .stroke();
    doc.moveDown(1.5);

    // --- Tabla de departamentos ---
    const startX = doc.page.margins.left;
    let currentY = doc.y;

    const colWidths = {
      n: 35,
      name: 110,
      address: 140,
      phone: 90,
      email: 155,
      status: 45,
    };

    const colPositions = [
      startX,
      startX + colWidths.n,
      startX + colWidths.n + colWidths.name,
      startX + colWidths.n + colWidths.name + colWidths.address,
      startX +
        colWidths.n +
        colWidths.name +
        colWidths.address +
        colWidths.phone,
      startX +
        colWidths.n +
        colWidths.name +
        colWidths.address +
        colWidths.phone +
        colWidths.email,
      startX +
        colWidths.n +
        colWidths.name +
        colWidths.address +
        colWidths.phone +
        colWidths.email +
        colWidths.status,
    ];

    doc.fontSize(9).fillColor("black");

    // Altura de fila fija
    const rowHeight = 20;

    if (departments && departments.length > 0) {
      // === LÍNEA HORIZONTAL ARRIBA DE LA CABECERA ===
      doc.strokeColor("#888888").lineWidth(1);
      doc
        .moveTo(startX, currentY)
        .lineTo(colPositions[colPositions.length - 1], currentY)
        .stroke();

      // Encabezados de columna
      doc.font("Helvetica-Bold");
      const headers = ["N°", "Name", "Address", "Phone", "Email", "Status"];
      headers.forEach((header, i) => {
        doc.text(header, colPositions[i] + 2, currentY + 5, {
          width: colWidths[Object.keys(colWidths)[i]] - 4,
          align: "left",
        });
      });

      // Dibujar líneas verticales de encabezado
      doc.strokeColor("#888888").lineWidth(0.5);
      for (let i = 0; i < colPositions.length; i++) {
        doc
          .moveTo(colPositions[i], currentY)
          .lineTo(colPositions[i], currentY + rowHeight)
          .stroke();
      }
      // === LÍNEA HORIZONTAL INFERIOR DEL ENCABEZADO ===
      doc
        .moveTo(startX, currentY + rowHeight)
        .lineTo(colPositions[colPositions.length - 1], currentY + rowHeight)
        .stroke();

      currentY += rowHeight;
      doc.font("Helvetica");

      // Filas de la tabla
      departments.forEach((dept, index) => {
        // Dibujar fondo alterno para filas (opcional)
        if (index % 2 === 1) {
          doc
            .rect(
              startX,
              currentY,
              colPositions[colPositions.length - 1] - startX,
              rowHeight
            )
            .fillOpacity(0.07)
            .fillAndStroke("#cccccc", "#cccccc")
            .fillOpacity(1);
        }

        // Datos de la fila
        const rowData = [
          `${index + 1}`,
          dept.name || "",
          dept.address || "",
          dept.phone || "",
          dept.email || "",
          dept.operational_status !== undefined
            ? String(dept.operational_status)
            : "",
        ];
        rowData.forEach((cell, i) => {
          doc.fillColor("black").text(cell, colPositions[i] + 2, currentY + 5, {
            width: colWidths[Object.keys(colWidths)[i]] - 4,
            align: "left",
          });
        });

        // Dibujar líneas verticales de la fila
        doc.strokeColor("#cccccc").lineWidth(0.5);
        for (let i = 0; i < colPositions.length; i++) {
          doc
            .moveTo(colPositions[i], currentY)
            .lineTo(colPositions[i], currentY + rowHeight)
            .stroke();
        }
        // Línea horizontal inferior de la fila
        doc
          .moveTo(startX, currentY + rowHeight)
          .lineTo(colPositions[colPositions.length - 1], currentY + rowHeight)
          .stroke();

        currentY += rowHeight;

        // Salto de página si es necesario
        if (currentY + rowHeight > doc.page.height - doc.page.margins.bottom) {
          doc.addPage();
          currentY = doc.page.margins.top;

          // === DIBUJAR MARCO EN NUEVA PÁGINA ===
          doc.save();
          doc
            .lineWidth(1)
            .strokeColor("#333333")
            .rect(
              margin / 2,
              margin / 2,
              pageWidth - margin,
              pageHeight - margin
            )
            .stroke();
          doc.restore();

          // Repetir encabezados en nueva página
          doc.font("Helvetica-Bold");
          // Línea horizontal arriba de la cabecera
          doc.strokeColor("#888888").lineWidth(1);
          doc
            .moveTo(startX, currentY)
            .lineTo(colPositions[colPositions.length - 1], currentY)
            .stroke();

          headers.forEach((header, i) => {
            doc.text(header, colPositions[i] + 2, currentY + 5, {
              width: colWidths[Object.keys(colWidths)[i]] - 4,
              align: "left",
            });
          });
          doc.strokeColor("#888888").lineWidth(0.5);
          for (let i = 0; i < colPositions.length; i++) {
            doc
              .moveTo(colPositions[i], currentY)
              .lineTo(colPositions[i], currentY + rowHeight)
              .stroke();
          }
          // Línea horizontal inferior del encabezado
          doc
            .moveTo(startX, currentY + rowHeight)
            .lineTo(colPositions[colPositions.length - 1], currentY + rowHeight)
            .stroke();
          currentY += rowHeight;
          doc.font("Helvetica");
        }
      });
    } else {
      doc.text("No departments available to display.", startX, currentY);
    }

    doc.end();
  } catch (error) {
    console.error("Error generating department PDF:", error);
    next(error);
  }
};

export const generateAssetsPdf = async (req, res, next) => {};

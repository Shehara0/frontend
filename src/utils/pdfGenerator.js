import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateRevenuePDF = (revenueData) => {
    // Create new PDF document
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(102, 126, 234); // Indigo color
    doc.text('Revenue by Course Report', 14, 20);
    
    // Add generation date
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
    
    // Add line separator
    doc.setDrawColor(200);
    doc.line(14, 32, 196, 32);
    
    // Calculate totals
    const totalRevenue = revenueData.reduce((sum, item) => sum + item.totalRevenue, 0);
    const totalPayments = revenueData.reduce((sum, item) => sum + item.totalPayments, 0);
    
    // Add summary section
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text('Summary', 14, 40);
    
    doc.setFontSize(10);
    doc.text(`Total Revenue: $${totalRevenue.toFixed(2)}`, 14, 48);
    doc.text(`Total Payments: ${totalPayments}`, 14, 54);
    doc.text(`Total Courses: ${revenueData.length}`, 14, 60);
    
    // Prepare table data
    const tableData = revenueData.map((course, index) => [
        index + 1,
        course.courseTitle,
        course.courseId,
        course.totalPayments,
        `$${course.totalRevenue.toFixed(2)}`
    ]);
    
    // Add table using autoTable
    autoTable(doc, {
        startY: 68,
        head: [['#', 'Course Title', 'Course ID', 'Total Payments', 'Total Revenue']],
        body: tableData,
        theme: 'grid',
        headStyles: {
            fillColor: [102, 126, 234], // Indigo color
            textColor: 255,
            fontStyle: 'bold',
            halign: 'center'
        },
        columnStyles: {
            0: { halign: 'center', cellWidth: 15 },
            1: { cellWidth: 70 },
            2: { halign: 'center', cellWidth: 30 },
            3: { halign: 'center', cellWidth: 35 },
            4: { halign: 'right', cellWidth: 35 }
        },
        styles: {
            fontSize: 9,
            cellPadding: 5
        },
        alternateRowStyles: {
            fillColor: [245, 245, 245]
        },
        footStyles: {
            fillColor: [230, 230, 230],
            textColor: 0,
            fontStyle: 'bold'
        },
        foot: [[
            '',
            'TOTAL',
            '',
            totalPayments.toString(),
            `$${totalRevenue.toFixed(2)}`
        ]]
    });
    
    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
            `Page ${i} of ${pageCount}`,
            doc.internal.pageSize.getWidth() / 2,
            doc.internal.pageSize.getHeight() - 10,
            { align: 'center' }
        );
    }
    
    // Save the PDF
    const fileName = `Revenue_Report_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
};
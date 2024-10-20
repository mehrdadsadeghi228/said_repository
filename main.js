const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const pdf = require('html-pdf');

const app = express();
const PORT = 4088;

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/generate', (req, res) => {
    const { name, course, date } = req.body;

    // Render the certificate EJS template
    res.render('certificate', { name, course, date }, (err, html) => {
        if (err) {
            console.error(err);
            res.status(500).send('Something went wrong.');
        } else {
            // Convert the HTML to PDF
            const options = { format: 'Letter' };
            pdf.create(html, options).toBuffer((err, buffer) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error generating PDF.');
                } else {
                    // Set the headers and send the PDF
                    res.writeHead(200, {
                        'Content-Type': 'application/pdf',
                        'Content-Disposition': 'attachment; filename=certificate.pdf',
                    });
                    res.end(buffer);
                }
            });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
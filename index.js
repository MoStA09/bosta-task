const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { specs, swaggerUi } = require('./config/swaggerConfig'); // Import the Swagger configuration
const bookRoutes = require('./routes/bookRoutes');
const borrowerRoutes = require('./routes/borrowerRoutes');
const borrowing = require('./routes/borrowingRoutes')

const app = express();
// Create a connection pool to manage connections

// Middleware
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Mount routes
app.use('/books', bookRoutes);
app.use('/borrowers', borrowerRoutes);
app.use('/borrowing', borrowing);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConfig');
const itemRoutes = require('./routes/itemRoutes');
const errorHandler = require('./middlewares/errorHandler');
const { fileOperations } = require('./utils/fileOperations');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Database connection
connectDB();

// Routes
app.use('/items', itemRoutes);

// File operations demonstration
fileOperations();

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

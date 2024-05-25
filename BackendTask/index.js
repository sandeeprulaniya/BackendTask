const express = require('express');
const mongoose = require('mongoose');
const uploadRoutes = require('./routes/uploadRoutes');
const policyRoutes = require('./routes/policyRoutes');

const app = express();

app.use(express.json());

// Database connectivity
mongoose.connect('mongodb://127.0.0.1:27017/agentCommission', {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Routes
app.use('/upload', uploadRoutes);
app.use('/', policyRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

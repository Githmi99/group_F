const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');
const componentRoutes = require('./routes/components');
const purchaseRoutes = require('./routes/purchaseRoutes');
const usersRoutes = require('./routes/users');
const User = require('./models/User');
const lendingRoutes = require('./routes/lendingRoutes');
const app = express();
const lowStockRoutes = require('./routes/lowStocks');
const bomRoutes = require('./routes/bomRoutes');
const addRequestRoute = require('./routes/addRequestRoute');
const addComponentRequestRoutes = require('./routes/componentRequestRoute'); // Corrected the route name for consistency
const statsRoutes = require('./routes/statsRoutes');
const helpCenterRoutes = require('./routes/helpCenter');

app.use(bodyParser.json());
app.use(cors());
app.use('/api/purchases', purchaseRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/components', componentRoutes);
app.use('/api/admin', require('./routes/admin')); // Add admin routes
app.use('/api/low-stocks', lowStockRoutes);
app.use('/api/lendings', lendingRoutes); // Use lending routes
app.use('/api', bomRoutes);
app.use('/api', addRequestRoute);
app.use('/api', addComponentRequestRoutes); // Use a more descriptive route path
app.use('/api', statsRoutes);
app.use('/api', helpCenterRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import recordRoutes from './routes/record.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'
import YAML from 'yamljs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import swaggerUi from 'swagger-ui-express';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'OK' });
});

app.use('/api/auth', authRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
// import  required modules
import  express from 'express';
import  mongoose from 'mongoose';
import  bodyParser from 'body-parser';
import  cors from 'cors';
import  dotenv from 'dotenv';

import { dirname, join } from 'path'
import { fileURLToPath } from 'url';

// Load environment variablefrom .env file)
dotenv.config();

// Initialize Express app
const  app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
// import  and use routes for each collection
import  aboutRoutes from './aboutRoutes.js';
import  authorRoutes from './AuthorRoute.js';
import  blogRoutes from './BlogRouter.js';
import  blogCategoryRoutes from './blogCategoryRoute.js';
import  commentRoutes from './CommentRoute.js';
import  educationRoutes from './EducationRouter.js';
import  experienceRoutes from './ExperienceRouter.js';
import  internshipRoutes from './InternshipRouter.js';
import  licenseAndCertificateRoutes from './licenseAndCertificate.js';
import  messageRoutes from './MessageRouter.js';
import  notificationRoutes from './NotificationRoute.js';
import  profileRoutes from './ProfileRoute.js';
import  projectRoutes from './ProjectRoute.js';
import  serviceRoutes from './ServiceRoute.js';
import  skillRoutes from './skillRoute.js';
import  spaceStatusRoutes from './SpaceStatusRoute.js';
import  subscriberRoutes from './SubscriberRoute.js';
import  visitorAnalyticsRoutes from './VisitorAnalyticsRoute.js';
import  adminRoutes from './adminRoutes.js';


app.use('/about', aboutRoutes);
app.use('/author', authorRoutes);
app.use('/blog', blogRoutes);
app.use('/blogcategory', blogCategoryRoutes);
app.use('/comment', commentRoutes);
app.use('/education', educationRoutes);
app.use('/experience', experienceRoutes);
app.use('/internship', internshipRoutes);
app.use('/licenseandcertificate', licenseAndCertificateRoutes);
app.use('/message', messageRoutes);
app.use('/notification', notificationRoutes);
app.use('/profile', profileRoutes);
app.use('/project', projectRoutes);
app.use('/service', serviceRoutes);
app.use('/skill', skillRoutes);
app.use('/spacestatus', spaceStatusRoutes);
app.use('/subscriber', subscriberRoutes);
app.use('/visitoranalytics', visitorAnalyticsRoutes);
app.use('/admin', adminRoutes);

// Register path for homepage
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, '../../')));

// Displaying home page for the user
app.get('/', (req, res) => {
  try{
    return res.sendFile('index.html', { root: join(__dirname, '../../') });
  }catch(e){
    console.error("Failed to load home page.\n", e);
    res.status(500).json({Error: 'Internal Server Error'});
  }
});

// Set up mongoose connection
mongoose.set("strictQuery", false);

const  dev_db_url =
  "mongodb+srv://Ndevu:ndevuspace@cluster0.guntyex.mongodb.net/NdevuSpace?retryWrites=true&w=majority&appName=Cluster0";
const mongoDB = process.env.MONGODB_URI || dev_db_url;

main().catch((err) => console.log("Failed to connect to DataBase.\nHere is the error message:\n",err));
async function main() {
  await mongoose.connect(mongoDB);
}

// Start the server
const  PORT= process.env.PORT || 7080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mailRouter from './router.js'


/* CONFIGURATION */
dotenv.config();
const app = express();
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
const PORT = 6789;

/* ROUTES */
const router = express.Router();
router.get("/", (req, res) => {
    return "Active";
});
app.use("/mailer", mailRouter);

app.listen(PORT, () => console.log(`Server Port: ${PORT}`));




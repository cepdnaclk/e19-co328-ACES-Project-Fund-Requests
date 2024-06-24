const express = require("express");
const cors = require("cors");
const axios = require("axios");
const multer = require("multer");
const fs = require("fs");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const app = express();
const dialogflowRoute = require("./routes/dialogflow");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
// Load environment variables from a file located outside the backend folder
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const bodyParser = require("body-parser");
const emailService = require("./Services/emailService");
const Request = require("./models/fundrequest");

app.use(express.static("./public"));

// Configure CORS to allow requests from your frontend URL
app.use(cors({
  origin: 'http://localhost:5173',  // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "An API to make fund requests for ACES projects"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },
  apis: ["./app.js"]
};

const specs = swaggerJsDoc(options);
// Increase the request size limit to 50MB (or set it to your desired limit)
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use('/api', dialogflowRoute);

// Set up mongoose connection
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Database connected");
}


/**
 * 
 * @swagger
 * components:
 *    schemas:
 *      requestData:
 *        type: object
 *        required: 
 *          - project_title
 *          - project_type
 *          - applicants_names
 *          - requester
 *          - contact_no
 *        properties:
 *          id:
 *            type: string
 *            description: The auto-generated id of the request
 *          project_title:
 *            type: string
 *            description: The title of the project
 *          project_type:
 *            type: string
 *            description: Type of the project
 *          applicants:
 *             type: list of strings
 *             description: List of students who apply for the project
 *          contact_no:
 *              type: string
 *              description: phone number of one person to contact
 *          requester:
 *              type: string
 *              description: name of the requester
 *          starting_date:
 *              type: date
 *              description: date the project starts
 *    successful:
 *      type: object
 *      properties:
 *        description: successful request
 *        type: boolean
 *       
 */

/**
 * @swagger
 * /getall:
 *  get:
 *    summary: Returns the list of all the requests
 *    responses:
 *      200:
 *        description: The list of the requests
 *        contents:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/requestData'
 *          
 */


app.get("/getall", async (req, res) => {
  console.log('Received GET request to /getall');
  const alldocs = await Request.find({});
  if (alldocs) {
    console.log("all: ", alldocs);
    res.status(200).json({ docs: alldocs });
  } else {
    console.log("Error occurred");
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

/**
 * @swagger
 * /admin:
 *  get:
 *    summary: Say Hi
 *    responses:
 *      200:
 *        description: Say Hi
 *        contents: text
 */

app.get("/admin", (req, res) => {
  res.send("Hi there");
});

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads"); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Set the file size limit to 10 MB (adjust as needed)
});

app.use(express.urlencoded({ extended: false })); // handle POST requests body. Handle data in the type "application/x-www-form-urlencoded"
app.use(express.json()); // Handle the data in the type "application/json"

/**
 * @swagger
 * /:
 * get:
 *  summary: say successful
 *  responses:
 *    200:
 *      description: successful
 *      content: 
 *        type: boolean
 *        
 */

app.get("/", (req, res) => {
  res.status(200).json({ success: true });
});

function base64ToArrayBuffer(base64) {
  const binaryString = Buffer.from(base64, 'base64').toString('binary');
  const length = binaryString.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// Function to get data from the database based on the ID
async function getRequestDataByID(id) {
  try {
    const neededRequest = await Request.findById(id);
    console.log(neededRequest);
    return neededRequest;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// Take the fund request details and save them in the database

/**
 * @swagger
 * /fundRequest:
 *  post:
 *    summary: Create a new fund request
 *    requestBody:
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/requestData'
 *    responses:
 *      200:
 *        description: The new request was successfully created
 *        content: 
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/requestData'
 *      500:
 *        description: Some Server Error
 *      400:
 *        description: Bad request, not filling the form properly
 */



app.post("/fundRequest", async (req, res) => {
  const data = req.body;
  console.log("receiving data");
  console.log(data);
  if (data) {
    const arrayBuffer = base64ToArrayBuffer(data.projectExpenses);
    console.log(arrayBuffer);

    const buffer = Buffer.from(arrayBuffer);
    console.log(buffer);

    const newRequest = new Request({
      applicants_names: data.ApplicantsNames,
      leader_name: data.leadersName,
      email: data.email,
      contact_no: data.contactNo,
      project_title: data.projectTitle,
      project_description: data.projectDescription,
      goals: data.goals,
      risks: data.risks,
      project_type: data.projectType,
      Project_expenses: buffer,
      starting_date: data.startingDate,
      ending_date: data.endingDate,
      agreement: data.agreement,
      lecturer_name: data.lecturerName,
      lecturer_email: data.lecturerEmail,
      requester: data.requester,
      lecturer_response: "pending",
      hod_response: "pending",
      aces_response: "pending",
    });

    try {
      // Save the instance to the database
      const savedRequest = await newRequest.save();
      console.log("Request saved successfully:", savedRequest);

      emailService.sendEmail(
        "csdmntest@gmail.com",
        "A New Fund Request",
        "You have a new request to review. Please visit this link: (the link)"
      );

      // Respond with a success JSON response
      res.status(200).json({ data });
    } catch (error) {
      console.error("Error saving request:", error);
      // Handle the error and respond with an error JSON response
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  } else {
    // If no data is provided in the request, respond with an error JSON response
    res.status(400).json({ success: false, error: "Bad request" });
  }
});

// Function to delete a request by requester
async function deleteRequestByRequester(requesterName) {
  try {
    const deletedRequest = await Request.findOneAndDelete({
      requester: requesterName,
    }).exec();
    if (deletedRequest) {
      console.log("Request deleted:", deletedRequest);
      return deletedRequest;
    } else {
      console.log("Request not found.");
      return null;
    }
  } catch (error) {
    console.error("Error deleting request:", error);
    throw error;
  }
}

/**
 * @swagger
 * /delete/{requesterEmail}:
 *  get:
 *    summary: delete record
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/requestData'
 *    responses:
 *      200:
 *        description: deleted the content
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/requestData' 
 */

app.get("/delete/:requesterEmail", async (req, res) => {
  const requesterEmail = req.params.requesterEmail;
  console.log(requesterEmail);

  const deletedRequest = await deleteRequestByRequester(requesterEmail);

  res.status(200).json({ deletedRequest });
});

// Get data from the database
app.get("/find/:id", async (req, res) => {
  console.log("finding");
  const id = req.params.id;
  console.log(id);

  const foundRequest = await getRequestDataByID(id);

  if (foundRequest != null) {
    res.status(200).json(foundRequest);
  } else {
    res.status(404).json({ success: false });
  }
});

// Function to search for a request by requester
async function searchRequestByRequester(requesterEmail) {
  try {
    const request = await Request.findOne({ requester: requesterEmail }).exec();
    if (request) {
      console.log("Request found:", request);
      return request;
    } else {
      console.log("Request not found.");
      return null;
    }
  } catch (error) {
    console.error("Error searching for request:", error);
    throw error;
  }
}

app.get("/findrequest/:requesterEmail", async (req, res) => {
  const requesterEmail = req.params.requesterEmail;
  console.log(requesterEmail);

  const previousRequest = await searchRequestByRequester(requesterEmail);

  res.status(200).json(previousRequest);
});

app.get("/admin/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const foundRequest = await getRequestDataByID(id);

    if (foundRequest !== null) {
      res.status(200).json(foundRequest);
    } else {
      res.status(404).json({ success: false, message: "Data not found" });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/approved", async (req, res) => {
  const data = req.body;
  const foundRequest = await getRequestDataByID(data.id);
  if (foundRequest !== null) {
    try {
      foundRequest.aces_response = "approved";
      foundRequest.bill_settled = data.billSettle;
      foundRequest.report_submitted = data.reportSubmit;
      foundRequest.reason = "";

      const updatedRequest = await Request.findByIdAndUpdate(
        data.id,
        foundRequest,
        { new: true }
      );
      console.log("Updated Request:", updatedRequest);

      res
        .status(200)
        .json({ success: true, message: "successfully approved!" });
    } catch (error) {
      console.error("Error updating request:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    res.status(404).json({ success: false, message: "Data not found" });
  }
});

app.post('/denied', async (req, res) => {
  const data = req.body;
  try {
    const foundRequest = await getRequestDataByID(data.id);
    if (foundRequest !== null) {
      foundRequest.aces_response = 'denied';
      foundRequest.reason = data.reason;
      foundRequest.bill_settled = '';
      foundRequest.report_submitted = '';
      const updatedRequest = await Request.findByIdAndUpdate(
        data.id,
        foundRequest,
        { new: true }
      );
      console.log('Updated Request:', updatedRequest);

      res.status(200).json({ success: true, message: 'Successfully denied!' });
    } else {
      res.status(404).json({ success: false, message: 'Data not found' });
    }
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Port handling
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started and running on port ${PORT}`);
});

// Close the MongoDB connection pool when the server is stopped
process.on('SIGINT', async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected, shutting down server.');
    process.exit(0);
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    process.exit(1);
  }
});

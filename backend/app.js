const express = require("express");
const cors = require("cors");
const axios = require("axios");
const multer = require("multer");
const fs = require("fs");
const app = express();

const bodyParser = require("body-parser");

const emailService = require("./Services/emailService");

const mongoose = require("mongoose");

const Request = require("./models/fundrequest");

app.use(express.static("./public"));

app.use(cors());

// Increase the request size limit to 50MB (or set it to your desired limit)
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Set up mongoose connection
mongoose.set("strictQuery", false);
const mongoDB =
  "mongodb+srv://priyankarasajith31:1MULV3OpJON5hCnL@cluster0.lxel2jn.mongodb.net/";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Database connected");
}

app.get("/getall", async (req, res) => {
  console.log("Getting all documents");

  alldocs = await Request.find({});

  if (alldocs) {
    console.log("all: ", alldocs);
    res.status(200).json({ docs: alldocs });
  } else {
    console.log("Error occured");
  }
});

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

// const countriesMiddleware = require('./routes/countries')

app.use(express.urlencoded({ extended: false })); // handle POST requests body. Handle data in the trype "application/x-www-form-urlencoded"
app.use(express.json()); // Handle the data in the type "application/json"

// app.use("/change/",countriesMiddleware);

app.get("/", (req, res) => {
  res.status(200).json({ success: true });
});

function base64ToArrayBuffer(base64) {
  const binaryString = atob(base64);
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

// POST

// app.post("/login", (req, res)=>{
//     const {name} = req.body; // To handle the POST request properly we have to use a middleware, that is urlencoded
//     console.log(name);
//     if(name){
//        return res.status(200).send("Success")
//     }else{
//        return res.status(401).send("Please enter valid credentials")
//     }
// });

// Take the fund request details and save them in the databse
app.post("/fundRequest", async (req, res) => {
  const data = req.body;
  console.log("receiving data");
  console.log(data);
  if (data) {
    // const selectedFile = data.projectExpenses;
    // const fileBuffer = await convertFileToBuffer(selectedFile);

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
// sendToAdmin(data);

async function deleteRequestByRequester(requesterName) {
  try {
    const deletedRequest = await Request.findOneAndDelete({
      requester: requesterName,
    }).exec();
    if (deletedRequest) {
      // Request with the specified requester name was found and deleted
      console.log("Request deleted:", deletedRequest);
      return deletedRequest;
    } else {
      // Request with the specified requester name was not found
      console.log("Request not found.");
      return null;
    }
  } catch (error) {
    console.error("Error deleting request:", error);
    throw error;
  }
}

app.get("/delete/:requesterEmail", async (req, res) => {
  requesterEmail = req.params.requesterEmail;
  console.log(requesterEmail);

  const deletedRequest = await deleteRequestByRequester(requesterEmail);

  res.status(200).json({ deletedRequest });
});

// GEt data from the database
app.get("/find/:id", async (req, res) => {
  console.log("finding");
  const id = req.params.id;
  console.log(id);

  const foundRequest = await getRequestDataByID(id);

  if (foundRequest != null) {
    // You can do whatever you need in this section with the found request
    res.status(200).json(foundRequest);
  } else {
    res.status(404).json({ success: false });
  }
});

async function searchRequestByRequester(requesterEmail) {
  try {
    const request = await Request.findOne({ requester: requesterEmail }).exec();
    if (request) {
      // Request with the specified requester name was found
      console.log("Request found:", request);
      return request;
    } else {
      // Request with the specified requester name was not found
      console.log("Request not found.");
      return null;
    }
  } catch (error) {
    console.error("Error searching for request:", error);
    throw error;
  }
}

app.get("/findrequest/:requesterEmail", async (req, res) => {
  requesterEmail = req.params.requesterEmail;
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
      // Can customize how the data is displayed here
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
        .json({ success: true, message: "successfully approved !" });
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

app.post("/denied", async (req, res) => {
  const data = req.body;
  const foundRequest = await getRequestDataByID(data.id);
  if (foundRequest !== null) {
    try {
      foundRequest.aces_response = "denied";
      foundRequest.reason = data.reason;
      foundRequest.bill_settled = "";
      foundRequest.report_submitted = "";
      const updatedRequest = await Request.findByIdAndUpdate(
        data.id,
        foundRequest,
        { new: true }
      );
      console.log("Updated Request:", updatedRequest);

      res.status(200).json({ success: true, message: "successfully denied !" });
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

app.listen(5000, () => {
  console.log("Server started and running on port 5000");
});

// Close the MongoDB connection pool when the server is stopped
process.on("SIGINT", function () {
  mongoose.disconnect();
});

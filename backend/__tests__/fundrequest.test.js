const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const Request = require('../models/fundrequest'); // Assuming your schema is in a file named Request.js

describe('Request Model', () => {
  let mongoServer;
  let mongoUri;

  beforeAll(async () => {
    // Create instance of MongoMemoryServer
    mongoServer = await MongoMemoryServer.create();
    // Get the URI of the in-memory database
    mongoUri = await mongoServer.getUri();
    // Connect to mongoose with the in-memory database URI
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Disconnect mongoose
    await mongoose.disconnect();
    // Stop the in-memory database
    await mongoServer.stop();
  });

  afterEach(async () => {
    // Drop the database after each test case
    await mongoose.connection.dropDatabase();
  });

  it('should create and save a new request successfully', async () => {
    // Increase the timeout for this test case if it's a long-running operation
    jest.setTimeout(10000);

    const requestData = {
      applicants_names: ['John Doe'],
      leader_name: 'Jane Doe',
      requester: 'Test Requester',
      email: 'test@example.com',
      contact_no: '1234567890',
      project_title: 'Test Project',
      project_description: 'Test Project Description',
      Project_expenses: Buffer.from('Test File'),
      goals: 'Test Goals',
      risks: 'Test Risks',
      project_type: 'Test Project Type',
      starting_date: '2024-01-01',
      ending_date: '2024-12-31',
      agreement: 'Test Agreement',
      lecturer_name: 'Test Lecturer',
      lecturer_email: 'lecturer@example.com',
      lecturer_response: 'Approved',
      hod_response: 'Approved',
      aces_response: 'Approved',
      reason: 'Test Reason',
      bill_settled: 'Yes',
      report_submitted: 'Yes',
    };

    const savedRequest = await Request.create(requestData);

    expect(savedRequest._id).toBeDefined();
    expect(savedRequest.applicants_names).toEqual(requestData.applicants_names);
    expect(savedRequest.leader_name).toBe(requestData.leader_name);
    expect(savedRequest.requester).toBe(requestData.requester);
    // Add similar expectations for other fields
  });

  // Add more test cases as needed
});

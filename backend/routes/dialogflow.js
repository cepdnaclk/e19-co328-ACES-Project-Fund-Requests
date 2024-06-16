const express = require('express');
const router = express.Router();
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const path = require('path');

const projectId = 'faqbot-nyuj';  // Replace with your Dialogflow project ID
const sessionId = uuid.v4();
const languageCode = 'en-US';

const sessionClient = new dialogflow.SessionsClient({
  keyFilename: path.join(__dirname, '../config/faqbot.json')  // Path to your service account key file
});

router.post('/dialogflow', async (req, res) => { // Updated to remove '/api'
  const { message } = req.body;
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: languageCode,
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    res.json({
      response: result.fulfillmentText
    });
  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).send('Something went wrong with Dialogflow');
  }
});

module.exports = router;

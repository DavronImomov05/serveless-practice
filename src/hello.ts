import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 * Handles the incoming API Gateway event and returns a response
 * based on the HTTP method.
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Event:', JSON.stringify(event, null, 2));

    let response: APIGatewayProxyResult; // Define response variable here

    // --- Check the HTTP Method ---
    if (event.httpMethod === 'GET') {
        console.log('Handling GET request...');

        // --- Existing GET Logic Start ---
        const queryParams = event.queryStringParameters;
        // Get the name or default to 'World'
        const nameToGreet = queryParams?.name ?? 'World';
        const message = `Hello, ${nameToGreet}!`;

        // Assign the success response to the outer variable
        response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
            }),
        };
        // --- Existing GET Logic End ---

    } else if (event.httpMethod === 'POST') {
        console.log('Handling POST request...');

        let requestBody; // Variable to hold the parsed body
        try {
            // Check if body exists before trying to parse
            if (!event.body) {
                console.log('POST request missing body.');
                // Assign a 400 Bad Request response if body is missing
                response = {
                    statusCode: 400,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: 'Missing request body' }),
                };
            } else {
                // Try parsing the string body as JSON
                requestBody = JSON.parse(event.body);

                // --- Logic to use the parsed requestBody will go here next ---
                console.log('Parsed request body:', requestBody);

                // Temporary placeholder for successful POST response
                response = {
                    statusCode: 501, // 501 Not Implemented (temporary)
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: 'Body parsed, but POST handler not fully implemented yet', receivedBody: requestBody }),
                };
            }
        } catch (parseError) {
            console.error('Error parsing JSON body:', parseError);
            // Assign a 400 Bad Request response if JSON parsing fails
            response = {
                statusCode: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: 'Invalid JSON format in request body' }),
            };
        }

    } else {
        // --- Handle other methods (PUT, DELETE, etc.) ---
        console.log(`Handling unsupported method: ${event.httpMethod}`);

        response = {
            statusCode: 405, // 405 Method Not Allowed
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: `HTTP Method ${event.httpMethod} Not Allowed` }),
        };
    }

    // Log the final response we're sending
    console.log('Response:', JSON.stringify(response, null, 2));

    // Return the single response object
    return response;
};



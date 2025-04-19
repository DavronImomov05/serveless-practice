import { APIGatewayProxyEvent, APIGatewayAuthorizerEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const queryParams = event.queryStringParameters;
    const nameToGet = queryParams?.name ?? 'Hello World';

    const message = `Hello ${nameToGet}`;

    try {
        const response: APIGatewayProxyResult = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
            }),
        
        };
        return response;
    } catch (error) {
        const error_response: APIGatewayProxyResult = {
            statusCode: 404,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                error: error instanceof Error ? error.message : 'Uknown error occured'
            }),
        };
        return error_response;
    }
}



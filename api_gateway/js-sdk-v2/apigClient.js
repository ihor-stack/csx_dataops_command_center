/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }


    // extract endpoint and path from url
    var invokeUrl = 'https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Stage';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);



    apigClient.airflowEnvironmentsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var airflowEnvironmentsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/airflow/environments').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(airflowEnvironmentsGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.airflowEnvironmentsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var airflowEnvironmentsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/airflow/environments').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(airflowEnvironmentsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.airflowEnvironmentsEnvironmentGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['environment'], ['body']);

        var airflowEnvironmentsEnvironmentGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/airflow/environments/{environment}').expand(apiGateway.core.utils.parseParametersToObject(params, ['environment'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(airflowEnvironmentsEnvironmentGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.airflowEnvironmentsEnvironmentOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['environment'], ['body']);

        var airflowEnvironmentsEnvironmentOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/airflow/environments/{environment}').expand(apiGateway.core.utils.parseParametersToObject(params, ['environment'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(airflowEnvironmentsEnvironmentOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.airflowEnvironmentsEnvironmentTagsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['environment'], ['body']);

        var airflowEnvironmentsEnvironmentTagsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/airflow/environments/{environment}/tags').expand(apiGateway.core.utils.parseParametersToObject(params, ['environment'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(airflowEnvironmentsEnvironmentTagsGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.airflowEnvironmentsEnvironmentTagsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['environment'], ['body']);

        var airflowEnvironmentsEnvironmentTagsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/airflow/environments/{environment}/tags').expand(apiGateway.core.utils.parseParametersToObject(params, ['environment'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(airflowEnvironmentsEnvironmentTagsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.amplifyAppsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var amplifyAppsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/amplify/apps').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(amplifyAppsGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.amplifyAppsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var amplifyAppsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/amplify/apps').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(amplifyAppsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.amplifyAppsTagsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var amplifyAppsTagsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/amplify/apps/tags').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(amplifyAppsTagsPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.amplifyAppsTagsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var amplifyAppsTagsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/amplify/apps/tags').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(amplifyAppsTagsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.amplifyAppsAppIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['appId'], ['body']);

        var amplifyAppsAppIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/amplify/apps/{appId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['appId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(amplifyAppsAppIdGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.amplifyAppsAppIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['appId'], ['body']);

        var amplifyAppsAppIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/amplify/apps/{appId}').expand(apiGateway.core.utils.parseParametersToObject(params, ['appId'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(amplifyAppsAppIdOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.apigatewayRestApisGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var apigatewayRestApisGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/apigateway/rest-apis').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(apigatewayRestApisGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.apigatewayRestApisOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var apigatewayRestApisOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/apigateway/rest-apis').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(apigatewayRestApisOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.apigatewayRestApisRestApiIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['rest-api-id'], ['body']);

        var apigatewayRestApisRestApiIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/apigateway/rest-apis/{rest-api-id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['rest-api-id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(apigatewayRestApisRestApiIdGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.apigatewayRestApisRestApiIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['rest-api-id'], ['body']);

        var apigatewayRestApisRestApiIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/apigateway/rest-apis/{rest-api-id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['rest-api-id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(apigatewayRestApisRestApiIdOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.apigatewayRestApisRestApiIdResourcesGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['rest-api-id'], ['body']);

        var apigatewayRestApisRestApiIdResourcesGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/apigateway/rest-apis/{rest-api-id}/resources').expand(apiGateway.core.utils.parseParametersToObject(params, ['rest-api-id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(apigatewayRestApisRestApiIdResourcesGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.apigatewayRestApisRestApiIdResourcesOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['rest-api-id'], ['body']);

        var apigatewayRestApisRestApiIdResourcesOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/apigateway/rest-apis/{rest-api-id}/resources').expand(apiGateway.core.utils.parseParametersToObject(params, ['rest-api-id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(apigatewayRestApisRestApiIdResourcesOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.apigatewayRestApisRestApiIdResourcesResourceIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['resource-id', 'rest-api-id'], ['body']);

        var apigatewayRestApisRestApiIdResourcesResourceIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/apigateway/rest-apis/{rest-api-id}/resources/{resource-id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['resource-id', 'rest-api-id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(apigatewayRestApisRestApiIdResourcesResourceIdGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.apigatewayRestApisRestApiIdResourcesResourceIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['resource-id', 'rest-api-id'], ['body']);

        var apigatewayRestApisRestApiIdResourcesResourceIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/apigateway/rest-apis/{rest-api-id}/resources/{resource-id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['resource-id', 'rest-api-id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(apigatewayRestApisRestApiIdResourcesResourceIdOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fetchCloudwatchMetricsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var fetchCloudwatchMetricsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/fetch-cloudwatch-metrics').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fetchCloudwatchMetricsPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.fetchCloudwatchMetricsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var fetchCloudwatchMetricsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/fetch-cloudwatch-metrics').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(fetchCloudwatchMetricsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.kafkaClustersGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var kafkaClustersGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/kafka/clusters').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(kafkaClustersGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.kafkaClustersPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var kafkaClustersPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/kafka/clusters').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(kafkaClustersPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.kafkaClustersOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var kafkaClustersOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/kafka/clusters').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(kafkaClustersOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.kafkaClustersTagsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var kafkaClustersTagsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/kafka/clusters/tags').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(kafkaClustersTagsGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.kafkaClustersTagsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var kafkaClustersTagsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/kafka/clusters/tags').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(kafkaClustersTagsPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.kafkaClustersTagsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var kafkaClustersTagsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/kafka/clusters/tags').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(kafkaClustersTagsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.lambdaFunctionsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var lambdaFunctionsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/lambda/functions').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(lambdaFunctionsGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.lambdaFunctionsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var lambdaFunctionsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/lambda/functions').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(lambdaFunctionsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.lambdaFunctionsTagsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var lambdaFunctionsTagsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/lambda/functions/tags').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(lambdaFunctionsTagsPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.lambdaFunctionsTagsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var lambdaFunctionsTagsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/lambda/functions/tags').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(lambdaFunctionsTagsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.lambdaFunctionsFunctionNameGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['functionName'], ['body']);

        var lambdaFunctionsFunctionNameGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/lambda/functions/{functionName}').expand(apiGateway.core.utils.parseParametersToObject(params, ['functionName'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(lambdaFunctionsFunctionNameGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.lambdaFunctionsFunctionNameOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['functionName'], ['body']);

        var lambdaFunctionsFunctionNameOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/lambda/functions/{functionName}').expand(apiGateway.core.utils.parseParametersToObject(params, ['functionName'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(lambdaFunctionsFunctionNameOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.listCloudwatchMetricsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var listCloudwatchMetricsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/list-cloudwatch-metrics').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };

        return apiGatewayClient.makeRequest(listCloudwatchMetricsGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.listCloudwatchMetricsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var listCloudwatchMetricsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/list-cloudwatch-metrics').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(listCloudwatchMetricsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.listCloudwatchNamespacesGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var listCloudwatchNamespacesGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/list-cloudwatch-namespaces').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(listCloudwatchNamespacesGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.listCloudwatchNamespacesOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var listCloudwatchNamespacesOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/list-cloudwatch-namespaces').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(listCloudwatchNamespacesOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.opsgenieCreateAlertPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var opsgenieCreateAlertPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/opsgenie/create-alert').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(opsgenieCreateAlertPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.opsgenieCreateAlertOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var opsgenieCreateAlertOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/opsgenie/create-alert').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(opsgenieCreateAlertOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.s3BucketsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var s3BucketsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/s3/buckets').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(s3BucketsGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.s3BucketsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var s3BucketsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/s3/buckets').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(s3BucketsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.s3BucketsBucketNameObjectsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['bucket-name'], ['body']);

        var s3BucketsBucketNameObjectsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/s3/buckets/{bucket-name}/objects').expand(apiGateway.core.utils.parseParametersToObject(params, ['bucket-name'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(s3BucketsBucketNameObjectsGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.s3BucketsBucketNameObjectsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['bucket-name'], ['body']);

        var s3BucketsBucketNameObjectsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/s3/buckets/{bucket-name}/objects').expand(apiGateway.core.utils.parseParametersToObject(params, ['bucket-name'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(s3BucketsBucketNameObjectsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.s3BucketsBucketNameObjectsTagsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['bucket-name'], ['body']);

        var s3BucketsBucketNameObjectsTagsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/s3/buckets/{bucket-name}/objects/tags').expand(apiGateway.core.utils.parseParametersToObject(params, ['bucket-name'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(s3BucketsBucketNameObjectsTagsPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.s3BucketsBucketNameObjectsTagsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['bucket-name'], ['body']);

        var s3BucketsBucketNameObjectsTagsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/s3/buckets/{bucket-name}/objects/tags').expand(apiGateway.core.utils.parseParametersToObject(params, ['bucket-name'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(s3BucketsBucketNameObjectsTagsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.s3BucketsBucketNameTagsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['bucket-name'], ['body']);

        var s3BucketsBucketNameTagsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/s3/buckets/{bucket-name}/tags').expand(apiGateway.core.utils.parseParametersToObject(params, ['bucket-name'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(s3BucketsBucketNameTagsGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.s3BucketsBucketNameTagsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['bucket-name'], ['body']);

        var s3BucketsBucketNameTagsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/s3/buckets/{bucket-name}/tags').expand(apiGateway.core.utils.parseParametersToObject(params, ['bucket-name'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(s3BucketsBucketNameTagsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.sagemakerDescribeTrainingJobGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var sagemakerDescribeTrainingJobGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sagemaker/describe-training-job').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(sagemakerDescribeTrainingJobGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.sagemakerDescribeTrainingJobOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var sagemakerDescribeTrainingJobOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sagemaker/describe-training-job').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(sagemakerDescribeTrainingJobOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.sagemakerInvokeEndpointGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var sagemakerInvokeEndpointGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sagemaker/invoke-endpoint').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(sagemakerInvokeEndpointGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.sagemakerInvokeEndpointOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var sagemakerInvokeEndpointOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sagemaker/invoke-endpoint').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(sagemakerInvokeEndpointOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.sagemakerListEndpointsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var sagemakerListEndpointsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sagemaker/list-endpoints').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(sagemakerListEndpointsGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.sagemakerListEndpointsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var sagemakerListEndpointsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sagemaker/list-endpoints').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(sagemakerListEndpointsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.sagemakerListTrainingJobsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var sagemakerListTrainingJobsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/sagemaker/list-training-jobs').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(sagemakerListTrainingJobsGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.sagemakerListTrainingJobsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var sagemakerListTrainingJobsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sagemaker/list-training-jobs').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(sagemakerListTrainingJobsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.sagemakerTagsPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var sagemakerTagsPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/sagemaker/tags').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(sagemakerTagsPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.sagemakerTagsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);

        var sagemakerTagsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/sagemaker/tags').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(sagemakerTagsOptionsRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.userConfigIdGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);

        var userConfigIdGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/user/config/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(userConfigIdGetRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.userConfigIdPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);

        var userConfigIdPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/user/config/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(userConfigIdPutRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.userConfigIdPost = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);

        var userConfigIdPostRequest = {
            verb: 'post'.toUpperCase(),
            path: pathComponent + uritemplate('/user/config/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(userConfigIdPostRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.userConfigIdDelete = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);

        var userConfigIdDeleteRequest = {
            verb: 'delete'.toUpperCase(),
            path: pathComponent + uritemplate('/user/config/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(userConfigIdDeleteRequest, authType, additionalParams, config.apiKey);
    };


    apigClient.userConfigIdOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }

        apiGateway.core.utils.assertParametersDefined(params, ['id'], ['body']);

        var userConfigIdOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/user/config/{id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['id'])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };


        return apiGatewayClient.makeRequest(userConfigIdOptionsRequest, authType, additionalParams, config.apiKey);
    };


    return apigClient;
};

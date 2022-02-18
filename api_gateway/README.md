# Deploy to AWS Lambda (First time)
```
sam build --profile csx --region us-east-1

sam deploy --stack-name sam-lambda \
	--profile csx \
	--region us-east-1 \
	--guided
```
# Deploy to AWS Lambda (Subsequent times)
```
sam build --profile csx --region us-east-1

sam deploy
```

# Destroy infrastructure
```
sam delete --no-prompts --profile csx
```
# CloudWatch Endpoints

**List Cloudwatch Namespaces**

**/list-cloudwatch-namespaces**

**Type:** GET

**Purposes:** Lists all the namespaces that exist within the cloudwatch metrics for the current aws region

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/list-cloudwatch-namespaces

**List Cloudwatch Metrics**

**/list-cloudwatch-metrics**

**Type:** GET

**Query Params:** 
namespace - retrieved from list-cloudwatch-namespaces call

**Purposes:** Get all available metrics for a namespace. This returns the metrics as well as a list of all the dimensions for that metric

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/list-cloudwatch-metrics?namespace=AmazonMWAA

**Fetch Cloudwatch Metrics**

**/fetch-cloudwatch-metrics**

**Type:** POST

**Query Params:** 
namespace - retrieved from list-cloudwatch-namespaces call
metricName - retrieved from the list-cloudwatch-metrics call

**Body:**  The body is the dimension we want to retrieve. The list-cloudwatch-metrics call returns a list of dimensions for a metric and namespace combination. We need to pass in 1 of these metrics

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/fetch-cloudwatch-metrics?namespace=AmazonMWAA&metricName=CriticalSectionBusy

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/fetch-cloudwatch-metrics?namespace=AmazonMWAA&metricName=CriticalSectionBusy&period=60&stat=Sum&label=TempLabel&scanBy=TimestampDescending&previousDays=0 

## Sample Body  
```
[
  {
    "Name": "Function",
    "Value": "Scheduler"
  },
  {
    "Name": "Environment",
    "Value": "csx-nonprod-dataops"
  }
]
```
## Query Params
The following query parameters can be sent with the fetch-cloudwatch-metrics api call or just use the defaults as per the table. 

*Note*: namespace and metricName are required query params

Query Parameter | Required| Default Value| Description
------------ | ------------- | ------------- | -------------
namespace | Yes| | https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Namespace
metricName | Yes| | https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Metric
period | No | 60 | https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#CloudWatchPeriods
stat | No| Sum |https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html#Statistic
label | No| label | Descriptive lable for the data being returned (e.g. CPUUtilization, peak of ${MAX} was at ${MAX_TIME})
scanBy | No| TimestampDescending| How to order the metrics. Valid values are TimestampDescending or TimestampAscending
previousDays | No| 0 | Number of days to retrieve metrics for - 0 is current day, 1 is current day and previous day etc.

# Sagemaker Endpoints

**List Training Jobs**

**/sagemaker/list-training-jobs**

**Type:** GET

**Purposes:** Lists all the training jobs that exist in AWS for the current aws region

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/sagemaker/list-training-jobs

**Describe Training Job**

**/sagemaker/describe-training-job**

**Type:** GET

**Query Params:** 
trainingJobName - the trainingJobName retrieved in the list training jobs call

**Purposes:** Get the details from a specific training job

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/sagemaker/describe-training-job?trainingJobName=mxnet-training-2021-11-01-05-23-15-483

**List Endpoints**

**/sagemaker/list-endpoints**

**Type:** GET

**Purposes:** Lists all the endpoints exist in AWS for the current aws region

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/sagemaker/list-endpoints

**/sagemaker/invoke-endpoint**

**Type:** GET

**Query Params:** 
endpoint - the endpoint retrieved in the list endpoints call

od - the od value to retrieve from the dataset

**Purposes:** Invokes an endpoint in AWS for the current region

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/sagemaker/invoke-endpoint?endpoint=DEMO-deepar-2021-11-14-18-05-19-189&od=AF01

**List Sagemaker Tags**

**/sagemaker/tags**

**Type:** POST

**Purposes:** List tags for a SageMaker resource

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/sagemaker/tags

## Sample Body
```
{
	"ResourceARN": "arn:aws:sagemaker:us-east-1:736986175867:endpoint/demo-deepar-2021-12-02-19-48-24-830",
}
```



# OpsGenie Endpoints

**Fetch Alerts**

**/opsgenie/fetch-alerts**

**Type:** GET

**Purposes:** Fetches all alerts for the currently logged in api key

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/opsgenie/fetch-alerts

**Create Alert**

**/opsgenie/create-alert**

**Type:** POST

**Body:**  The body is the details of the alert that need to be created

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/opsgenie/create-alert

## Sample Body
**Note:** Message is the **only** required body attribute  
```
{
	"message": "Sample Message",
	"alias": "python_sample_alias",
	"description": "Sample of SDK v2 description",
	"responders": [{
		"name": "Name",
		"type": "team"
	}],
	"visible_to": [{
		"name": "Sample name",
		"type": "team"
	}],
	"actions": ["Restart", "AnExampleAction"],
	"tags": ["OverwriteQuietHours"],
	"details": {
		"details key1": "value1",
		"details key2": "value2"
	},
	"entity": "An example entity",
  "source": "source"
	"priority": "P3",
  "user": "user",
  "note": "note"
}
```
# User config Endpoints

**Retrieve User Config**

**/user/config/{userId}**

**Type:** GET

**Purposes:** Retrieves a user config entry for a given userId

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/user/config/1

**Create User Config**

**/user/config/{userId}**

**Type:** POST

**Purposes:** Stores a user config entry for a given userId

**Body:**  The body is the config that you want to be saved for a userId. **Note:** The body can be any valid json

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/user/config/1

## Sample Body  
```
{
    "config": "1"
}
```

**Update User Config**

**/user/config/{userId}**

**Type:** PUT

**Purposes:** Updates a user config entry for a given userId

**Body:**  The body is the config that you want to be updated for a userId. **Note:** The body can be any valid json

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/user/config/1

## Sample Body  
```
{
    "config": "2"
}
```

**Delete User Config**

**/user/config/{userId}**

**Type:** DELETE

**Purposes:** Delete a user config entry for a given userId

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/user/config/1

# Airflow Endpoints

**List Airflow Environments**

**/airflow/environments**

**Type:** GET

**Purposes:** Retrieves the list of available airflow environments

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/airflow/environments

**Describe Airflow Environment**

**/airflow/environments/{environment}**

**Type:** GET

**Purposes:** Describes the airflow environment for the passed in environment string

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/airflow/environments/csx_dev_low_ver_env

**Get Airflow Environment Tags**

**/airflow/environments/{environment}/tags**

**Type:** GET

**Purposes:** Get the airflow environment tags for the passed in environment string

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/airflow/environments/csx_dev_low_ver_env/tags

# Kafka Clusters

**List Kafka Clusters**

**/kafka/clusters**

**Type:** GET

**Purposes:** Retrieves the list of available kafka clusters

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/kafka/clusters

**List Kafka Clusters Tags**

**/kafka/clusters/tags**

**Type:** GET

**Purposes:** Retrieves the list of available kafka clusters and their associated tags

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/kafka/clusters/tags

**Describe Kafka Cluster**

**/kafka/clusters/**

**Type:** POST

**Purposes:** Describes the kafka cluster for the details passed in request body

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/kafka/clusters

## Sample Body  
```
{
    "ClusterName": "staging-msk-dev",
    "ClusterARN": "arn:aws:kafka:us-east-1:736986175867:cluster/staging-msk-dev/729d9487-cd51-4650-a372-85e48e697d30-20"
}
```

**Describe Kafka Cluster Tags**

**/kafka/clusters/tags**

**Type:** POST

**Purposes:** Describes the kafka cluster tags for the details passed in request body

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/kafka/clusters/tags

## Sample Body  
```
{
    "ClusterName": "staging-msk-dev",
    "ClusterARN": "arn:aws:kafka:us-east-1:736986175867:cluster/staging-msk-dev/729d9487-cd51-4650-a372-85e48e697d30-20"
}
```

# API Gateway 

**List Rest APIS**

**/apigateway/rest-apis**

**Type:** GET

**Purposes:** Retrieves the list of available Api Gateway rest apis

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/apigateway/rest-apis

**Describe Rest API**

**/apigateway/rest-apis/{rest-api-id}**

**Type:** GET

**Purposes:** Describes the rest api on API Gateway for a given rest-api-id

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/apigateway/rest-apis/i0jr8migw7

**List Rest API Resources**

**/apigateway/rest-apis/{rest-api-id}/resources**

**Type:** GET

**Purposes:** Lists the rest api resources on API Gateway for a given rest-api-id

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/apigateway/rest-apis/i0jr8migw7/resources

**Describe Rest API Resources**

**/apigateway/rest-apis/{rest-api-id}/resources/{resource-id}**

**Type:** GET

**Purposes:** Describes the rest api resource on API Gateway for a given rest-api-id and resource-id

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/apigateway/rest-apis/i0jr8migw7/resources/6kofqg


# S3

**List Buckets**

**/s3/buckets**

**Type:** GET

**Purposes:** Retrieves the list of available buckets

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/s3/buckets

**List Bucket Objects**

**/s3/buckets/{bucket-name}/objects**

**Type:** GET

**Purposes:** Retrieves the objects in a given bucket

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/s3/buckets/sagemaker-soln-ddf-js-cu7ax1-736986175867-us-east-1/objects

**List Bucket Tags**

**/s3/buckets/{bucket-name}/tags**

**Type:** GET

**Purposes:** Retrieves the tags for a given bucket

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/s3/buckets/sagemaker-soln-ddf-js-cu7ax1-736986175867-us-east-1/tags

**List Object Tags**

**/s3/buckets/{bucket-name}/objects/{object-key}/tags**

**Type:** POST

**Purposes:** Retrieves the tags for a given object

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/s3/buckets/sagemaker-soln-ddf-js-cu7ax1-736986175867-us-east-1/objects/das/tags

## Sample Body  
```
{
    "ObjectKey": "dags/snflk_milepost_int_to_pres.py"
}
```


# Amplify

**List Apps**

**/amplify/apps**

**Type:** GET

**Purposes:** Retrieves the list of available amplify apps

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/amplify/apps

**Describe App**

**/amplify/apps/{appId}**

**Type:** GET

**Purposes:** Describes the amplify app based on the appId passed in

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/amplify/apps/d2bgj6ie0zsggt

**Get App Tags**

**/amplify/apps/tags**

**Type:** POST

**Purposes:** Gets tags for the amplify app based on the resourceARN passed in

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/amplify/apps/tags

## Sample Body  
```
{
    "ResourceARN": "arn:aws:amplify:us-east-1:736986175867:apps/d2bgj6ie0zsggt"
}
```


# Lambda

**List Functions**

**/lambda/functions**

**Type:** GET

**Purposes:** Retrieves the list of available lambda functions

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/lambda/functions

**Describe Function**

**/lambda/functions/{functionName}**

**Type:** GET

**Purposes:** Describes the lambda function based on the functionName passed in

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/lambda/functions/s3

**Get Lambda Function Tags**

**/lambda/functions/tags**

**Type:** POST

**Purposes:** Gets tags for the lambda function based on the resourceARN passed in

**Sample Endpoint:** https://i0jr8migw7.execute-api.us-east-1.amazonaws.com/Prod/lambda/functions/tags

## Sample Body  
```
{
    "ResourceARN": "arn:aws:lambda:us-east-1:736986175867:function:s3"
}
```
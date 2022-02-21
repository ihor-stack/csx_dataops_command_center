export interface AirflowEnvironment {

}

export interface AirflowEnvironmentTag {

}

export interface AmplifyApp {

}

export interface AmplifyAppId {

}

export interface ApigatewayRestApi {

}

interface MetricDataResult {
  Id: string;
  Label: string;
  Timestamps: string[];
  Values: any[],
  StatusCode: string;
}

export interface CloudwatchMetrics {
  MetricDataResults: MetricDataResult[],
  Messages: any[],
  ResponseMetadata: {
    RequestId: string;
    HTTPStatusCode: number;
    HTTPHeaders: {
      [key: string]: string;
    },
    RetryAttempts: number;
  }
}

export interface SagemakerTrainingJob {
  TrainingJobName: string;
  TrainingJobArn: string;
  CreationTime: string;
  TrainingEndTime: string;
  LastModifiedTime: string;
  TrainingJobStatus: string; // ? enum
}

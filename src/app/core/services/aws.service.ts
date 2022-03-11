/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import * as AwsClientFactory from '@src/aws-js-sdk/aws-js-sdk';
import { Observable, throwError, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggerService } from '@services/logger.service';
// import { environment } from '@env';
import { CustomError } from '@core/custom-error';
import {
  AirflowEnvironment,
  AirflowEnvironmentTag,
  AmplifyApp,
  AmplifyAppId,
  ApigatewayRestApi,
  CloudwatchMetrics,
  SagemakerTrainingJob
} from '@defs/aws-api';

interface ApiClientResponse {
  config: { [key: string]: any },
  data: any,
  error?: any,
  headers: { [key: string]: any },
  status: number;
  statusText: string;
}

@Injectable()
export class AwsService {
  private client: any;

  constructor(
    private logger: LoggerService
  ) {
    this.client = AwsClientFactory.newClient({
      // accessKey: '',
      // secretKey: '',
      // apiKey: 'API_KEY'
    });
  }

  private callClientMethod<T = any>(methodName: string, ...params: any): Observable<T> {
    return from<Promise<ApiClientResponse>>(this.client[methodName](...params))
      .pipe(
        map((res) => {
          if (res.status !== 200) {
            throwError(() => {
              this.logger.log('api err', res);
              return new CustomError(`API response code ${res.status}`, res.status);
            });
          }

          return res.data as T;
        })
      );
  }

  airflowEnvironments() {
    return this.callClientMethod<AirflowEnvironment[]>('airflowEnvironmentsGet');
  }

  airflowEnvironmentsEnvironment() {
    return this.callClientMethod<AirflowEnvironment>('airflowEnvironmentsEnvironmentGet');
  }

  airflowEnvironmentsEnvironmentTags() {
    return this.callClientMethod<AirflowEnvironmentTag[]>('airflowEnvironmentsEnvironmentTagsGet');
  }

  amplifyApps() {
    return this.callClientMethod<AmplifyApp[]>('amplifyAppsGet');
  }

  /*
  setAmplifyAppsTags() {
    amplifyAppsTagsPost
  }
  */

  amplifyAppsAppId() {
    return this.callClientMethod<AmplifyAppId>('amplifyAppsAppIdGet');
  }

  apigatewayRestApis() {
    return this.callClientMethod<ApigatewayRestApi[]>('apigatewayRestApisGet');
  }

  // HERE
  /*
  apigatewayRestApisRestApiIdGet
  apigatewayRestApisRestApiIdResourcesGet
  apigatewayRestApisRestApiIdResourcesResourceIdGet

  kafkaClustersGet
  kafkaClustersPost
  kafkaClustersTagsGet
  kafkaClustersTagsPost

  lambdaFunctionsGet
  lambdaFunctionsTagsPost
  lambdaFunctionsFunctionNameGet
  */

  fetchCloudwatchMetrics(
    namespace: string,
    metricName: string,
    dimensions: any,
    startTime?: Date | string | null,
    endTime?: Date | string | null
  ) {
    const queryParams = {
      namespace,
      metricName,
      scanBy: 'TimestampAscending'
    } as any;

    if (startTime) queryParams.startTime = startTime;
    if (endTime) queryParams.startTime = startTime;

    console.log(`fetchCloudwatchMetrics: NS=${namespace}, metric=${metricName}, dims=`, dimensions);
    return this.callClientMethod<CloudwatchMetrics>(
      'fetchCloudwatchMetricsPost',
      {},
      dimensions,
      { queryParams }
    );
  }

  listCloudwatchMetrics(namespace: string) {
    return this.callClientMethod<any>('listCloudwatchMetricsGet', {}, '', { queryParams: { namespace } });
  }

  listCloudwatchNamespaces() {
    return this.callClientMethod<string[]>('listCloudwatchNamespacesGet');
  }

  /*
  opsgenieCreateAlertPost

  s3BucketsGet
  s3BucketsBucketNameObjectsGet
  s3BucketsBucketNameObjectsTagsPost
  s3BucketsBucketNameTagsGet

  sagemakerDescribeTrainingJobGet
  sagemakerInvokeEndpointGet
  sagemakerListEndpointsGet
  */

  sagemakerListTrainingJobs() {
    return this.callClientMethod<SagemakerTrainingJob[]>('sagemakerListTrainingJobsGet');
  }

  /*
  sagemakerTagsPost
  userConfigIdGet
  userConfigIdPut
  userConfigIdPost
  userConfigIdDelete
  */
}

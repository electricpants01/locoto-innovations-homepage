import { SSTConfig } from "sst";
import { Api } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "backend2",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.setDefaultFunctionProps({
      runtime: "python3.11",
    });

    app.stack(function Stack({ stack }) {
      const api = new Api(stack, "api", {
        routes: {
          "GET /": "functions/lambda.handler",
          "GET /search": "functions/lambda.handler",
        },
      });

      stack.addOutputs({
        ApiEndpoint: api.url,
        ApiLambda: api.httpApiArn,
      });
    });
  },
} satisfies SSTConfig;

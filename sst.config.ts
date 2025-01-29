/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "locoto-innovations-homepage",
      removal: input?.stage === "prod" ? "retain" : "remove",
      home: "aws",
      region: 'us-east-1'
    };
  },
  async run() {
    new sst.aws.Astro("LocotoHomePage");
  },
});

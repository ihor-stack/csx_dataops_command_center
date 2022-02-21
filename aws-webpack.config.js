const path = require('path');
const WebpackConcatPlugin = require('webpack-concat-files-plugin');
const terser = require('terser');

const baseDir = path.resolve(__dirname, 'api_gateway');
const srcDir = `${baseDir}/js-sdk-v2`;
const dstDir = path.resolve(__dirname, 'src/aws-js-sdk');
const dstFilename = 'aws-js-sdk.js';

module.exports = {
  mode: 'production',
  entry: {},
  output: {},
  plugins: [
    new WebpackConcatPlugin({
      bundles: [{
        src: [
          `${srcDir}/lib/axios/dist/axios.standalone.js`,
          `${srcDir}/lib/CryptoJS/rollups/hmac-sha256.js`,
          `${srcDir}/lib/CryptoJS/rollups/sha256.js`,
          `${srcDir}/lib/CryptoJS/components/hmac.js`,
          `${srcDir}/lib/CryptoJS/components/enc-base64.js`,
          `${srcDir}/lib/url-template/url-template.js`,
          `${srcDir}/lib/apiGatewayCore/sigV4Client.js`,
          `${srcDir}/lib/apiGatewayCore/apiGatewayClient.js`,
          `${srcDir}/lib/apiGatewayCore/simpleHttpClient.js`,
          `${srcDir}/lib/apiGatewayCore/utils.js`,
          `${srcDir}/apigClient.js`,
          `${baseDir}/module.js`,
        ],
        dest: `${dstDir}/${dstFilename}`,
        transforms: {
          after: async (code) => {
            const minifiedCode = await terser.minify(
              code,
              {
                keep_classnames: true,
                keep_fnames: true,
                compress: true
              }
            );
            return minifiedCode.code;
          },
        },
      }],
    }),
  ],
};

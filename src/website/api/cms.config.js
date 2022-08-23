// @flow
const cmsHeader = {
  headers: {
    'Content-Type': 'application/vnd.contentful.delivery.v1+json',
    'X-Contentful-User-Agent':
      'contentful.js/0.0.0-determined-by-semantic-release',
    // "Accept-Encoding": "gzip",
    // "user-agent": "node.js/12",
    Authorization: `Bearer ${process.env.REACT_APP_CMS_AUTHORIZATION || ''}`,
  },
};

export default cmsHeader;

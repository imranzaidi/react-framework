import ReactDOM from 'react-dom/server';

export default (reactComponent) => {
  return new Promise((resolve, reject) => {
    const body = [];
    const bodyStream = ReactDOM.renderToNodeStream(reactComponent);
    bodyStream.on('data', (chunk) => {
      body.push(chunk.toString());
    });
    bodyStream.on('error', (err) => {
      reject(err);
    });
    bodyStream.on('end', () => {
      resolve(body.join(''));
    });
  });
};

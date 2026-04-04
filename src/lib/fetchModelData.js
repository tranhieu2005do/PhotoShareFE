/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to fetch from.
 * @returns {Promise}       A promise that resolves with the object fetch from the URL
 *                          or rejects with an error.
 */
function fetchModel(url) {
  return new Promise(function (resolve, reject) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          reject(new Error(response.statusText));
        }
        return response.json();
      })
      .then((data) => {
        resolve({ data: data });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default fetchModel;

import axios from 'axios';

function createAxiosConfig(options) {

  let axiosConfig = {
    method: options.method.toLowerCase(),
    url: options.url
  };
  
  if (options.data !== undefined)
    axiosConfig.data = options.data;

  return axiosConfig;

}

/*
 *  API Middleware - Listens for two actions:
 *
 *  API_REQUEST - Sends a single request
 *  API_REQUEST_MULTI - Given an array of requests will send all requests in parallel and use Promise.all
 *                      to wait for all requests to finish and dispatch a single success/error action
 *
 */

const apiMiddleWare = ({ dispatch, getState }) => next => action => {
 
  const options = (action.options) ? { ...action.options } : {};
  console.log(action);

  switch(action.type) {

    case 'API_REQUEST': {

      if ((!options.url))
        return next(action);
      
      const axiosConfig = createAxiosConfig(options);

      axios(axiosConfig).then(response => dispatch({
        type: options.success,
        data: response.data
      })).catch(responseError => dispatch({
        type: options.error,
        responseError
      }));

      break;
    }

    case 'API_REQUEST_MULTI': {

      if (!Array.isArray(options.url) && (!options.requests))
        return next(action);

      const axiosRequests = options.requests.map((request) => {

        const axiosConfig = createAxiosConfig(request);
        return axios(axiosConfig);

      });

      Promise.all(axiosRequests).then((response) => {

        let requestResult = {};

        options.requests.forEach((request, index) => {

          const nameProp = (request.name) ? request.name : `'FILL_NAME_PLEASE_${index}`;
          requestResult[nameProp] = response[index].data;
        
        });

        return dispatch({
          type: options.success,
          ...requestResult
        });

      }).catch((responseError) => {
        
        return dispatch({
          type: options.error,
          responseError
        });

      });

      break;
      
    }

    default: {
      return next(action);
      break;
    }

  }

  if (options.loading !== undefined)
    return dispatch({ type: 'loading' });

}

export default apiMiddleWare;

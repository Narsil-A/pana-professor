import { getAccessToken } from "../lib/actions";

const apiService = {
    get: async function (url: string): Promise<any> {
        try {
            const token = await getAccessToken(); // Fetch the access token
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json(); // Parse the error response
                return Promise.reject(errorData); // Reject the promise with the error data
            }

            return response.json(); // Parse and return the response JSON
        } catch (error) {
            return Promise.reject(error); // Catch and reject any other errors
        }
    },

    put: async function (url: string, data: any): Promise<any> {
        try {
            const token = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                return Promise.reject(errorData);
            }

            return response.json();
        } catch (error) {
            return Promise.reject(error);
        }
    },

    post: async function (url: string, data: any): Promise<any> {
        try {
            const token = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: data, 
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                return Promise.reject(errorData);
            }
    
            return response.json();
        } catch (error) {
            return Promise.reject(error);
        }
    },

    delete: async function (url: string): Promise<any> {
        try {
            console.log('delete', url);
            const token = await getAccessToken();
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 204) {
                return null;
            }

            if (!response.ok) {
                const errorData = await response.json();
                return Promise.reject(errorData);
            }

            const json = await response.json();
            console.log('Response:', json);
            return json;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    postWithoutToken: async function (url: string, data: any): Promise<any> {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                return Promise.reject(errorData);
            }

            return response.json();
        } catch (error) {
            return Promise.reject(error);
        }
    },

    getWithoutToken: async function (url: string): Promise<any> {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
    
          if (!response.ok) {
            const errorData = await response.json(); // Parse the error response
            return Promise.reject(errorData); // Reject the promise with the error data
          }
    
          return response.json(); // Parse and return the response JSON
        } catch (error) {
          return Promise.reject(error); // Catch and reject any other errors
        }
      },
};

export default apiService;
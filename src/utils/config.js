export const config = {
    google : {
        token : process.env.REACT_APP_GOOGLE_API_TOKEN,
    },
    sanity : {
        projectId : process.env.REACT_APP_SANITY_PROJECT_ID,
        token : process.env.REACT_APP_SANITY_API_TOKEN,
    },
};

export const  parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

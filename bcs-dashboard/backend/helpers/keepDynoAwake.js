/**
 * Purpose: Calls the url at set intervials to keep Heroku dyno awake
 * Source:  @fermentationist
 * URL:     https://hackernoon.com/how-to-prevent-your-free-heroku-dyno-from-sleeping-dggxo3bi2
 */
const fetch = require("node-fetch");

const keepDynoAwake = (url, interval = .5, callback) => {
    const milliseconds = interval * 60000;
    setTimeout(() => {

        try { 
            console.log(`setTimeout called.`);
            // HTTP GET request to the dyno's url
            fetch(url).then(() => console.log(`Fetching ${url}.`)); 
        }
        catch (err) { // catch fetch errors
            console.log(`Error fetching ${url}: ${err.message} 
            Will try again in ${interval} minutes...`);
        }
        finally {

            try {
                callback(); // execute callback, if passed
            }
            catch (e) { // catch callback error
                callback ? console.log("Callback failed: ", e.message) : null;
            }
            finally {
                // do it all again
                return keepDynoAwake(url, interval, callback);
            }
            
        }

    }, milliseconds);
};

module.exports = keepDynoAwake;
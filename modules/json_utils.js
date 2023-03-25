/** @module json_utils */

/**
 * Decodes a JSON string into a JavaScript object.
 * @param {string} data - The JSON string to be decoded.
 * @param {*} [fallback=undefined] - The fallback value to be returned if JSON parsing fails.
 * @returns {*} The decoded JavaScript object or the fallback value if JSON parsing fails.
 */
export function jsonDecode(data, fallback = undefined){

    if(!data){
        return fallback;
    }

    try{
        return JSON.parse(data);
    } catch(error){
        console.error('Error while parsing JSON:', error);
    }
}
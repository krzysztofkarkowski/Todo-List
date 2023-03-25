/** @module storage_utils */

import {jsonDecode} from "./json_utils";

/**
 * Gets the data stored in the specified storage type (session/local) for the specified item name.
 * @param {string} item_name - The name of the item to retrieve from storage.
 * @param {'session'|'local'} storage_type - The type of storage to retrieve data from (session/local).
 * @param {boolean} [json_data=true] json_data - Optional. Indicates whether the data retrieved should be parsed as JSON (default: true).
 * @returns {any} - Returns the data retrieved from storage for the specified item name and storage type.
 * If json_data is true, the data is parsed as JSON before returning.
 */
export function getStorageData(item_name,storage_type,json_data = true){

    if (storage_type !== 'session' && storage_type !== 'local') {
        return 0;
    }
    const storage = (storage_type === 'session') ? sessionStorage : localStorage;
    const storage_data = storage.getItem(item_name);
    return (json_data && storage_data) ? jsonDecode(storage_data) : storage_data;

}

/**
 * Sets data to browser storage using either local or session storage.
 * @param {string} item_name - The name of the storage item.
 * @param {any} storage_data - The data to be stored.
 * @param {'session' | 'local'} storage_type - The type of storage to use ('local' or 'session').
 * @param {boolean} [json_data=false] - If true, the data is stored as JSON string.
 * @returns {number | void}
 */
export function setStorageData(item_name,storage_data,storage_type,json_data = true){

    if (storage_type !== 'session' && storage_type !== 'local') {
        return 0;
    }
    const storage = (storage_type === 'session') ? sessionStorage : localStorage;
    const dataToStore = (json_data) ? JSON.stringify(storage_data) : storage_data;
    storage.setItem(item_name, dataToStore);
}

/** @module task_list */

import {getStorageData,setStorageData} from "./storage_utils";

const task_template = document.getElementById('task_template');
const storage_type = 'local';

/**
 Creates a new task and adds it to the specified list.
 @param {string} name - The name of web storage key.
 @returns {boolean} - Returns true if a new task was successfully created and added to the list.
 */
export function createTask(name) {
    const input = document.getElementById('todo_input');
    if (input.value) {
        const task_array = getStorageData(name,storage_type);
        const date = new Date();
        task_array.push({
            'value': input.value,
            'date': date.getTime(),
            'status': 'todo'
        });
        setStorageData(name,task_array,storage_type);
        input.value = '';
        input.focus();
        return true;
    }
    return false;
}

/**
 * Renders the list of tasks in the specified HTML element.
 * @param {string} name - The name of web storage key to render.
 * @param {HTMLElement} destination - The HTML element where the list should be rendered.
 */
export function renderList(name,destination){
    const task_array = getStorageData(name,storage_type);
    destination.innerHTML = task_array.reduce(function(prevVal,currVal,i){
        return prevVal + generateLi(currVal,i);
    },'');
}

/**
 * Generates a <li> element based on the provided currVal and i.
 * @param {Object} currVal - The current value to be used in generating the <li> element.
 * @param {number} i - The index of the current value and special id for label in template.
 * @returns {string} - The generated <li> element as a string.
 */
function generateLi(currVal,i) {

    return task_template.innerHTML.replace(/\${(.*?)}/g, function (match, variable) {
        currVal['i'] = i;
        return currVal[variable] || '';
    });
}


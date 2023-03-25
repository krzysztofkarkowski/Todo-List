/** @module task_events */

import {getStorageData,setStorageData} from "./storage_utils";

const list_name = 'tasks';
const storage_type = 'local';


/**
 * Handles the click event for a task button.
 * @param {Event} content_event - The event object for the click event.
 * @returns {void}
 */
export function clickTask(content_event) {
    if (content_event.target.classList.contains('js__button')) {
        let change_type;
        if (content_event.target.checked === false) {
            change_type = 0;
        } else if(content_event.target.checked === true) {
            change_type = 1;
        }else{
            change_type = -1;
        }
        changeList(change_type, content_event.target.closest('[data-date]'),list_name);
    }
}

/**
 * Change the status of a task in a list and update the storage accordingly
 * @param {number} change_type - The type of change to be made (0: unchecked, 1: checked, -1: delete)
 * @param {HTMLElement} task_controller - The HTML element corresponding to the task to be modified
 * @param {string} list_name - The name of the list where the task is located
 * @returns {void}
 */
function changeList(change_type,task_controller,list_name){
    const task_array = getStorageData(list_name,storage_type);
    const task_index = task_array.findIndex(function(element){
        return element.date === parseInt(task_controller.dataset.date)
    });

    if(change_type>0){
        if(task_array[task_index]) {
            task_controller.classList.remove('todo');
            task_array[task_index].status = 'checked';
        }
    }else if(change_type===0){
        if(task_array[task_index].status){
            task_controller.classList.add('todo');
            delete task_array[task_index].status;
        }
    }else if(change_type<0){
        if (task_array) {
            task_array.splice(task_index, 1);

        }
        setTimeout(() => {
            task_controller.closest('li').remove();
        }, 350);
    }
    if(typeof(change_type) === 'number' && task_index)
        setStorageData(list_name,task_array,storage_type);
}



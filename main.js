/** @module main */

import './style.scss'

import {clickTask} from './modules/task_events';
import {createTask,renderList} from './modules/task_list';


window.addEventListener('DOMContentLoaded', function(){
    if (typeof (Storage) === "undefined") {
        return 0;
    }
    const submit = document.getElementById("todo_submit");
    const list_destination = document.getElementById("todo_content");
    const list_name = 'tasks';

    if(list_destination) {
        renderList(list_name,list_destination);
        list_destination.addEventListener("click", clickTask)
    }

    if (submit) {
        submit.addEventListener('submit', function(submit_event){
            if(createTask(list_name))
                renderList(list_name,list_destination);
            submit_event.preventDefault();
        });
    }
});
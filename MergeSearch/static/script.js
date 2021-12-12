$(document).ready(function() {

    var tables = []; // array of all datatable objects currently on the page
    tables.push($('#results_table').DataTable()); // main datatable lives in index 0
    var count = 1; // number of datatables on the page
    
    /* pulls in the contents of the main datatable as an array.
     * this array is used to populate iterative datatables: */
    const arr = $('#results_table').DataTable().rows().data().toArray();

    /* function that triggers when any checkbox is clicked within the
     * #data_tables div. (handles row selection.) */
    $('#data_tables').on('click', 'input[type="checkbox"]', function() {

        /* grabs the parent "tr" element of the checkbox and
         * toggles the "selected" class on it: */
        var row = $(this).parent().parent();
        $(row).toggleClass('selected');
    });
    
    /* function that triggers when any button of class .hide_button
     * is clicked within the #data_tables div. (handles row hiding.) */
    $('#data_tables').on('click', 'button.hide_button', function() {

        /* grabs the id of the button, which is also the index of its
         * datatable in the array of datatables: */
        let id = Number($(this).attr('id'));

        /* uses the button id to access its datatable and remove
         * all rows of class .selected: */
        tables[id].rows('.selected').remove().draw();
    });
    
    /* function that triggers when any button of class .show_button
     * is clicked within the #data_tables div. (handles row showing.) */
    $('#data_tables').on('click', 'button.show_button', function() {

        /* grabs the id of the button, which is also the index of its
         * parent datatable in the array of datatables: */
        let id = Number($(this).attr('id'));

        // grabs all rows of class .selected in the datatable:
        let selected = tables[id].rows('.selected').data().toArray();

        /* clears the datatable of all contents, and then
         * repopulates it with the selected rows: */
        tables[id].clear();
        tables[id].rows.add(selected).draw();
    });
    
    /* function that triggers when any change is made to input of
     * class .toggle-vis. (handles column hiding.) */
    $('input.toggle-vis').on('change', function(e) {

        let id = $(this).attr('id'); // grabs id of the checkbox
         // boolean var that tells if checkbox is checked:
        let checked = $('#'+id).is(':checked');

        /* grabs data-column attribute of the checkbox, which
         * doubles as the correpsonding datatable column index: */
        let col_index = $(this).attr('data-column');

        // loops through the datatables:
        for (let i = 0; i < tables.length; i++) {

            /* in each table, sets the visibility status of the
             * column at col_index to the truth value of checked: */
            let column = tables[i].column(col_index);
            column.visible(checked);
        }
    });

    /* function that triggers when button id #new_search is clicked
     * within the #container div. (handles generating new tables.) */
    $('#container').on('click', '#new_search', function() {

        let data = arr.concat(); // creates a copy of arr
        // shows the merge button when at least two tables exist:
        document.getElementById('merge').style.display = '';
        // the new table's id is 'table_' + the current table count:
        let new_id = "table_" + String(count);

        /* creates the html for a new blank table with only the
         * necessary details, including a hide and show buttons: */
        let tab_html = "<table class='display nowrap dataTable'" + 
            "width='100%' id='" + new_id + "'><thead><tr>" +
            "<th class='hide_th'><button id=" + count +
            " type='button' class='show_button'>Show</button>" +
            "<button id=" + count + " type='button' class='hide_button'>" +
            "Hide</button></th><th>Year-Semester</th><th>Class</th>" +
            "<th>Team#</th><th>Team Name</th><th>Project Title</th>" +
            "<th>Organization</th><th>Industry</th><th>Abstract</th>" +
            "<th>Student Names</th></tr></thead>" +
            "<tbody class='dt-body-left'></tbody></table>";

        // appends the html to the #iterative_tables div:
        document.getElementById('iterative_tables').innerHTML += tab_html;
        // makes the table into a datatable and pushes it to the array:
        tables.push($('#'+new_id).DataTable());
        // populates the datatable with the copy of arr:
        tables[count].rows.add(data);
        // adjusts and shows table on page:
        tables[count].columns.adjust().draw();
        count++; // increments the number of tables on the page
    });
    
    /* function that triggers when button id #merge is clicked.
     * (handles merging tables.) */
    $('#merge').click(function() {

        // hides the merge button when only one table is on the page:
        document.getElementById('merge').style.display = 'none';

        /* "merged" is the array that will store all merged data.
         * it starts off with a copy of the data from the main datatable: */
        var merged = tables[0].rows({filter:'applied'}).data().toArray();
    
        /* loop continues until only the main datatable remains
         * in the array of datatables: */
        while (tables.length > 1) {

            // pops a datatable from the array and gets a copy of its data:
            var table  = tables.pop().rows({filter:'applied'}).data().toArray();
    
            // loops through the rows of the popped table:
            for (let i = 0; i < table.length; i++) {

                merged.push(table[i]); // pushes each row onto "merged"
            }
        }

        /* removes duplicate rows from "merged"; decides what a duplicate
         * is by comparing the values of the first 3 columns: */
        merged = merged.filter((v,i,a)=>a.findIndex(t=>(t[1] === v[1] && t[2] === v[2] && t[3] === v[3])) === i);
    
        tables[0].clear(); // clears all data from main table
        tables[0].rows.add(merged); // repopulates it with "merged"
        tables[0].search(''); // clears the search bar
        tables[0].columns.adjust().draw(); // adjusts and shows table on page

        // gets the #iterative_tables div:
        var div = document.getElementById('iterative_tables');
        div.innerHTML = ''; // clears the old tables from the div
        count = 1; // resets the number of tables back to 1
    });
});




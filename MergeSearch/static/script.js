var dataTable1, dataTable2, tab;
var arr;
var count = 1;
var tables = [];

$(document).ready(function() {
    dataTable1 = $('#results_table').DataTable();
    tables.push(dataTable1);
    arr = $('#results_table').DataTable().rows().data().toArray();

    $('#data_tables').on('click', 'input[type="checkbox"]', function() {
        var row_id = $(this).parent().parent();
        $(row_id).toggleClass('selected');
    });

    $('#data_tables').on('click', 'button.hide_button', function() {
        let id = Number($(this).attr('id'));
        console.log(id);
        tab = tables[id];
        tab.rows('.selected').remove().draw(false);
    });

    $('input.toggle-vis').on('click', function(e) {
        var column = dataTable1.column($(this).attr('data-column'));
        column.visible(!column.visible());
        dataTable1.columns.adjust().draw();
    });

    $('#new_search').click(function() {
        document.getElementById('merge').style.display = '';
        let new_id = "table_" + String(count);
        let tab_html = "<table class='display' id='" + new_id + "'><thead><tr><th class='hide_th'><button id=" + count + " type='button' class='hide_button'>Hide</button></th><th>Year-Semester</th><th>Class</th><th>Team#</th><th>Team Name</th><th>Project Title</th><th>Organization</th><th>Industry</th><th>Abstract</th><th>Student Names</th></tr></thead><tbody></tbody></table>"
        document.getElementById('iterative_tables').innerHTML += tab_html;
        let tab = $('#table_'+String(count)).DataTable();
        tab.rows.add(arr);
        tab.columns.adjust().draw();
        tables.push(tab);
        count++;
    });

    $('#merge').click(function() {
        document.getElementById('merge').style.display = 'none';
        var merged = tables.shift().rows({filter:'applied'}).data().toArray();

        while (tables.length > 0) {
            var table  = tables.pop().rows({filter:'applied'}).data().toArray();

            for (let i = 0; i < table.length; i++) {
                merged.push(table[i]);
            }
        }
        console.log(merged.length);
        // removes duplicates
        // decides what a dupe is by the student names column (9) and the team name column (4)
        merged = merged.filter((v,i,a)=>a.findIndex(t=>(t[1] === v[1] && t[2] === v[2] && t[3] === v[3])) === i);
        console.log(merged.length);
        dataTable1.clear().draw();
        dataTable1.rows.add(merged);
        dataTable1.search('').draw();
        dataTable1.columns.adjust().draw();
        tables[0] = dataTable1;
        var div = document.getElementById('iterative_tables');
        div.innerHTML = '';
        count = 1;
    })
});

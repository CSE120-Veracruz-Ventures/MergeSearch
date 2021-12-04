$(document).ready(function() {
    //var checked = $('#'+id).is(':checked');
    //console.log(checked);
    var count = 1;
    var tables = [];
    tables.push($('#results_table').DataTable());
    
    //tables.push(dataTable1);
    const arr = $('#results_table').DataTable().rows().data().toArray();


    $('#data_tables').on('click', 'input[type="checkbox"]', function() {
        console.log('checkbox click');
        var row_id = $(this).parent().parent();
        var table_id = row_id.parent().parent().attr('id');
        console.log('parent table ' +  table_id);
    
        $(row_id).toggleClass('selected');
    });
    
    $('#data_tables').on('click', 'button.hide_button', function() {
        let table_id = $(this).parent().parent().parent().parent().attr('id');
        let list = [];
        let tab = $('#'+table_id);
        tab.find('.selected').each(function(i,v) {
            list.push($(v));
        });
        console.log(list);
        console.log('hide click');
        let id = Number($(this).attr('id'));
        console.log(table_id);
        console.log(tables[id].table().node().id);
        //tab = tables[id];
        tables[id].rows('.selected').remove().draw();
    });
    
    $('#data_tables').on('click', 'button.show_button', function() {
        console.log('show click');
        let id = Number($(this).attr('id'));
        let selected = tables[id].rows('.selected').data().toArray();
        tables[id].clear();
        tables[id].rows.add(selected).draw();
    });
    
    $('input.toggle-vis').on('change', function(e) {
        console.log('toggle column click');
        var id = $(this).attr('id');
        var checked = $('#'+id).is(':checked');
        console.log(checked);
        var num = $(this).attr('data-column');
        var i = 0;
        while (i < tables.length) {
            var column = tables[i].column(num);
            column.visible(checked);
            tables[i].columns.adjust().draw();
            i++;
        }
    });

    $('#container').on('click', '#new_search', function() {
        let data = arr.concat();
        document.getElementById('merge').style.display = '';
        let new_id = "table_" + String(count);
        let tab_html = "<table class='display nowrap dataTable' width='100%' id='" + new_id + "'><thead><tr><th class='hide_th'><button id=" + count + " type='button' class='show_button'>Show</button><button id=" + count + " type='button' class='hide_button'>Hide</button></th><th>Year-Semester</th><th>Class</th><th>Team#</th><th>Team Name</th><th>Project Title</th><th>Organization</th><th>Industry</th><th>Abstract</th><th>Student Names</th></tr></thead><tbody class='dt-body-left'></tbody></table>";
        document.getElementById('iterative_tables').innerHTML += tab_html;
        tables.push($('#'+new_id).DataTable());
        tables[count].rows.add(data);
        tables[count].columns.adjust().draw();
        //tables.push(tab);
        let list = [];
        let div = $('#iterative_tables');
        div.find('table').each(function(i,v) {
            list.push($(v));
        });
        console.log(list);
        console.log(list[count-1] === tables[count]);
        count++;
    });
    
    $('#merge').click(function() {
        document.getElementById('merge').style.display = 'none';
        var merged = tables[0].rows({filter:'applied'}).data().toArray();
    
        while (tables.length > 1) {
            var table  = tables.pop().rows({filter:'applied'}).data().toArray();
    
            for (let i = 0; i < table.length; i++) {
                merged.push(table[i]);
            }
        }
    
        // removes duplicates
        // decides what a dupe is by comparing first 3 columns
        merged = merged.filter((v,i,a)=>a.findIndex(t=>(t[1] === v[1] && t[2] === v[2] && t[3] === v[3])) === i);
    
        tables[0].clear();
        tables[0].rows.add(merged);
        tables[0].search('');
        tables[0].columns.adjust().draw();
        //tables[0] = dataTable1;
        var div = document.getElementById('iterative_tables');
        div.innerHTML = '';
        count = 1;
    });
});





/*$("#searchbar").keyup(function(){
    var text = $(this).val();

    $.ajax({
        url: "/",
        type: "get",
        data: {jsdata: text},
        success: function(response) {
            $("#idk").html(response);
        },
        error: function(xhr) {

        }});
});*/

$(document).ready(function() {
    $('table.display').DataTable();
});

/*$(document).ready(function() {

    $('form').on('submit', function(event) {

        $.ajax({
            url: '/',
            data: {keyword: $('#searchbar').val()},
            type: 'POST',
            dataType: 'json',
            success: function(response){
                console.log(response.resp)
                alert(JSON.stringify(response.resp))
                $('#results').html(response.resp)
            },
            failure: function(response){
                alert('failure')
            }
        })
        .done(function(response) {
            $('#results').html(response.resp);
        });
        event.preventDefault();
    });

});*/

function hideRow() {
    var checkboxes = document.getElementsByName('row_checkboxes');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            var row = document.getElementById(checkboxes[i].id);
            row.style.display = 'none';
        }
    }

}

function toggleCol(col_num) {
    var checkbox = document.getElementById(col_num);
    var col = document.getElementsByClassName(col_num);
    if (checkbox.checked) {
        for (var i = 0; i < col.length; i++) {
            col[i].style.display = 'table-cell';
        }
        document.getElementById(col_num+'_head').style.display = 'table-cell';
    } else {
        for (var i = 0; i < col.length; i++) {
            col[i].style.display = 'none';
        }
        document.getElementById(col_num+'_head').style.display = 'none';
    }
}

var searches = 0;

// new increment search
function incrementSearch(data) {
    const columns = Object.keys(data[0]);
    var target = document.getElementById("new_searches");


    let table = document.createElement('table');
    //table.setAttribute("id", "results_table_"+searches.toString());
    table.setAttribute("class", "display");
    const head = document.createElement('thead');
    const body = document.createElement('tbody');

    const hide_button = document.createElement('button');
    hide_button.setAttribute("class", "button");
    hide_button.setAttribute("onclick", "hideRow()");
    hide_button.appendChild(document.createTextNode("Hide"));
    head.appendChild(document.createElement('th').appendChild(hide_button));

    var count = 0;
    for (var key in data[0]) {
        let col = document.createElement('th');
        col.setAttribute("class", "col_"+count.toString());
        col.appendChild(document.createTextNode(key));
        head.appendChild(col);
        count++;
    }
    table.appendChild(head);

    for (var i = 0; i < data.length; i++) {

        var row = document.createElement('tr');
        row.setAttribute("id", "row_"+i);

        const checkbox = document.createElement('input');
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", "row_checkboxes");
        checkbox.setAttribute("id", "row_"+i.toString());
        row.appendChild(document.createElement('td').appendChild(checkbox));

        let col_count = 0;
        for (var column in columns) {
            var cell = document.createElement('td');
            cell.setAttribute("class", "col_"+col_count.toString());
            const value = data[i][columns[column]];
            cell.appendChild(document.createTextNode(value));
            row.appendChild(cell);
            col_count++;
        }
        body.appendChild(row);
    }

    table.appendChild(body);
    target.appendChild(table);
    searches++;
}

// this input is hardcoded and that's why it looks like the way it does
// old version
// function incrementSearch(data) {
//     const columns = Object.keys(data[0]);
//     var target = document.getElementById("new_searches");

//     let table = document.createElement('table');
//     //table.setAttribute("id", "results_table_"+searches.toString());
//     table.setAttribute("class", "display");
//     const head = document.createElement('thead');
//     const body = document.createElement('tbody');

//     const hide_button = document.createElement('button');
//     hide_button.setAttribute("class", "button");
//     hide_button.setAttribute("onclick", "hideRow()");
//     hide_button.appendChild(document.createTextNode("Hide"));
//     head.appendChild(document.createElement('th').appendChild(hide_button));

//     var count = 0;
//     for (var key in data[0]) {
//         let col = document.createElement('th');
//         col.setAttribute("class", "col_"+count.toString());
//         col.appendChild(document.createTextNode(key));
//         head.appendChild(col);
//         count++;
//     }
//     table.appendChild(head);

//     for (var i = 0; i < data.length; i++) {

//         var row = document.createElement('tr');
//         row.setAttribute("id", "row_"+i);

//         const checkbox = document.createElement('input');
//         checkbox.setAttribute("type", "checkbox");
//         checkbox.setAttribute("name", "row_checkboxes");
//         checkbox.setAttribute("id", "row_"+i.toString());
//         row.appendChild(document.createElement('td').appendChild(checkbox));

//         let col_count = 0;
//         for (var column in columns) {
//             var cell = document.createElement('td');
//             cell.setAttribute("class", "col_"+col_count.toString());
//             const value = data[i][columns[column]];
//             cell.appendChild(document.createTextNode(value));
//             row.appendChild(cell);
//             col_count++;
//         }
//         body.appendChild(row);
//     }

//     table.appendChild(body);
//     target.appendChild(table);
//     searches++;
// }


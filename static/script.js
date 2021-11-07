$("#searchbar").keyup(function(){
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
});

function hideRow(id) {
    var row = document.getElementById(id);
    row.style.display = 'none';
}

function hide() {
    var checkboxes = document.getElementsByName('checkboxes');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked)
            hideRow(checkboxes[i].id)
    }
}

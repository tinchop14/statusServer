
function format ( d ) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Full name:</td>'+
            '<td>algo</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extension number:</td>'+
            '<td>añgp</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extra info:</td>'+
            '<td>And any further details here (images etc)...</td>'+
        '</tr>'+
    '</table>';
}
// Call the dataTables jQuery plugin
$(document).ready(function() {
  var table = $('#dataTable').DataTable({
    "ajax": "js/demo/rows.json",
       "columns": [
           {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
           },
           { "data": "vm" },
           { "data": "server" },
           { "data": "cpus" },
           { "data": "ram" },
           { "data": "discos" },
           { "data": "ventanas" },
           { "data": "observaciones" }
         ],
          "order": [[1, 'asc']]
   } );

// Add event listener for opening and closing details
$('#dataTable tbody').on('click', 'td.details-control', function () {
    var tr = $(this).closest('tr');
    var row = table.row( tr );

    if ( row.child.isShown() ) {
        // This row is already open - close it
        row.child.hide();
        tr.removeClass('shown');
    }
    else {
        // Open this row
        row.child( format(row.data()) ).show();
        tr.addClass('shown');
    }
} );
} );

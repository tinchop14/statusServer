// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable({
    "ajax": "js/demo/rows.json",
       "columns": [
           { "data": "vm" },
           { "data": "server" },
           { "data": "cpus" },
           { "data": "ram" },
           { "data": "discos" },
           { "data": "ventanas" },
           { "data": "observaciones" }
       ]
   } );
});

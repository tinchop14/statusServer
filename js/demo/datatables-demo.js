
function format ( d ) {
    // `d` is the original data object for the row
    var i;
    var aux;
    var sum="";
    for (i = Number(d.ndiscos); i >= 1; i--) {
     aux=  '<div class="col-xs-12 col-6">'+
      '<table class=" table-bordered" responsive=true id=detailTable cellpadding="0" cellspacing="0" border="0" style="padding-left:0px;border-radius: 10px;width: 100%; margin-bottom:12px;">'+
      '<tr style="background-color:whitesmoke;">'+
          '<td>Disco:</td>'+
          '<td>'+d['disco'+i]+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Tipo:</td>'+
          '<td>'+d['tipo'+i]+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Backup:</td>'+
          '<td>'+d['backup'+i]+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Ventana:</td>'+
          '<td>'+d['ventana'+i]+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Observaciones:</td>'+
          '<td>'+d['observaciones'+i]+'</td>'+
      '</tr>'+'<tr>'+'</tr>'+
      '</table> </div>';
      sum=aux+sum;
    }

    var tabla = '<div class="row">'+
    sum+
    '</div>';


    return tabla;
}
// Call the dataTables jQuery plugin
$(document).ready(function() {
  var table = $('#dataTable').DataTable({
    "ajax": "js/demo/rows.json",
    responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.modal( {
                    header: function ( row ) {
                        var data = row.data();
                        return 'Detalles';
                    }
                } ),
                renderer: $.fn.dataTable.Responsive.renderer.listHidden()
            }
    },
    "language": {
          "lengthMenu": "Mostrar _MENU_ VMs por página",
          "zeroRecords": "No se encontró la búsqueda",
          "info": "Mostrando _PAGE_ de _PAGES_ páginas",
          "infoEmpty": "No records available",
          "infoFiltered": "(filtrado de _MAX_ registros)",
          "search": "Buscar:",
          "paginate": {
              "previous": "Anterior",
              "next":"Siguiente"
            }
       },
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
           { "data": "ndiscos" },
           {
                "className":      'discos-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": 'Ver discos'
           },
           { "data": "observaciones" }
         ],
          "order": [[1, 'asc']]
   } );

// Add event listener for opening and closing details
// $('#dataTable tbody').on('click', 'td.details-control', function () {
//     var tr = $(this).closest('tr');
//     var row = table.row( tr );
//
//
//     if ( row.child.isShown() ) {
//         // This row is already open - close it
//         row.child.hide();
//         tr.removeClass('shown');
//     }
//     else {
//         // Open this row
//         row.child( format(row.data()) ).show();
//         tr.addClass('shown');
//     }
// } );

$('#dataTable tbody').on('click', 'td.discos-control', function () {
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
});

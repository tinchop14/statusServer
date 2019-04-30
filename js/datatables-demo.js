
function format ( d ) {
    // `d` is the original data object for the row
    var i;
    var aux;
    var sum="";
    for (i = 1; i <= Number(d.ndiscos); i += 2) {

    if (i==Number(d.ndiscos)){
      aux=  '<div class="row">'+
       '<div class="col-sm-6" style="margin-bottom:20px;">'+
       '<table class="table-bordered" style="width:100%">'+
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
           '<td style=" white-space: normal;">'+d['observaciones'+i]+'</td>'+
       '</tr>'+'<tr>'+'</tr>'+
       '</table> </div></div>';
    }
    else{
     aux=  '<div class="row">'+
      '<div class="col-sm-6" style="margin-bottom:20px;">'+
      '<table class="table-bordered" responsive=true style="width:100%;">'+
      '<tr style="background-color:whitesmoke;">'+
          '<td >Disco:</td>'+
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
          '<td style=" white-space: normal;">'+d['observaciones'+i]+'</td>'+
      '</tr>'+'<tr>'+'</tr>'+
      '</table> </div>'+
      '<div class="col-sm-6" style="margin-bottom:20px;">'+
      '<table class=" table-bordered responsive=true" style="width:100%;">'+
      '<tr style="background-color:whitesmoke;">'+
          '<td>Disco:</td>'+
          '<td>'+d['disco'+(i+1)]+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Tipo:</td>'+
          '<td>'+d['tipo'+(i+1)]+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Backup:</td>'+
          '<td>'+d['backup'+(i+1)]+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Ventana:</td>'+
          '<td>'+d['ventana'+(i+1)]+'</td>'+
      '</tr>'+
      '<tr>'+
          '<td>Observaciones:</td>'+
          '<td style=" white-space: normal;">'+d['observaciones'+(i+1)]+'</td>'+
      '</tr>'+'<tr>'+'</tr>'+
      '</table> </div> </div>';
    }
      sum=sum+aux;
    }

    var tabla = '<div class="slider container">'+
    sum+
    '</div>';


    return tabla;
}
// Call the dataTables jQuery plugin
$(document).ready(function() {
  var table = $('#dataTable').DataTable({
    "ajax": "js/rows.json",
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
                "defaultContent": 'Ver discos  '+ '<i class="fa fa-search-plus" aria-hidden="true"></i>'
           },
           { "data": "observaciones",
           render : function(data, type, row) {
             return '<span class="tooltiptext d-none d-lg-block">'+data+'</span>'+data
           },
             "className": "obs-style"
           }
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
      row.child( format(row.data())).show();
      tr.addClass('shown');
  }
} );
});

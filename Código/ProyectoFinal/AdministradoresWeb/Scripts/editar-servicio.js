function cargarCategoriasAnteriores(pregId) {
    var s = "#ChkPreg_" + pregId;
    $(s).prop("checked", true);
    var anterior = $('#CadenaPreguntas').val();
    $('#CadenaPreguntas').val(anterior + pregId + ";" + "true ");
}

$(document).on("click", ".preguntas", function (event) {
    var anterior = $('#CadenaPreguntas').val();
    $('#CadenaPreguntas').val(anterior + event.target.value + ";" + event.target.checked + " ");
    console.log($('#CadenaPreguntas').val());
});
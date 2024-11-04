
$(document).ready(function () {
    $("#formulario-pago").submit(function (event) {
        event.preventDefault();
        SendFormGoogleAppsScript();
    });
});

function SendFormGoogleAppsScript() {
    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwBvp1SUh7xyHGj7YvaIuKM2ekYqm_M0RBzbdriVnpZYXKOmRAnWhyAwoz_w3NC25X1/exec",
        type: "post",
        data: $("#formulario-pago").serialize(),
        success: function () {
            Swal.fire("¡Éxito!", "Mensaje enviado", "success");
        },
        error: function () {
            Swal.fire("¡Error!", "Error en el Registro :(", "error");
        },
    });
}

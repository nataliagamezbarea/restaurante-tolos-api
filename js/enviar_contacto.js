
    $(document).ready(function () {
      $("#reservaForm").submit(function (event) {
        event.preventDefault();
        SendFormGoogleAppsScript();
      });
    });

    function SendFormGoogleAppsScript() {
      $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwWTAzZxQt3sf4dDGJ9NG7KVzkQ85TIsow5XP1tfBQu-F1_fVlIaW5FfNACuRCvIeiP/exec",
        type: "POST",
        data: $("#reservaForm").serialize(),
        success: function () {
          Swal.fire("¡Éxito!", "Reserva realizada correctamente", "success");
        },
        error: function () {
          Swal.fire("¡Error!", "Error en la reserva", "error");
        },
      });
    }

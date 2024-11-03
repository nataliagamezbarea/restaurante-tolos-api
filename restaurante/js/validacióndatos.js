$(document).ready(function () {
    $('#reservaForm').on('submit', function (e) {
        e.preventDefault(); 

        const formData = $(this).serialize(); 

        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: formData,
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Tu mensaje ha sido enviado.',
                });
                $('#reservaForm')[0].reset(); 
            },
            error: function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al enviar tu mensaje.',
                });
            }
        });
    });
});


        $(function() {
            var hash = window.location.hash;
            hash && $('ul.nav a[href="' + hash + '"]').tab('show');

            $('.nav-tabs a').click(function(e) {
                $(this).tab('show');
                var scrollmem = $('body').scrollTop() || $('html').scrollTop();
                window.location.hash = this.hash;
                $('html,body').scrollTop(scrollmem);
            });

            $('#accordion .collapse').collapse('show');


            // Variable to hold request
            var request;

            // Bind to the submit event of our form
            $("#questionform").submit(function(event) {

                // Prevent default posting of form - put here to work in case of errors
                event.preventDefault();

                var number = iti2.getNumber();
                console.log(number);


                var form = $('#questionform')[0];
                var formData = new FormData(form);
                formData.append("telephone", number);

                // Abort any pending request
                if (request) {
                    request.abort();
                }
                // setup some local variables
                var $form = $(this);

                // Let's select and cache all the fields
                var $inputs = $form.find("input, select, button, textarea");
                var temp_email = $form.find($('input[type=email]')).val();

                // Serialize the data in the form
                var serializedData = $form.serialize();

                // Let's disable the inputs for the duration of the Ajax request.
                // Note: we disable elements AFTER the form data has been serialized.
                // Disabled form elements will not be serialized.
                $inputs.prop("disabled", true);

                // Fire off the request to /form.php
                request = $.ajax({
                    url: "https://abounaja.com/post-enquiry-form-v2",
                    type: "POST",
                    dataType: 'JSON',
                    data: formData,
                    processData: false,
                    contentType: false
                });
                // Callback handler that will be called on success
                request.done(function(response, textStatus, jqXHR) {
                    // Log a message to the console
                    console.log("success");
                    console.log(textStatus);
                    console.log(jqXHR);
                    $inputs.prop("disabled", false);

                    if (textStatus == 'success') {
                        $('.questionBlock').html(
                            '<div class="alert alert-success" style="padding: 15px;margin-bottom: 15px;"><button type="button" class="close" style="font-weight: bold;color: #000;line-height: 0.5;" data-dismiss="alert">&times;</button>Thank you, we will respond to you soon.</div>');
                    }

                    $('#questionform').trigger("reset");
                    $('#questionform').find($('input[type=email]')).val(temp_email);
                    return false;

                });

                // Callback handler that will be called on failure
                request.fail(function(jqXHR, textStatus, errorThrown) {
                    // Log the error to the console
                    console.error(
                        "The following error occurred: " +
                        textStatus, errorThrown
                    );
                });

                // Callback handler that will be called regardless
                // if the request failed or succeeded
                request.always(function() {
                    // Reenable the inputs
                    $inputs.prop("disabled", false);
                });

            });
        

            // Bind to the submit event of our form
            $("#enquiryform").submit(function(event) {

                $('#enquiry-top').attr('disabled', true);


                // Prevent default posting of form - put here to work in case of errors
                event.preventDefault();

                var number = iti.getNumber();
                console.log(number);


                var form = $('#enquiryform')[0];
                var formData = new FormData(form);
                formData.append("telephone", number);

                // Abort any pending request
                if (request) {
                    request.abort();
                }
                // setup some local variables
                var $form = $(this);

                // Let's select and cache all the fields
                var $inputs = $form.find("input, select, button, textarea");
                var temp_email = $form.find($('input[type=email]')).val();

                // Serialize the data in the form
                var serializedData = $form.serialize();

                // Let's disable the inputs for the duration of the Ajax request.
                // Note: we disable elements AFTER the form data has been serialized.
                // Disabled form elements will not be serialized.
                $inputs.attr("disabled", true);

                // Fire off the request to /form.php
                request = $.ajax({
                    url: "https://abounaja.com/post-enquiry-form-v2",
                    type: "POST",
                    dataType: 'JSON',
                    data: formData,
                    processData: false,
                    contentType: false
                });
                // Callback handler that will be called on success
                request.done(function(response, textStatus, jqXHR) {
                    // Log a message to the console
                    console.log("success");
                    console.log(textStatus);
                    console.log(jqXHR);
                    $inputs.prop("disabled", false);

                    if (textStatus == 'success') {

                        $('#enquiry').attr('disabled', false);
                        $('.enquiryBlock').html(
                            '<div class="alert alert-success" style="padding: 15px;margin-bottom: 15px;"><button type="button" class="close" style="font-weight: bold;color: #000;line-height: 0.5;" data-dismiss="alert">&times;</button>Your enquiry is sent, we will respond to you soon.</div>');
                    }

                    $('#enquiryform').trigger("reset");
                    $('#enquiryform').find($('input[type=email]')).val(temp_email);
                    return false;

                });

                // Callback handler that will be called on failure
                request.fail(function(jqXHR, textStatus, errorThrown) {
                    // Log the error to the console
                    console.error(
                        "The following error occurred: " +
                        textStatus, errorThrown
                    );
                });

                // Callback handler that will be called regardless
                // if the request failed or succeeded
                request.always(function() {
                    // Reenable the inputs
                    $inputs.attr("disabled", false);
                });

            });
        });

          
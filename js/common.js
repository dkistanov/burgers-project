
//--------------modal window----------
$(function(){
    $('.button_view').on('click',function(event){
        event.preventDefault();
        $('#popup-review').addClass('popup_animation');
        isScroll =  true;
    });

    $(document).on('click',function(event){
        if($(event.target).hasClass('popup-review')||$(event.target).closest('.popup-review__close').length){
            event.preventDefault();
            $('#popup-review').removeClass('popup_animation');
            isScroll =  false;

        }
        
        if($(event.target).hasClass('popup-status')||$(event.target).closest('.popup-status__close').length){
            event.preventDefault();
            $('#success, #error').removeClass('popup_animation');
            $('#order-form').get(0).reset();
            isScroll =  false;
        }
    });
    
});

//--------------inputMask-----------
$(function() {
    $('#phone-mask').inputmask('+7 (999) 999 99 99');
});

//-----------validation-------------------
var submitForm = (function(){
    var URL = null;
    function init(selector, url){
        URL = url;
        _addListeners(selector);
    }

   function _addListeners(selector){
        document.querySelector(selector).addEventListener('submit', _hendlerSubmit);
    }

   function _hendlerSubmit(event){
       event.preventDefault();
       _ajaxForm(URL, this);
   }

   function _ajaxForm(url, form){
       if(!validate.validation(form)) return;

       var doc = document;
       var name = doc.querySelector('input[name="name"]').value;
       var phone = doc.querySelector('input[name="phone"]').value;
       var data = `name=${name}&phone=${phone}`;
       var xhr = new XMLHttpRequest();

       xhr.open('POST', url);
       xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
       xhr.send(data);
       
       xhr.onreadystatechange = function(){
          if(xhr.readyState === 4){
              var response = JSON.parse(xhr.responseText);
              
              if(response.status === 'OK'){
                  document.querySelector('#success').classList.add('popup_animation');
              } else {
                document.querySelector('#error').classList.add('popup_animation');
              }
          }
       }
   }

    return {
        submit: init,
    }
})();

var validate = (function(){

    function _addListeners(form){
        var formInputs = form.querySelectorAll('.order-form__input_error');

        formInputs.forEach(function(input){
            input.addEventListener('focus', _removeError);
        });

        form.addEventListener('reset', _resetForm);
    }

    function _resetForm(){
        var errors = this.querySelectorAll('.form__error');

        errors.forEach(function(error){
            error.classList.remove('form__error');
        });
    };
    var error = document.querySelectorAll('.form__error');
    function _removeError(){
        error[1].classList.remove('form__error');
    }

    function _addError(){
        error[1].classList.add('form__error');
    }

    function validForm(form){
        var valid = true;
        var inputs = document.querySelectorAll('[data-valid]');

        inputs.forEach(function(input){
            if(input.value.length < input.dataset.valid){
                _addError(input);
                valid = false;
            }
        });

        if(!valid){
            _addListeners(form);
        }
    
        return valid;
    }


    return {
        validation: validForm
    }
})();


if(document.querySelector('#order-form')){
    submitForm.submit('#order-form', '/mail.php');
}

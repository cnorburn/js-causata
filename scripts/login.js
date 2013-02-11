$(function () {
		
	var txt="Enter text"
		
	$('fieldset #email').val(txt);
		
	$('fieldset input').on('mousedown',function(){
		if($(this).val() ===txt){
			$(this).val('');				
		}
	});
		
	$('fieldset input').on('keyup',function(){
		$('fieldset input').removeClass('err');
		if(($('#email').val().length>0 && $('#password').val().length>0) && !$("fieldset a").hasClass('enabled')){
			$("fieldset a").addClass('enabled');
		}else if(($('#email').val().trim()==='' || $('#password').val().trim()==='')){
			$("fieldset a").removeClass('enabled');
		}
	});
		
				
	// $('fieldset input').on('focusout',function(){
	// 	if($(this).val().length===0){
	// 		$('#email').val(txt);				
	// 		//$("fieldset a").toggleClass('enabled');
	// 	}
	// });
						
	$('fieldset a').on('click',function(e){
		e.preventDefault();
		if($(this).hasClass('enabled')){
			$('fieldset input').addClass('err');
		}
	});
						
});



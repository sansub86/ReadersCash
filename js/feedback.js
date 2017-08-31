/*
Feedback form
*/
////////////////////////////////////////////////////////////////////
//                                                              ////
// !!!!!! обязательно менять sitekey и secret внутри php!!!!!!! ////
//                                                              ////
////////////////////////////////////////////////////////////////////

				function SendDataByAjax(token)
				{
					//alert("Аж до сюда работет");
				// собираем данные с формы
						var user_name 	 = $('#name-id').val();
						//var user_email 	 = $('#user_email').val();
						
						var user_phone 	 = $('#phone-id').val();
						var text_comment = $('#textarea-id').val();
						// отправляем данные
						$.ajax({
							url: "php/action.php", // куда отправляем
							type: "post", // метод передачи
							dataType: "json", // тип передачи данных
							data: { // что отправляем
								"user_name": 	user_name,
								//"user_email": 	user_email,
								"text_comment": text_comment,
								"user_phone": user_phone,
								'g-recaptcha-response': token
							},
							// после получения ответа сервера
							//$('.messages').html(data.result); 
							success: function(data) { 
								//Если все нормально
								$( "input[type='submit']" ).val(data.msg);
									
							},
							error: function(data,textStatus) { //Если ошибка
									$( "input[type='submit']" ).val("Error");
									$( "input[type='submit']").prop('disabled', false);
									
							}
						});
				};
////////////////////////////////////////////////////////////////////////////				
				$.validator.setDefaults({
					submitHandler: function() {
						//$('#feedbackForm').ajaxSubmit(); 
						//alert("Тут работет");
						MySubmitFunc();	
					// return false to prevent normal browser submit and page navigation 
					//return false;					
					}
				});
				/*$('#feedbackForm').submit(function() { 
					// submit the form 
					$(this).ajaxSubmit(); 
					// return false to prevent normal browser submit and page navigation 
					return false; 
				});*/
				$(document).ready(function() {
					// validate signup form on keyup and submit
					$("#feedbackForm").validate({
						rules: {
							name: {
								required: true,
								minlength: 2
							},
							/*user_email: {
								required: true,
								email: true
							},*/
							additionalInfo: {
								required: true,
								minlength: 10
							},
							phone: {
								required: true,
								minlength: 10,
								maxlength:10
							}
						},
						messages: {
						
							name: {
								required: "Please enter your name",
								minlength: "Enter at least 2 characters"
							},
							additionalInfo: {
								required: "Please enter some information",
								minlength: "Enter at least 10 characters"
							},
							//user_email: "Введите корректный email",
							phone: {
								required: "Please enter a phone",
								minlength: "Enter at least 10 characters"
							}
						}
					});

//////////////////////////////////////////////////////////////////////////////////////////////////////							
						// click handler for form's submit button
					
				});
				function MySubmitFunc(){  
					
					 $("input[type='submit']").prop('disabled', true);
					  $( "input[type='submit']" ).val("Подождите...");
					  
					  var token =   window.grecaptcha.getResponse(recaptchaId);
						
					  // if no token, mean user is not validated yet
					  if (!token) {
						 // trigger validation
						 window.grecaptcha.execute(recaptchaId);
						return;
					  }

					  /*var xhrData = {
						
						// more ajax body/data here
					  };*/

					  // proceed with appending more ajax call data to xhrData and then rest of ajax call process
					  
					  SendDataByAjax(token);
						// var xhr = new XMLHttpRequest();
					    // ... ... .... ... ... 
					};
			window.onScriptLoad = function () {
					// this callback will be called by recaptcah/api.js once its loaded. If we used
				   // render=explicit as param in script src, then we can explicitly render reCaptcha at this point

					// element to "render" invisible captcha in
					var htmlEl = document.querySelector('.g-recaptcha');

					// option to captcha
					var captchaOptions = {
					  sitekey: '6LeuMRsUAAAAANLOI4cMsl5gLu4P7HJL1OlGoyLW',
					  size: 'invisible',
					  // tell reCaptcha which callback to notify when user is successfully verified.
					  // if this value is string, then it must be name of function accessible via window['nameOfFunc'], 
					  // and passing string is equivalent to specifying data-callback='nameOfFunc', but it can be
					  // reference to an actual function
					  callback: window.onUserVerified
				  };

					// Only for "invisible" type. if true, will read value from html-element's data-* attribute if its not passed via captchaOptions
					var inheritFromDataAttr = true;

					// now render
					recaptchaId = window.grecaptcha.render(htmlEl, captchaOptions, inheritFromDataAttr);
				};

				// this is assigned from "data-callback" or render()'s "options.callback"
				window.onUserVerified = function (token) {
					
					SendDataByAjax(token);
				};


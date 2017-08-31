<?php
	$msg_box = ""; // в этой переменной будем хранить сообщения формы
	$secret="6LeuMRsUAAAAAIqWrvaQDyB8XVlLa03nehUr5veE";
	$errors = array(); // контейнер для ошибок
	// проверяем корректность полей
	if($_POST['user_name'] == "") 	 $errors[] = "Поле 'Ваше имя' не заполнено!";
	//if($_POST['user_email'] == "") 	 $errors[] = "Поле 'Ваш e-mail' не заполнено!";
	if($_POST['text_comment'] == "") $errors[] = "Поле 'Текст сообщения' не заполнено!";
	if($_POST['user_phone'] == "") $errors[] = "Поле 'Текст сообщения' не заполнено!";
	if($_POST['g-recaptcha-response'] == "") $errors[] = "Не пройдена капча!";
	$response=$_POST['g-recaptcha-response'];
	// если форма без ошибок
	if(empty($errors)){		
	//проверяем рекапчу
	
		$url = 'https://www.google.com/recaptcha/api/siteverify';
		$params = array(
			'secret' => $secret, // в http://localhost/post.php это будет $_POST['param1'] == '123'
			'response' => $response // в http://localhost/post.php это будет $_POST['param2'] == 'abc'
		);
		$result = file_get_contents($url, false, stream_context_create(array(
			'http' => array(
				'method'  => 'POST',
				'header'  => 'Content-type: application/x-www-form-urlencoded',
				'content' => http_build_query($params)
			)
		)));
		$result_obj=json_decode($result);
		if($result_obj->success){
			// собираем данные из формы
			$message  = "Имя пользователя: " . $_POST['user_name'] . "<br/>";
			//$message .= "E-mail пользователя: " . $_POST['user_email'] . "<br/>";
			$message .= "Текст письма: " . $_POST['text_comment'];		
			send_mail($message); // отправим письмо
			// выведем сообщение об успехе
			$msg_box = "Сообщение отправлено";
			
		}else{
			$msg_box = "Не пройдена капча!";
		}
		
	}else{
		// если были ошибки, то выводим их
		$msg_box = "";
		foreach($errors as $one_error){
			$msg_box .= "Ошибка заполнения!";
		}
	}

	
	echo  json_encode(array('msg' => $msg_box));
	
	
	// функция отправки письма
	function send_mail($message){
		// почта, на которую придет письмо
		$mail_to = "kirill_rnd@mail.ru"; 
		// тема письма
		$subject = "Письмо с обратной связи";
		
		// заголовок письма
		$headers= "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
		$headers .= "From: Тестовое письмо <no-reply@readerscash.com>\r\n"; // от кого письмо
		
		// отправляем письмо 
		mail($mail_to, $subject, $message, $headers);
	}
	

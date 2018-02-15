<?php

    $name = $_POST['name'];
    $tel = $_POST['tel'];
    $street = $_POST['street'];
    $house = $_POST['house'];
    $housing = $_POST['housing'];
    $apartment = $_POST['apartment'];
    $floor = $_POST['floor'];
    $comment = $_POST['comment'];
    $radio = $_POST['radio'];
    $radio = isset($radio) ? 'Сдача нужна' : 'Без сдачи';
    $checkbox= $_POST['checkbox'];
    $checkbox = isset($checkbox) ? 'Не перезванивать' : 'Перезвонить';

    

    $mail_message = '
    <html>
    <head>
        <title>Заявка</title>
    </head>
    <body>
        <h2>Заказ</h2>
        <ul>
            <li>Имя:' . $name . '</li>
            <li>Телефон: ' . $tel . '</li>
            <li>Улица: ' . $street . '</li>
            <li>Дом: ' . $house . '</li>
            <li>Подьезд: ' . $housing . '</li>
            <li>Квартира: ' . $apartment . '</li>
            <li>Этаж: ' . $floor . '</li>
            <li>Сообщение: ' . $comment . '</li>
            <li>Нужна ли сдача: ' . $radio . '</li>
            <li>Нужно ли перезванивать клиенту: ' . $checkbox . '</li>
        </ul>
    </body>
    </html>';

    $headers = "From: Администратор сайта <kiba34@mail.ru>\r\n".
                "MIME-Version: 1.0" . "\r\n" .
                "Content-type: text/html; charset=UTF-8" . "\r\n";

    $mail = mail('kiba34@mail.ru', 'Заказ', $mail_message, $headers);

    $data = [];

    if ($mail) {
        $data['status'] = "OK";
        $data['mes'] = "Письмо успешно отправлено";
    }else{
        $data['status'] = "NO";
        $data['mes'] = "На сервере произошла ошибка";
    }
    echo ($data);
    echo ($mail_message);
    echo ($headers);
    echo json_encode($data);

?>
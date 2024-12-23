INSERT INTO device_types (device_type) VALUES ('sensor');
INSERT INTO device_types (device_type) VALUES ('bridge');
INSERT INTO device_types (device_type) VALUES ('gateway');
INSERT INTO device_payload_fields (id, key_name, table_key_name, device_type) VALUES (1, 'serial_number', 'device_id', (SELECT id FROM device_types WHERE device_type = 'bridge'));
INSERT INTO device_payload_fields (id, key_name, table_key_name, device_type) VALUES (2, 'logged_at', 'timestamp', (SELECT id FROM device_types WHERE device_type = 'bridge'));
INSERT INTO device_payload_fields (id, key_name, table_key_name, device_type) VALUES (3, 'region', 'region', (SELECT id FROM device_types WHERE device_type = 'bridge'));
INSERT INTO device_payload_fields (id, key_name, table_key_name, device_type) VALUES (4, 'company_id', 'company_id', (SELECT id FROM device_types WHERE device_type = 'bridge'));
INSERT INTO device_payload_fields (id, key_name, table_key_name, device_type) VALUES (5, 'gateway_eui', 'device_id', (SELECT id FROM device_types WHERE device_type = 'gateway'));
INSERT INTO device_payload_fields (id, key_name, table_key_name, device_type) VALUES (6, 'logged_at', 'timestamp', (SELECT id FROM device_types WHERE device_type = 'gateway'));
INSERT INTO device_payload_fields (id, key_name, table_key_name, device_type) VALUES (7, 'sensor', 'device_id', (SELECT id FROM device_types WHERE device_type = 'sensor'));
INSERT INTO device_payload_fields (id, key_name, table_key_name, device_type) VALUES (8, 'reading_time', 'timestamp', (SELECT id FROM device_types WHERE device_type = 'sensor'));
INSERT INTO device_payload_fields (id, key_name, table_key_name, device_type) VALUES (9, 'company_id', 'company_id', (SELECT id FROM device_types WHERE device_type = 'sensor'));

INSERT INTO users (id, email, role) VALUES (1, 'test@test.pl', 'SUPER_ADMIN');

INSERT INTO email_data (context, mail_body) VALUES ('ALERT', '<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings></xml><![endif]--> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta name="x-apple-disable-message-reformatting"> <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--> <title></title> <style type="text/css"> @media only screen and (min-width: 520px) { .u-row { width: 500px !important; } .u-row .u-col { vertical-align: top; } .u-row .u-col-100 { width: 500px !important; } } @media only screen and (max-width: 520px) { .u-row-container { max-width: 100% !important; padding-left: 0px !important; padding-right: 0px !important; } .u-row { width: 100% !important; } .u-row .u-col { display: block !important; width: 100% !important; min-width: 320px !important; max-width: 100% !important; } .u-row .u-col > div { margin: 0 auto; } .u-row .u-col img { max-width: 100% !important; }} body{margin:0;padding:0}table,td,tr{border-collapse:collapse;vertical-align:top}p{margin:0}.ie-container table,.mso-container table{table-layout:fixed}*{line-height:inherit}a[x-apple-data-detectors=true]{color:inherit!important;text-decoration:none!important}table, td { color: #000000; } </style> </head><body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: transparent;color: #000000"> <!--[if IE]><div class="ie-container"><![endif]--> <!--[if mso]><div class="mso-container"><![endif]--> <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: transparent;width:100%" cellpadding="0" cellspacing="0"> <tbody> <tr style="vertical-align: top"> <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: transparent;"><![endif]--> <div class="u-row-container" style="padding: 0px;background-color: transparent"> <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;"> <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]--><div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;"> <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"> <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]--> <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left"> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td style="padding-right: 0px;padding-left: 0px;" align="center"> <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1732656252598-errwarn-logo%20(2).png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 300px;" width="300"/> </td> </tr></table> </td> </tr> </tbody></table><table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left"> <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%"> <tbody> <tr style="vertical-align: top"> <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%"> <span>&#160;</span> </td> </tr> </tbody> </table> </td> </tr> </tbody></table><table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left"> <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;"> <p style="line-height: 140%;">Hello!</p><p style="line-height: 140%;"> </p><p style="line-height: 140%;">This is sample alert mail.</p><p style="line-height: 140%;">Devices with recent issues:</p><p style="line-height: 140%;"> </p>/BEGIN/DEVICE_ID[]/END/<p style="line-height: 140%;"> </p><p style="line-height: 140%;">The devices listed above have been identified as malfunctioning. Please check the Internet connection and verify if the problem persists.</p> </div> </td> </tr> </tbody></table> <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--> </div></div><!--[if (mso)|(IE)]></td><![endif]--> <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]--> </div> </div> </div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> </td> </tr> </tbody> </table> <!--[if mso]></div><![endif]--> <!--[if IE]></div><![endif]--></body></html>');
INSERT INTO email_data (context, mail_body) VALUES ('ACCESS_RIGHTS_CHANGE', '<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings></xml><![endif]--> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta name="x-apple-disable-message-reformatting"> <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--> <title></title> <style type="text/css"> @media only screen and (min-width: 520px) { .u-row { width: 500px !important; } .u-row .u-col { vertical-align: top; } .u-row .u-col-100 { width: 500px !important; } } @media only screen and (max-width: 520px) { .u-row-container { max-width: 100% !important; padding-left: 0px !important; padding-right: 0px !important; } .u-row { width: 100% !important; } .u-row .u-col { display: block !important; width: 100% !important; min-width: 320px !important; max-width: 100% !important; } .u-row .u-col > div { margin: 0 auto; } .u-row .u-col img { max-width: 100% !important; }} body{margin:0;padding:0}table,td,tr{border-collapse:collapse;vertical-align:top}p{margin:0}.ie-container table,.mso-container table{table-layout:fixed}*{line-height:inherit}a[x-apple-data-detectors=true]{color:inherit!important;text-decoration:none!important}table, td { color: #000000; } </style> </head><body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: transparent;color: #000000"> <!--[if IE]><div class="ie-container"><![endif]--> <!--[if mso]><div class="mso-container"><![endif]--> <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: transparent;width:100%" cellpadding="0" cellspacing="0"> <tbody> <tr style="vertical-align: top"> <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: transparent;"><![endif]--> <div class="u-row-container" style="padding: 0px;background-color: transparent"> <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;"> <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]--><div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;"> <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"> <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]--> <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left"> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td style="padding-right: 0px;padding-left: 0px;" align="center"> <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1732656252598-errwarn-logo%20(2).png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 300px;" width="300"/> </td> </tr></table> </td> </tr> </tbody></table><table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left"> <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%"> <tbody> <tr style="vertical-align: top"> <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%"> <span>&#160;</span> </td> </tr> </tbody> </table> </td> </tr> </tbody></table><table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left"> <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;"> <p style="line-height: 140%;">Hello /BEGIN/NAME/END/ /BEGIN/SURNAME/END/!</p><p style="line-height: 140%;"> </p><p style="line-height: 140%;">This is sample access rights change mail.</p><p style="line-height: 140%;">Access rights will be changed for account with id /BEGIN/USER_ID/END/.</p> </p><p style="line-height: 140%;">If you didn''t perform any access rights change action, please contact our support team.</p> </div> </td> </tr> </tbody></table> <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--> </div></div><!--[if (mso)|(IE)]></td><![endif]--> <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]--> </div> </div> </div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> </td> </tr> </tbody> </table> <!--[if mso]></div><![endif]--> <!--[if IE]></div><![endif]--></body></html>');
INSERT INTO email_data (context, mail_body) VALUES ('DELETE_ACCOUNT', '<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings></xml><![endif]--> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta name="x-apple-disable-message-reformatting"> <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--> <title></title> <style type="text/css"> @media only screen and (min-width: 520px) { .u-row { width: 500px !important; } .u-row .u-col { vertical-align: top; } .u-row .u-col-100 { width: 500px !important; } } @media only screen and (max-width: 520px) { .u-row-container { max-width: 100% !important; padding-left: 0px !important; padding-right: 0px !important; } .u-row { width: 100% !important; } .u-row .u-col { display: block !important; width: 100% !important; min-width: 320px !important; max-width: 100% !important; } .u-row .u-col > div { margin: 0 auto; } .u-row .u-col img { max-width: 100% !important; }} body{margin:0;padding:0}table,td,tr{border-collapse:collapse;vertical-align:top}p{margin:0}.ie-container table,.mso-container table{table-layout:fixed}*{line-height:inherit}a[x-apple-data-detectors=true]{color:inherit!important;text-decoration:none!important}table, td { color: #000000; } </style> </head><body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: transparent;color: #000000"> <!--[if IE]><div class="ie-container"><![endif]--> <!--[if mso]><div class="mso-container"><![endif]--> <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: transparent;width:100%" cellpadding="0" cellspacing="0"> <tbody> <tr style="vertical-align: top"> <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: transparent;"><![endif]--> <div class="u-row-container" style="padding: 0px;background-color: transparent"> <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;"> <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]--><div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;"> <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"> <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]--> <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left"> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td style="padding-right: 0px;padding-left: 0px;" align="center"> <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1732656252598-errwarn-logo%20(2).png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 300px;" width="300"/> </td> </tr></table> </td> </tr> </tbody></table><table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left"> <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%"> <tbody> <tr style="vertical-align: top"> <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%"> <span>&#160;</span> </td> </tr> </tbody> </table> </td> </tr> </tbody></table><table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left"> <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;"> <p style="line-height: 140%;">Hello /BEGIN/NAME/END/ /BEGIN/SURNAME/END/!</p><p style="line-height: 140%;"> </p><p style="line-height: 140%;">This is sample delete account mail.</p><p style="line-height: 140%;">Account will be deleted for account id /BEGIN/USER_ID/END/.</p> </p><p style="line-height: 140%;">Thank you for your time with us. If you have any questions, please feel free to reach out to our support team.</p> </div> </td> </tr> </tbody></table> <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--> </div></div><!--[if (mso)|(IE)]></td><![endif]--> <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]--> </div> </div> </div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> </td> </tr> </tbody> </table> <!--[if mso]></div><![endif]--> <!--[if IE]></div><![endif]--></body></html>');
INSERT INTO email_data (context, mail_body) VALUES ('TEST', '<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><!--[if gte mso 9]><xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings></xml><![endif]--> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <meta name="x-apple-disable-message-reformatting"> <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--> <title></title> <style type="text/css"> @media only screen and (min-width: 520px) { .u-row { width: 500px !important; } .u-row .u-col { vertical-align: top; } .u-row .u-col-100 { width: 500px !important; } } @media only screen and (max-width: 520px) { .u-row-container { max-width: 100% !important; padding-left: 0px !important; padding-right: 0px !important; } .u-row { width: 100% !important; } .u-row .u-col { display: block !important; width: 100% !important; min-width: 320px !important; max-width: 100% !important; } .u-row .u-col > div { margin: 0 auto; } .u-row .u-col img { max-width: 100% !important; }} body{margin:0;padding:0}table,td,tr{border-collapse:collapse;vertical-align:top}p{margin:0}.ie-container table,.mso-container table{table-layout:fixed}*{line-height:inherit}a[x-apple-data-detectors=true]{color:inherit!important;text-decoration:none!important}table, td { color: #000000; } </style> </head><body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: transparent;color: #000000"> <!--[if IE]><div class="ie-container"><![endif]--> <!--[if mso]><div class="mso-container"><![endif]--> <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: transparent;width:100%" cellpadding="0" cellspacing="0"> <tbody> <tr style="vertical-align: top"> <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: transparent;"><![endif]--> <div class="u-row-container" style="padding: 0px;background-color: transparent"> <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;"> <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;"> <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]--> <!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]--><div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;"> <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"> <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]--> <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left"> <table width="100%" cellpadding="0" cellspacing="0" border="0"> <tr> <td style="padding-right: 0px;padding-left: 0px;" align="center"> <img align="center" border="0" src="https://assets.unlayer.com/projects/0/1732656252598-errwarn-logo%20(2).png" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 300px;" width="300"/> </td> </tr></table> </td> </tr> </tbody></table><table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left"> <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%"> <tbody> <tr style="vertical-align: top"> <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%"> <span>&#160;</span> </td> </tr> </tbody> </table> </td> </tr> </tbody></table><table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"> <tbody> <tr> <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left"> <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;"> <p style="line-height: 140%;">Hello /BEGIN/NAME/END/ /BEGIN/SURNAME/END/!</p><p style="line-height: 140%;"> </p><p style="line-height: 140%;">This is sample test mail.</p><p style="line-height: 140%;">Your account id is /BEGIN/USER_ID/END/.</p><p style="line-height: 140%;"> </p>/BEGIN/DEVICE_ID[]/END/<p style="line-height: 140%;"> </p><p style="line-height: 140%;">The devices listed above are connected to your account.</p> </div> </td> </tr> </tbody></table> <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]--> </div></div><!--[if (mso)|(IE)]></td><![endif]--> <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]--> </div> </div> </div> <!--[if (mso)|(IE)]></td></tr></table><![endif]--> </td> </tr> </tbody> </table> <!--[if mso]></div><![endif]--> <!--[if IE]></div><![endif]--></body></html>');

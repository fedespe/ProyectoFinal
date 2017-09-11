using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ET
{    
    public static class Utilidades
    {
        //public static string conn = "Data Source = .; Initial Catalog=SPODS;Integrated Security=True;";
        public static string conn = ConfigurationManager.ConnectionStrings["conn"].ToString();
        public static string calcularMD5Hash(string input)
        {
            MD5 md5 = MD5.Create();
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] str = null;
            StringBuilder sb = new StringBuilder();
            str = md5.ComputeHash(encoding.GetBytes(input));
            for (int i = 0; i < str.Length; i++) sb.AppendFormat("{0:x2}", str[i]);

            string passwordMD5 = sb.ToString();

            return passwordMD5;
        }

        public static bool ComprobarFormatoEmail(string correo)
        {
            String sFormato;
            sFormato = "\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*";
            if (Regex.IsMatch(correo, sFormato))
            {
                if (Regex.Replace(correo, sFormato, String.Empty).Length == 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public static string generarPassword(int largo)
        {
            const string caracteresValidos = "abcdefghijklmnopqrstuvwxyz" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "0123456789";
            StringBuilder nuevoPassword = new StringBuilder();
            Random rnd = new Random();
            while (0 < largo--)
            {
                nuevoPassword.Append(caracteresValidos[rnd.Next(caracteresValidos.Length)]);
            }
            return nuevoPassword.ToString();
        }

        public static void enviarCorreo(List<string> para, string cabezal, string asunto, string cuerpo)
        {
            System.Net.Mail.MailMessage mail = new System.Net.Mail.MailMessage();

            foreach (string unDestinatario in para)
            {
                mail.To.Add(unDestinatario);
            }
            //De quién se manda y cabezal
            mail.From = new MailAddress("bdiaz@bigcheese.com.uy", cabezal, System.Text.Encoding.UTF8);
            //Asunto
            mail.Subject = asunto;
            mail.SubjectEncoding = System.Text.Encoding.UTF8;
            //Cuerpo del correo
            mail.Body = cuerpo;
            mail.BodyEncoding = System.Text.Encoding.UTF8;
            mail.IsBodyHtml = true;
            mail.Priority = MailPriority.High;
            SmtpClient client = new SmtpClient();
            //Configuración Gmail
            client.Credentials = new System.Net.NetworkCredential("bdiaz@bigcheese.com.uy", "Bruno45941722d");
            client.Port = 587;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true;

            //Configuración Correo GoDaddy
            //client.Credentials = new System.Net.NetworkCredential("bruno@isamarina.com", "bd4594172");
            //client.Port = 465;
            //client.Host = "relay-hosting.secureserver.net";
            //client.EnableSsl = false;


            //Ejemplo del PHP
            /*$mail = new PHPMailer();
            $mail->IsSMTP();  //telling the class to use SMTP
            $mail->isHTML(true);
            $mail->Host = "smtpout.secureserver.net"; //also tried "relay-hosting.secureserver.net"
            //$mail->Host = "smtp.gmail.com";
            $mail->WordWrap = 50;
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = "ssl";
            $mail->Port = 465; //25, 80, 3535, 465 (Gmail)
            $mail->Username = "bruno@isamarina.com";
            $mail->Password = "bd4594172";
            $mail->Subject = "Test Email";
            $mail->SMTPDebug = 1;


            $mail->Body = 'This is the HTML message body <b>in bold!</b>';
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $mail->addAddress('brunoediaz@hotmail.com', 'Bruno Díaz');
            $mail->addBCC('bdiaz@bigcheese.com.uy');
            */



            try
            {
                client.Send(mail);
            }
            catch (Exception ex)
            {
                Exception ex2 = ex;
                string errorMessage = string.Empty;
                while (ex2 != null)
                {
                    errorMessage += ex2.ToString();
                    ex2 = ex2.InnerException;
                }
            }
        }
    }
}

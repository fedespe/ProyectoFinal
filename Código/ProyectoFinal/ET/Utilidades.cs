using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ET
{
    public static class Utilidades
    {
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
    }
}

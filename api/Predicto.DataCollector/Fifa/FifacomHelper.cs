using Predicto.DataCollector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Predicto.DataCollector.Fifa
{
    internal static class FifacomHelper
    {
        public static string Capitalize(this string word)
        {
            return word.Substring(0, 1).ToUpper() + word.Substring(1).ToLower();
        }
        public static string FileNameSanitizer(string input)
        {
            var invalidChars = Path.GetInvalidFileNameChars();
            var sanitized = new string(input.Select(c => invalidChars.Contains(c) ? '_' : c).ToArray());
            return sanitized.Replace(" ", "_");
        }
        public static string ReplaceSpecialCharacters(string input)
        {
            return new string(input
                .Select(c => replacements.ContainsKey(c) ? replacements[c] : c)
                .ToArray());
        }
        public static string TeamNormalization(string teamName)
        {
            if (teamName == "Bosnia-Herzegovina" || teamName== "Bosnia and Herzegovina")
            {
                teamName = "Bosnia & Herzegovina";
            }
            else if (teamName == "faroe-islands")
            {
                teamName = "Faroe Islands";
            }
            else if (teamName == "northern-ireland")
            {
                return "Northern Ireland";
            }
            else if (teamName == "republic-of-ireland")
            {
                return "Republic of Ireland";
            }
            else if (teamName == "north-macedonia")
            {
                return "North Macedonia";
            }
            else if (teamName == "san-marino")
            {
                return "San Marino";
            }
            else if (teamName == "turkiye" || teamName == "Türki̇ye")
            {
                return "Türkiye";
            }
            else if (teamName == "Czechia")
            {
                return "Czechy";
            }
            
            return teamName;
        }
        private static Dictionary<char, char> replacements = new Dictionary<char, char>
        {
            // A
            ['À'] = 'A',
            ['Á'] = 'A',
            ['Â'] = 'A',
            ['Ã'] = 'A',
            ['Ä'] = 'A',
            ['Å'] = 'A',
            ['à'] = 'a',
            ['á'] = 'a',
            ['â'] = 'a',
            ['ã'] = 'a',
            ['ä'] = 'a',
            ['å'] = 'a',
            ['ă'] = 'a',
            // AE ligature
            ['Æ'] = 'A',
            ['æ'] = 'a',

            // C
            ['Ç'] = 'C',
            ['ç'] = 'c',
            ['Č'] = 'C',
            ['č'] = 'c',
            ['Ć'] = 'C',
            ['ć'] = 'c',

            // D
            ['Ð'] = 'D',
            ['ð'] = 'd',
            ['Đ'] = 'D',
            ['đ'] = 'd',

            // E
            ['È'] = 'E',
            ['É'] = 'E',
            ['Ê'] = 'E',
            ['Ë'] = 'E',
            ['è'] = 'e',
            ['é'] = 'e',
            ['ê'] = 'e',
            ['ë'] = 'e',

            // G
            ['Ğ'] = 'G',
            ['ğ'] = 'g',

            // I
            ['Ì'] = 'i',
            ['Í'] = 'i',
            ['Î'] = 'i',
            ['Ï'] = 'i',
            ['ì'] = 'i',
            ['í'] = 'i',
            ['î'] = 'i',
            ['ï'] = 'i',

            // N
            ['Ñ'] = 'N',
            ['ñ'] = 'n',

            // O
            ['Ò'] = 'O',
            ['Ó'] = 'O',
            ['Ô'] = 'O',
            ['Õ'] = 'O',
            ['Ö'] = 'O',
            ['Ø'] = 'O',
            ['ò'] = 'o',
            ['ó'] = 'o',
            ['ô'] = 'o',
            ['õ'] = 'o',
            ['ö'] = 'o',
            ['ø'] = 'o',

            // S
            ['Š'] = 'S',
            ['š'] = 's',
            ['Ś'] = 'S',
            ['ś'] = 's',
            ['Ş'] = 'S',
            ['ş'] = 's',
            ['ș'] = 's',

            // U
            ['Ù'] = 'U',
            ['Ú'] = 'U',
            ['Û'] = 'U',
            ['Ü'] = 'U',
            ['ù'] = 'u',
            ['ú'] = 'u',
            ['û'] = 'u',
            ['ü'] = 'u',

            ['ţ'] = 't',
            ['ț'] = 't',
            // Y
            ['Ý'] = 'Y',
            ['ý'] = 'y',
            ['Ÿ'] = 'Y',
            ['ÿ'] = 'y',

            // Z
            ['Ž'] = 'Z',
            ['ž'] = 'z',
            ['Ź'] = 'Z',
            ['ź'] = 'z',
            ['Ż'] = 'Z',
            ['ż'] = 'z'
        };

    }
}

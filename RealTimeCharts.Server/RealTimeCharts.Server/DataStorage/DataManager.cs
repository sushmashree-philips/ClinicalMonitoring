using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using RealTimeCharts.Server.Models;

namespace RealTimeCharts.Server.DataStorage
{
    public class DataManager
    {


        public static int pointer;
        private static readonly List<PatientData> ScanningData = new List<PatientData>();

        static Dictionary<string, string> LogData = new Dictionary<string, string>();
        static int timer = 100;
        static bool pause;
        static bool delayachived=false;
        static bool PonterChnaged = false;
        static DataManager()
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json").Build();

            var path = config.GetValue<string>("appSettings:LogFile");

            pointer = 0;
            pause= false;

            var file = File.ReadAllText(path);

            LogData = JsonConvert.DeserializeObject<Dictionary<string, string>>(file);
            foreach (var item in LogData)
            {
                ScanningData.Add(new PatientData { Procedure = item.Value,Step= item.Key });
            }

        }
        public static List<PatientData> GetData()
        {
            if (!pause) 
            {
                if (pointer <= ScanningData.Count - 1)
                {
                    ScanningData[pointer].RemainingTime = timer.ToString();
                    ScanningData[pointer].Procedure = ScanningData[pointer].Procedure+  "   Timer : " +timer.ToString();
                    pointer++;
                }

            }
            else 
            {
                delayachived = true;
            }

            if (pointer == 8) 
            {
                pointer = 7;
                PonterChnaged=true;

            }
               

            if (delayachived == false &&(ScanningData[pointer].Step == "Step_3" || ScanningData[pointer].Step == "Step_6" ||  ScanningData[pointer].Step == "Step_8"))
            {
                pause = true;
            }

            if (delayachived) 
            {
                pause = false;
                delayachived = false;
            }

            if (PonterChnaged) 
            {
                pointer = 8;
                PonterChnaged = false;
            }

            timer -= 10;

            return ScanningData.Take(pointer).ToList();
        }
    }
}

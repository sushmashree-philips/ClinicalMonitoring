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
        static int timer = 85;
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
                    pointer++;
                }

            }
            else 
            {
                delayachived = true;
            }

            if (pointer == 15) 
            {
                pointer = 14;
                PonterChnaged=true;
            }
          
            if (delayachived == false &&(ScanningData[pointer].Step == "Step_4" || ScanningData[pointer].Step == "Step_10" ||  ScanningData[pointer].Step == "Step_14"))
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
                pointer = 15;
                PonterChnaged = false;
            }

            timer -= 5;

            return ScanningData.Take(pointer).ToList();
        }
    }
}

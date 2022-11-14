using Newtonsoft.Json;
using RealTimeCharts.Server.Models;

namespace RealTimeCharts.Server.DataStorage
{
    public class DataManager
    {


        public static int pointer;
        private static readonly List<PatientData> ScanningData = new List<PatientData>();

        static Dictionary<string, string> LogData = new Dictionary<string, string>();
        static int timer = 60;

        static DataManager()
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json").Build();

            var path = config.GetValue<string>("appSettings:LogFile");

            pointer = 0;

            var file = File.ReadAllText(path);

            LogData = JsonConvert.DeserializeObject<Dictionary<string, string>>(file);
            foreach (var item in LogData)
            {
                ScanningData.Add(new PatientData { Procedure = item.Value });
            }

        }
        public static List<PatientData> GetData()
        {
            if (pointer <= ScanningData.Count - 1)
            {
                timer -= 3;
                ScanningData[pointer].RemainingTime = timer.ToString();
                pointer++;
            }

            return ScanningData.Take(pointer).ToList();
        }
    }
}

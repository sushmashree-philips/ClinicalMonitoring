using Newtonsoft.Json;
using RealTimeCharts.Server.Models;

namespace RealTimeCharts.Server.DataStorage
{
    public class TestCase_2_DataManager
    {
        public static int pointer;
        private static readonly List<PatientData> ScanningData = new List<PatientData>();

        static Dictionary<string, string> LogData = new Dictionary<string, string>();
        static int timer;

        static TestCase_2_DataManager()
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json").Build();

            var path = config.GetValue<string>("appSettings:LogFile");

            pointer = 15;
            timer = 120;

            var file = File.ReadAllText(path);

            LogData = JsonConvert.DeserializeObject<Dictionary<string, string>>(file);
            foreach (var item in LogData)
            {
                ScanningData.Add(new PatientData { Procedure = item.Value });
            }

        }
        public static List<PatientData> GetData()
        {
            Console.WriteLine("**************************************************************************");

            var result = new List<PatientData>(); ;
            if (pointer == 15)
            {
                int counter = 0;
                for (int i = 0; i <= 14; i++)
                {
                    ScanningData[counter].RemainingTime = timer.ToString();
                    timer -= 4;
                    counter++;
                }
                result = ScanningData.Take(pointer).ToList();
                pointer++;

            }
            else
            {
                if (pointer <= ScanningData.Count - 1)
                {

                    ScanningData[pointer - 1].RemainingTime = timer.ToString();
                    result = ScanningData.Take(pointer).ToList();
                    timer -= 4;
                    pointer++;
                }
                else
                {
                    ScanningData.LastOrDefault().RemainingTime = "0";
                    result = ScanningData;
                }
            }


            int count = 1;
            foreach (var item in result)
            {
                Console.WriteLine("Index: " + count);
                Console.WriteLine("Procedure: " + item.Procedure);
                Console.WriteLine("Timer : " + item.RemainingTime);
                count++;
            }

            Console.WriteLine("**************************************************************************");

            return result;
        }
    }
}

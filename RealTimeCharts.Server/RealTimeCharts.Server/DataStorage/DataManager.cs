using RealTimeCharts.Server.Models;

namespace RealTimeCharts.Server.DataStorage
{
    public class DataManager
    {
        public static List<PatientData> GetData()
        {
         
            Random random = new Random();
            return new List<PatientData>()
            {
                new PatientData { Name="Umashankar" , Age= random.Next(40) },
                new PatientData {  Name="Vinodh",Age=random.Next(40)},
                new PatientData {  Name="Sushma",Age=random.Next(40)}
            };
        }
    }
}

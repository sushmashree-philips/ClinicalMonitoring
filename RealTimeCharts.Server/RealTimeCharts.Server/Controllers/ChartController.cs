using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using RealTimeCharts.Server.DataStorage;
using RealTimeCharts.Server.HubConfig;
using RealTimeCharts.Server.TimerFeatures;

namespace RealTimeCharts.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChartController : ControllerBase
    {
        private readonly IHubContext<ChartHub> _hub;
        private readonly TimerManager _timer;
        private readonly TechnicianTimeManager _technicianTimer;

        public ChartController(IHubContext<ChartHub> hub, TimerManager timer, TechnicianTimeManager technicianTimer)
        {
            _hub = hub;
            _timer = timer;
            _technicianTimer = technicianTimer;
        }

        [HttpGet]
        public IActionResult Get()
        {
            if (!_timer.IsTimerStarted)
                _timer.PrepareTimer(() => _hub.Clients.All.SendAsync("transferpatientData", DataManager.GetData()));

            DataManager.pointer = 0;
            return Ok(new { Message = "Request Completed" });
        }

        [HttpGet("SendSMS")]
        public async Task<IActionResult> SendSMS()
        {
            try
            {
                //var PhoneNumbers = new List<string> { "+919739975479", "+918754405440", "+919739105557","+919886949092","+91953800885" };
                //foreach (var PhoneNumber in PhoneNumbers)
                //{
                //    using (HttpClient client = new HttpClient())
                //    {
                //        client.BaseAddress = new Uri("https://api-mapper.clicksend.com/http/v2/send.php?method=http&username=uma.r@bt.com&key=P@ssword@123&to="+ PhoneNumber+"&message=Hello Dear,    Mesage from Saviour ..!! Please Logon to https://ClinicalSaviours.com/procedures  for latest updates on clinical procedures.&senderid=mycompany");
                //        HttpRequestMessage request = new HttpRequestMessage();
                //        request.Method = HttpMethod.Get;
                //        var response = await client.SendAsync(request);
                //    }
                //}

                return Ok(new { Message = "SMS sent successfully" });
            }
            catch (Exception)
            {

                return Ok(new { Message = "SMS Sending Failed" });
            }
        }

        [HttpGet("GetTestCase2")]
        public IActionResult GetTestCase2()
        {
            if (!_timer.IsTimerStarted)
                _timer.PrepareTimer(() => _hub.Clients.All.SendAsync("transferpatientData_2", TestCase_2_DataManager.GetData()));
            return Ok(new { Message = "Request Completed" });
        }


        [HttpGet("GetTechnicianLogs")]
        public IActionResult GetTechnicianLogs()
        {
            if (!_technicianTimer.IsTimerStarted)
                _technicianTimer.PrepareTimer(() => _hub.Clients.All.SendAsync("transfertechnicianData", TechnicianManager.GetData()));
            return Ok(new { Message = "Request Completed" });
        }
    }
}

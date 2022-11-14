using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using RealTimeCharts.Server.DataStorage;
using RealTimeCharts.Server.HubConfig;
using RealTimeCharts.Server.TimerFeatures;
using System.Reflection;

namespace RealTimeCharts.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChartController : ControllerBase
    {
        private readonly IHubContext<ChartHub> _hub;
        private readonly TimerManager _timer;
        
        public ChartController(IHubContext<ChartHub> hub, TimerManager timer)
        {
            _hub = hub;
            _timer = timer;
        }

        [HttpGet]
        public IActionResult Get()
        {
            if (!_timer.IsTimerStarted)
                _timer.PrepareTimer(() => _hub.Clients.All.SendAsync("transferpatientData", DataManager.GetData()));

            DataManager.pointer = 0;
            return Ok(new { Message = "Request Completed" });
        }

        [HttpGet("GetTestCase2")]
        public IActionResult GetTestCase2()
        {
            if (!_timer.IsTimerStarted)
                _timer.PrepareTimer(() => _hub.Clients.All.SendAsync("transferpatientData_2", TestCase_2_DataManager.GetData()));
            return Ok(new { Message = "Request Completed" });
        }
    }
}

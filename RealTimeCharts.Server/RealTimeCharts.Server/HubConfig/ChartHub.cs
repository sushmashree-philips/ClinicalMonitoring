using Microsoft.AspNetCore.SignalR;
using RealTimeCharts.Server.Models;

namespace RealTimeCharts.Server.HubConfig
{
    public class ChartHub : Hub
    {
        public async Task BroadcastChartData(List<PatientData> data) => 
            await Clients.All.SendAsync("initialpatientdata", data);
    }
}

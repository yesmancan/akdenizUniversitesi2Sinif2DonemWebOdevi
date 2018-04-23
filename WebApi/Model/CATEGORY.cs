using Newtonsoft.Json;
using System;

namespace WebApi.Model
{
    public class CATEGORY
    {
        [JsonProperty("id")]
        public long? ID { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("lvl")]
        public int Lvl { get; set; }
        [JsonProperty("date")]
        public DateTime? Date { get; set; }
    }
}

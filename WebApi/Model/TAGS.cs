using Newtonsoft.Json;

namespace WebApi.Model
{
    public class TAGS
    {
        [JsonProperty("id")]
        public long? ID { get; set; }
        [JsonProperty("name")]
        public string NAME { get; set; }
        [JsonProperty("date")]
        public string CREATE_DATE { get; set; }
    }
}

using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace WebApi.Model
{
    public class NEWS
    {
        public long ID { get; set; }
        [JsonProperty("name")]
        public string NEWS_NAME { get; set; }
        [JsonProperty("header")]
        public string NEWS_HEADER { get; set; }
        [JsonProperty("context")]
        public string NEWS_CONTEXT { get; set; }
        [JsonProperty("editor")]
        public long? NEWS_EDITOR { get; set; }
        [JsonProperty("comment")]
        public int? NEWS_COMMENT { get; set; } = 0;
        [JsonProperty("commentCount")]
        public int? NEWS_COMMENT_COUNT { get; set; } = 0;
        [JsonProperty("label")]
        public string NEWS_LABEL { get; set; }
        [JsonProperty("shares")]
        public int? NEWS_SHARES { get; set; } = 0;
        [JsonProperty("date")]
        public string NEWS_Date { get; set; }
        [JsonProperty("rate")]
        public int? NEWS_RATE { get; set; }
        [JsonProperty("cat")]
        public int NEWS_CAT { get; set; }
        [JsonProperty("img")]
        public string NEWS_IMG { get; set; }
    }

}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebApi.Model
{
    public class USER
    {
        public static ClaimsIdentity Identity { get; internal set; }
        public long ID { get; set; }
        public string USER_NAME { get; set; }
        public string SURNAME { get; set; }
        public string EMAIL { get; set; }
        public string PASSWORD { get; set; }
    }
}

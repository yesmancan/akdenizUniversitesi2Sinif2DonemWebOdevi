using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using WebApi.Model;

namespace Todo.Controllers
{
    [Route("api/[controller]")]
    public class TokenAuthController : Controller
    {
        NewsSiteProjeContext context = new NewsSiteProjeContext();
        USER existUser = new USER();
        public class user
        {
            [JsonProperty("email")]
            public string Email { get; set; }
            [JsonProperty("password")]
            public string Password { get; set; }
            [JsonProperty("rememberMe")]
            public string RememberMe { get; set; }
        }
        [HttpPost("{id}")]
        [Route("OnlyOne")]
        public IActionResult GetOnlyOne(long id)
        {
            USER user = context.USER.Where(u => u.ID == id).SingleOrDefault();
            if (user != null)
            {
                return new ObjectResult("{\"username\":\"" + (user.USER_NAME + user.SURNAME) + "\"}");
            }
            return new ObjectResult("{\"username\":\"\"}");
        }
        [HttpPost]
        public IActionResult Create([FromBody]user User)
        {
            if (IsValidUserAndPasswordCombination(User.Email, User.Password))
                return new ObjectResult(("{\"token\":\"" + GenerateToken(User.Email) + "\",\"userID\":" + JsonConvert.SerializeObject(existUser.ID) + "}"));

            return NotFound();
        }
        private bool IsValidUserAndPasswordCombination(string Email, string Password)
        {

            existUser = context.USER.FirstOrDefault(u => u.USER_NAME == Email && u.PASSWORD == Password);

            return existUser != null;
        }

        private string GenerateToken(string Email)
        {
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name, Email),
                new Claim(JwtRegisteredClaimNames.Nbf, new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString()),
                new Claim(JwtRegisteredClaimNames.Exp, new DateTimeOffset(DateTime.Now.AddDays(1)).ToUnixTimeSeconds().ToString())
            };

            var token = new JwtSecurityToken(
                new JwtHeader(new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Benim Adım Yesmancan Ve Bu Bir Şifreli Mesaj İçin Kriptodur")),
                                             SecurityAlgorithms.HmacSha256)),
                new JwtPayload(claims));

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        #region Old Code
        //[HttpPost]
        //[Route("Login")]
        //public string GetAuthToken([FromBody]user User)
        //{
        //    var existUser = new USER();
        //    existUser = context.USER.FirstOrDefault(u => u.USER_NAME == User.Email && u.PASSWORD == User.Password);

        //    if (existUser != null)
        //    {
        //        var requestAt = DateTime.Now;
        //        var expiresIn = requestAt + TokenAuthOption.ExpiresSpan;
        //        var token = GenerateToken(existUser, expiresIn);

        //        return JsonConvert.SerializeObject(new RequestResult
        //        {
        //            State = RequestState.Success,
        //            Data = new
        //            {
        //                requertAt = requestAt,
        //                expiresIn = TokenAuthOption.ExpiresSpan.TotalSeconds,
        //                tokeyType = TokenAuthOption.TokenType,
        //                accessToken = token
        //            },
        //            Msg = "Başarı İle Giriş Yaptınız."
        //        });
        //    }
        //    else
        //    {
        //        return JsonConvert.SerializeObject(new RequestResult
        //        {
        //            State = RequestState.Failed,
        //            Msg = "Kullanıcı Adı Veya Şifre Yanlış..."
        //        });
        //    }
        //}


        //private string GenerateToken(USER user, DateTime expires)
        //{
        //    var handler = new JwtSecurityTokenHandler();

        //    ClaimsIdentity identity = new ClaimsIdentity(
        //        new GenericIdentity(user.USER_NAME, "TokenAuth"),
        //        new[] {
        //            new Claim("ID", user.ID.ToString())
        //        }
        //    );

        //    var securityToken = handler.CreateToken(new SecurityTokenDescriptor
        //    {
        //        Issuer = TokenAuthOption.Issuer,
        //        Audience = TokenAuthOption.Audience,
        //        SigningCredentials = TokenAuthOption.SigningCredentials,
        //        Subject = identity,
        //        Expires = expires
        //    });
        //    return handler.WriteToken(securityToken);
        //}

        //[HttpGet]
        //[Route("Get")]
        //[Authorize()]
        //public string GetUserInfo()
        //{
        //    var claimsIdentity = USER.Identity as ClaimsIdentity;

        //    return JsonConvert.SerializeObject(new RequestResult
        //    {
        //        State = RequestState.Success,
        //        Data = new
        //        {
        //            UserName = claimsIdentity.Name
        //        }
        //    });
        //}
        #endregion
    }
}


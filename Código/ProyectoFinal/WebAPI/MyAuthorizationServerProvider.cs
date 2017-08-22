using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Owin.Security.OAuth;
using System.Security.Claims;
using BL;
using ET;

namespace WebAPI
{
    class MyAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        private ClienteBL clienteBL = new ClienteBL();
        private AdministradorBL administradorBL = new AdministradorBL();

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            //return base.ValidateClientAuthentication(context);
            context.Validated(); //
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            string usuario = context.UserName;
            string password = context.Password;

            Cliente cli = clienteBL.ingresarCliente(usuario, password);
            if (cli != null){
                identity.AddClaim(new Claim(ClaimTypes.Role, "CLIENTE"));
                identity.AddClaim(new Claim("username", cli.NombreUsuario));
                identity.AddClaim(new Claim(ClaimTypes.Name, cli.Nombre));
                context.Validated(identity);
            }
            else{
                Administrador admin = administradorBL.ingresarAdministrador(usuario, password);
                if(admin != null){
                    identity.AddClaim(new Claim(ClaimTypes.Role, "ADMINISTRADOR"));
                    identity.AddClaim(new Claim("username", admin.NombreUsuario));
                    identity.AddClaim(new Claim(ClaimTypes.Name, admin.Nombre));
                    context.Validated(identity);
                }
                else{
                    context.SetError("invalid grant", "Procided username and password is incorrect");
                    return;
                }
            }
        }
    }
}

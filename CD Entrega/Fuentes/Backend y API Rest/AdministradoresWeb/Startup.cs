using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AdministradoresWeb.Startup))]
namespace AdministradoresWeb
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

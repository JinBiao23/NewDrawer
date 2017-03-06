using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Draw.Startup))]
namespace Draw
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
